# Authentication

There are 2 ways to generate the authentication parameters: either through the Login endpoint of by using the account preferences as explained [elsewhere]({{ interface_url }}/accounts/ui/preferences/api/). We recommend using the second option.

## Login

The "Login" endpoint is used to obtain the authentication credentials that can be further used to communicate with the API. It returns `accountId` and `authToken` that are required for any subsequent requests.

### Example

Here's how the authentication can be performed from a command line terminal:

```bash
curl -X POST https://platform.mat3ra.com/api/2018-10-01/login \
    -d "username=USERNAME&password=PASSWORD"
```

And the response will look like this:

```json
{
    "X-Account-Id": "fbdpsNf4oHiX79vMJ",
    "X-Auth-Token": "tZ7-8vWHW3EvRHyadvl7TC3JnLrO_DlkSlK_LkicYgU"
}
```

For any endpoints that require authentication, you must further include the authentication parameters inside a request header:

```bash
curl -X GET https://platform.mat3ra.com/api/2018-10-01/materials \
    -H "X-Account-Id: fbdpsNf4oHiX79vMJ" \
    -H "X-Auth-Token: tZ7-8vWHW3EvRHyadvl7TC3JnLrO_DlkSlK_LkicYgU"
```

## Logout

`logout` endpoint is used for to end an authenticated session. If successful, the authentication parameters are invalidated and will not work in any subsequent requests.

### Example

Here's how the logout can be performed from a command line terminal:

```bash
curl -X GET https://platform.mat3ra.com/api/2018-10-01/logout \
    -H "X-Account-Id: fbdpsNf4oHiX79vMJ" \
    -H "X-Auth-Token: tZ7-8vWHW3EvRHyadvl7TC3JnLrO_DlkSlK_LkicYgU"
```

The return code will contain a note about the success of the operation.
