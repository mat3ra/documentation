# SSH Keys

The concept of SSH authorization keys in the context of the Command Line Interface of our platform are thoroughly explained in a [separate section]({{ resources_url }}/data-on-disk/security/). For the moment, we will restrict ourselves to showing how such keys can be added to or deleted from our platform.

## Add New Key

### Initiate procedure

Click "Create" button <i class="zmdi zmdi-plus zmdi-hc-border"></i> located at the top-right corner of this panel, at which stage the user will be greeted with a dialog asking to enter the following key-related information in the corresponding entries: Title of the Key, and the content of the key. 

### Enter or Upload content

Paste the content of the key into the corresponding textarea. Alternatively, the location of the key file on the user's local hard drive can be directly pointed to, by navigating to it through the file browser opened by the "Choose File" button and selecting the public key file.

!!!warning "Use public key, not private"
    SSH keys come in pairs: public and private. The private one is not meant to be shared. Please be sure to use the *public* key when uploading or copy/pasting the key content.

### Save key

The "Save key" button at the bottom of the dialog should finally be pressed to save the newly-added key, or `Cancel` to annihilate the  changes and revert to the previous screen. 

### Assert operational status

Once the new SSH key has been added, the user will be able to see the key as a new insertion to the complete list of previously-added key entries associated with the present account, appearing under the  Account Preferences page. This list contains on the left information about the title, content, and date and time of creation of the various listed keys. When the key is ready to be used for login on the Command Line Interface, the indicator to the left of its entry in the list will change the color from gray <i class="zmdi zmdi-circle"></i> to green <i class="zmdi zmdi-circle c-lime"></i>.

### Connect to Server

Use the guidelines available in [this page]({{ cli_url }}/remote-connection/ssh/#connect-to-server) to establish connection to our login node server via the command-line terminal.

### Animation

In the example animation below, we demonstrate how to add a new SSH key that will be included in the overall list of keys. We will do so by selecting the corresponding file from our local hard drive. 

<img data-gifffer="/images/accounts/add-key.gif" />


## Delete Keys

The list of SSH keys under the  Account Preferences page additionally gives the user the possibility to delete each key entry through the corresponding `Delete` action button located to the right.  

### Animation 

After having been added, the same new key entry created in the previous step is now deleted from the list:

<img data-gifffer="/images/accounts/delete-key.gif" />
