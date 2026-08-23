#!/usr/bin/python

import os
import re
import json
import googleapiclient.discovery

from pathlib import Path
from jinja2 import Template
from google.cloud import texttospeech
from oauth2client.file import Storage
from oauth2client.tools import run_flow, argparser
from oauth2client.client import flow_from_clientsecrets
from googleapiclient.http import MediaFileUpload, MediaInMemoryUpload
from utils import flatten, update_metadata, parseIncludeStatements, caption_time_to_milliseconds

SCOPE = "https://www.googleapis.com/auth/youtubepartner"
SCRIPT_DIR = Path(__file__).resolve().parent
CLIENT_SECRETS_FILE = SCRIPT_DIR / "oauth-key.json"
DESCRIPTION_TEMPLATE = SCRIPT_DIR / "video-description.jinja"
SERVICE_ACCOUNT_KEY_FILE = SCRIPT_DIR / "service-account-key.json"
DESCRIPTION_LINKS = [
    "Materials Modeling 2.0: https://mat3ra.com/",
    "Mat3ra Platform: https://platform.mat3ra.com/register",
    "Mat3ra Documentation: https://docs.mat3ra.com/",
]

LANGUAGE_CODE = 'en-US'
AUDIO_ENCODING = texttospeech.AudioEncoding.MP3
SSML_GENDER = texttospeech.SsmlVoiceGender.MALE  # MALE, FEMALE, NEUTRAL
VOICE_NAME = LANGUAGE_CODE + '-' + 'Studio-Q'
# https://cloud.google.com/text-to-speech/docs/voices
# en-US-Wavenet-D (male)
# en-US-Studio-Q (male)
# en-US-Studio-O (female)

# instructs ffmpeg to get video from first input (-map 0:v) and audio from second one (-map 1:a) and combine them.
FFMPEG_COMMAND_TMPL = "ffmpeg -y -v 0 -i {} -i {} -map 0:v -map 1:a -vcodec copy {}"


def get_oauth_credentials():
    """
    Returns the credentials to establish connection to YouTube API.
    """
    if not CLIENT_SECRETS_FILE.exists():
        return None
    flow = flow_from_clientsecrets(CLIENT_SECRETS_FILE, scope=SCOPE)
    storage = Storage("oauth-credentials.json")
    credentials = storage.get()
    if credentials is None or credentials.invalid:
        credentials = run_flow(flow, storage)
    return credentials


def get_text_to_speech_api_client():
    """
    Returns TextToSpeech API client.
    """
    return texttospeech.TextToSpeechClient.from_service_account_file(SERVICE_ACCOUNT_KEY_FILE)


def get_youtube_api_client():
    """
    Returns YouTube API client.
    """
    credentials = get_oauth_credentials()
    if credentials is not None:
        return googleapiclient.discovery.build("youtube", "v3", credentials=credentials)


def get_category_id(youtube_, category):
    """
    Returns the ID of a given category.

    Args:
        youtube_: YouTube API client instance
        category (str): category to get the ID for.

    Returns:
         str
    """
    categories = youtube_.videoCategories().list(part="snippet", regionCode="US").execute()["items"]
    return next((c["id"] for c in categories if c["snippet"]["title"] == category))


def get_video_body_param(youtube_, metadata_):
    """
    Returns the body of the request to YouTube API.
    Args:
        youtube_: YouTube API client instance.
        metadata_ (dict): video metadata.

    Returns:
         dict
    """
    return json.loads(json.dumps({
        "snippet": {
            "title": metadata_["title"],
            "tags": metadata_.get("tags", []),
            "description": metadata_["description"],
            "categoryId": get_category_id(youtube_, metadata_.get("category", "Science & Technology")),
        },
        "status": {
            "privacyStatus": metadata_["privacyStatus"]
        }
    }))


def insert_video(youtube_, file_, metadata_):
    """
    Uploads a given video.

    Args:
        youtube_: YouTube API client instance
        file_ (str): path to the video file.
        metadata_ (dict): video metadata.

    Returns:
         dict
    """
    body = get_video_body_param(youtube_, metadata_)
    return youtube_.videos().insert(body=body, part=",".join(body.keys()), media_body=MediaFileUpload(file_)).execute()


def update_video(youtube_, metadata_):
    """
    Updates video metadata.

    Args:
        youtube_: YouTube API client instance
        metadata_ (dict): video metadata.

    Returns:
         dict
    """
    body = get_video_body_param(youtube_, metadata_)
    body["id"] = metadata["youTubeId"]
    return youtube_.videos().update(body=body, part=",".join(body.keys())).execute()


def create_svb_caption_content(metadata_):
    """
    Creates SubViewer caption content from metadata.

    See https://support.google.com/youtube/answer/2734698 for more information.

    Args:
        metadata_ (dict): video metadata.

    Returns:
        str
    """
    regex = re.compile(r'<.*?>')
    caption_to_text = lambda c: "".join((c["startTime"], ",", c["endTime"], "\n", regex.sub('', c["text"])))
    captions = "\n\n".join([caption_to_text(caption) for caption in metadata_["youTubeCaptions"]])
    return captions.encode("utf-8")


def insert_caption(youtube_, youtube_id_, name, content):
    """
    Creates a caption from metadata and inserts it to YouTube.

    Args:
        youtube_: YouTube API client instance.
        youtube_id_: the ID of video.
        name (str): caption name.
        content (str): caption content.
    """
    request = youtube_.captions().insert(
        part="snippet",
        body={
            "snippet": {
                "language": LANGUAGE_CODE,
                "name": name,
                "videoId": youtube_id_
            }
        },
        media_body=MediaInMemoryUpload(content)
    )
    return request.execute()


def create_SSML_text(metadata_, skip=None, until=None):
    """
    Creates SSML text from metadata.

    See https://cloud.google.com/text-to-speech/docs/ssml for more information.

    The optional `skip` and `until` arguments allow generating the voiceover
    in parts to stay within the Google TextToSpeech API's per-request limits.
    Captions whose `startTime` is before `skip` are dropped, and iteration
    stops once a caption's `startTime` reaches `until`. Leading silence on
    the resulting audio is shortened to the gap between `skip` and the first
    kept caption, so each part can be aligned back to the original timeline
    with `ffmpeg -itsoffset <skip>`. Please use exact end times of a segment as
    `skip` and `until` values.

    Args:
        metadata_ (dict): video metadata.
        skip (str|None): caption timestamp (`HH:MM:SS.MS`) to start from.
        until (str|None): caption timestamp (`HH:MM:SS.MS`) to stop at.

    Returns:
        str
    """
    skip_ms = caption_time_to_milliseconds(skip) if skip else 0
    until_ms = caption_time_to_milliseconds(until) if until else None
    text = ""
    previous_end = skip_ms
    for caption in metadata_["youTubeCaptions"]:
        start_ms = caption_time_to_milliseconds(caption["startTime"])
        if start_ms < skip_ms:
            continue
        if until_ms is not None and start_ms >= until_ms:
            break
        silence = start_ms - previous_end
        text = "".join((text, f"<break time='{silence}ms'/>", caption["text"]))
        previous_end = caption_time_to_milliseconds(caption["endTime"])
    return "".join(("<speak>", text, "</speak>"))


def convert_text_to_speech(ssml_text, speech_path):
    """
    Converts a given text to speech.

    Args:
        ssml_text (str): SSML text
        speech_path (str): path to store the audio file.
    """
    client = get_text_to_speech_api_client()
    synthesis_input = texttospeech.SynthesisInput(ssml=ssml_text)
    voice = texttospeech.VoiceSelectionParams(language_code=LANGUAGE_CODE, name=VOICE_NAME, ssml_gender=SSML_GENDER)
    audio_config = texttospeech.AudioConfig(audio_encoding=AUDIO_ENCODING)
    response = client.synthesize_speech(input=synthesis_input, voice=voice, audio_config=audio_config)
    with open(speech_path, 'wb') as out:
        out.write(response.audio_content)


if __name__ == '__main__':
    subparsers = argparser.add_subparsers(dest='command')

    upload = subparsers.add_parser('upload')
    upload.add_argument('--file', required=True, help='video file path')
    upload.add_argument('--metadata', required=True, help='video metadata file path')
    upload.add_argument('--privacyStatus', default="unlisted", help='video privacy status')

    update = subparsers.add_parser('update')
    update.add_argument('--metadata', required=True, help='video metadata file path')
    update.add_argument('--privacyStatus', default="unlisted", help='video privacy status')

    voiceover = subparsers.add_parser('voiceover')
    voiceover.add_argument('--file', help='video file path (required only when --output is set)')
    voiceover.add_argument('--metadata', required=True, help='video metadata file path')
    voiceover.add_argument('--audio', required=True, help='path to store audio file')
    voiceover.add_argument('--output', help='path to store voiceover video file')
    voiceover.add_argument('--privacyStatus', default="unlisted", help='video privacy status')
    voiceover.add_argument(
        '--skip', default=None,
        help='skip captions before this timestamp, e.g. 00:05:30.500 (HH:MM:SS.MS)',
    )
    voiceover.add_argument(
        '--until', default=None,
        help='stop at captions at/after this timestamp, e.g. 00:10:00.000 (HH:MM:SS.MS)',
    )

    args = argparser.parse_args()

    video_file = getattr(args, "file", None)
    if video_file and not os.path.exists(video_file):
        exit("video file does not exist!")
    if not os.path.exists(args.metadata):
        exit("metadata file does not exist!")

    # extract metadata
    metadata = parseIncludeStatements(args.metadata)
    metadata["tags"] = list(set(flatten(metadata["tags"])))
    tags_length = len(" ".join(metadata["tags"]))
    if tags_length > 500:
        exit("Too Many Tags ({})! The limit is 500 Characters!".format(tags_length))
    metadata["privacyStatus"] = metadata.get("privacyStatus", args.privacyStatus)
    metadata["descriptionLinks"] = metadata.get("descriptionLinks", []) + DESCRIPTION_LINKS
    with open(DESCRIPTION_TEMPLATE) as f:
        metadata["description"] = Template(f.read()).render(**metadata)

    youtube = get_youtube_api_client()

    if args.command == "update":
        if not metadata.get("youTubeId"):
            exit("metadata does not contain youTubeId!")
        update_video(youtube, metadata)

    if args.command == "upload":
        youtube_id = insert_video(youtube, args.file, metadata)["id"]
        caption_content = create_svb_caption_content(metadata)
        insert_caption(youtube, youtube_id, metadata["title"], caption_content)
        update_metadata(args.metadata, {"youTubeId": youtube_id})

    if args.command == "voiceover":
        ssml_text = create_SSML_text(metadata, skip=args.skip, until=args.until)
        convert_text_to_speech(ssml_text, args.audio)
        if args.output:
            if not args.file:
                exit("--file is required when --output is set")
            os.system(FFMPEG_COMMAND_TMPL.format(args.file, args.audio, args.output))
