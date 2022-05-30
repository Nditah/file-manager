# FileMan

_Downloaded File Ranaming Tool_

## Using Javascript how to rename all files from a downloaded folder

### Remove all special characters except space from a string `text` using regex

    ```js
    text.replace(/[^a-zA-Z0-9 ]/g, "")
    ```

Alternatively, you could still replace the specific charatcers


    ```js
    string = string.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
    ```

### Dependencies

 `pdf-parse`  Pure javascript cross-platform module to extract texts from PDFs.


Convert string to Title Case with JavaScript
