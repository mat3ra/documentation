# Exabyte.io Internal Documentation

## Uploading/Updating Tutorial Videos

Follow the below instructions to upload/update a tutorial video:

1. Create a metadata file similar to the one in [here](lang/en/docs/tutorials/dft/electronic/band-gap.json).

   > Note: For each step, the time elapsed between `startTime` and `endTime` should approximately be the duration of the spoken sentence.
   > I.e. this is almost impossible to get right on the first try and will need further refinement.

3. Make sure to remove `youTubeId`. This field is automatically added by the [video manager](video-manager.py) script once the video is uploaded.

4. In metadata file, `descriptionLinks` is a list of links which are added to video description. See [description template](video-description.jinja) for more details.

5. Run the below command to add voice to the video:

   ```bash
   python video-manager.py voiceover --file PATH_TO_ORIGINAL_VIDEO --metadata PATH_TO_METADATA --audio PATH_TO_SAVE_AUDIO --output PATH_TO_SAVE_NEW_VIDEO
   ```
   whereby `PATH_TO_SAVE_AUDIO` and `PATH_TO_SAVE_NEW_VIDEO` should have the file extension `.mp3` and `.mp4`, respectively.

   Voiceover audio alone (without an accompanying video file) can be generated
   by omitting the `--file` and `--output` options.

   The Google Cloud Text-to-Speech API has a limit of about 4 minutes of audio
   per request. Audio longer than this must be split into multiple requests
   using the `--skip` and `--until` options. The exact end time of a segment
   should be used as the `skip` and/or `until` value.

5. Retry step 4 with adjusted `youTubeCaptions` data until the optimal outcome is achieved.

6. Before uploading, make sure that the timings of the `youTubeCaptions` sentences in the metadata file match exactly the duration of their pronunciations in the voiceover. This ensures that the subtitles will be synced correctly to the voice in the final online video version.

7. Run the below command to upload/update the video once metadata is ready:

    ```bash
    python video-manager.py upload --file PATH_TO_VIDEO --metadata PATH_TO_METADATA
    ```

8. The video privacy status is set to `unlisted` by default. Pass privacy status as below to override it:

    ```bash
    python video-manager.py update --file PATH_TO_VIDEO --metadata PATH_TO_METADATA --privacyStatus public
    ```

9. Commit the new changes to metadata file such as `youTubeId` and push.

## Translating to Other Languages

Use `translate.py` script to generate translated docs using Google API:

```bash
python translate.py -t 100
```

See script source for options. Use the below regex to fix image links in WebStorm once translation is done:

```regexp
/ images / (\w+) /    <- contains a space as the final character
/images/$1/
```
