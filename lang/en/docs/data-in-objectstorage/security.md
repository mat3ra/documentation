# Object Security

## Pre-signed URLs

All objects in object storage by default are private. This means that they are only accessible to authorized parties. Authorized parties can share objects with others by creating a pre-signed URL, using their own security credentials, to grant time-limited permission to access the objects. Readers are referred to AWS S3[^1] and Azure Blob[^2] documentations for more information.

Web application is authorized to manage objects and create pre-signed URLs for the objects an [account]({{ reference_url }}/accounts/overview/) has access to (for example, files in [job]({{ guide_url }}/jobs/ui/files-tab/) and [Dropbox](dropbox.md)). Please note that pre-signed URLs are valid only for the specified duration (15 min by default).

## Other

Please consult [security]({{ reference_url }}/security/security-policies/) section for more information about our security polices.

## Links

[^1]: [Amazon Web Services, official online documentation, S3 signed URLs, Website](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-signed-urls.html)

[^2]: [Microsoft Azure, official online documentation: Pre-signed URLs for Blob storage, Website](https://docs.microsoft.com/en-us/azure/storage/common/storage-dotnet-shared-access-signature-part-1)

///FOOTNOTES GO HERE///
