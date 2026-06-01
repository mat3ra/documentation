# API Tokens

The concept of API authorization tokens in the context of the Rest-API of our platform are thoroughly explained in a [separate section]({{ dev_url }}/rest-api/overview/) of this documentation manual. For the moment, we will confine ourselves to simply showing how such tokens can be generated or deleted under the Account Preferences.

## Generate New Token

Under the section labelled "API Token" of the Account Preferences page, the user should click on the `Generate new token` button to generate this new token. A warning dialog will then appear informing the user about the necessity to copy the authorization token and account id to the user's clipboard. **It is important to store such token information securely and to not share it with anyone else**, especially in light of the fact that this information can only be viewed once and will be lost forever once the warning dialog is closed. When using the RESTful API, the token serves as a unique authentication element for the account and its member.

Once the new token has been generated and the warning dialog has been closed by pressing on its `OK` button, the user will be able to see the token as a new insertion to the complete list of previously-generated token entries associated with the present account, appearing under the  Account Preferences page. This list contains on the left information about the date and time of creation of the various listed tokens.

### Animation

In the example animation below, we demonstrate how to generate a new API authorization token that will be added to the existing entries in the overall list of tokens. The token information displayed on the warning dialog is also copied and pasted to a text editor file for future reference:

<img data-gifffer="/images/accounts/generate-token.gif" />

## Delete Tokens

The list of tokens under the  Account Preferences page additionally gives the user the possibility to delete each token entry through the corresponding `Delete` action button situated to the right.  It is worth emphasizing that once a token has been deleted, it will have been lost forever and cannot in any way be recovered, since no two identical tokens are ever generated.

### Animation

The same new token which was generated in the previous step will now get deleted from the list:

<img data-gifffer="/images/accounts/delete-token.gif" />
