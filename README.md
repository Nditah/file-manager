# FileMan

## How to Rename all PDF Files in a Folder with data from file Metadata or file content in Nodejs

### Extract PDF Metadata in Javascript - Automating Tasks to Enjoy Life


# FileMan - Downloaded File Renaming Tool

Download from [Github](https://github.com/Nditah/file-manager.git)


I have downloaded hundreds of pdf materials on Software Development, Machine Learning, Cloud, and DevOps. These ebooks do not have the appropriate filenames e.g 1234.pdf
I wanted an informative filename life the ebook title + the author + number of pages.


### The Objective

 Using Javascript how to rename all the pdf files from a downloaded folder

*Before*

![before-file-renaming.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1654595016842/SaBMK4k8g.png align="left")

*After*


![after-file-renaming.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1654595057910/UMRtCYy4g.png align="left")


****### The Steps

1. Write an asynchronous function `getTitle (fileBuffer)` that takes a file buffer. The function uses an external dependency  `pdf-parse`, which is a pure javascript cross-platform module to extract texts from PDFs.

- Inside the function, remove all special characters except space from a string `text` using regex

```js
    text.replace(/[^a-zA-Z0-9 ]/g, "")
```

Alternatively, you could still replace the specific characters


```js
    text.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');
```

- Convert string to Title Case with JavaScript
 

2. The second Step is to use `readdirSync()` function from `fs` module to read all the files in the folder. Then for each file, determine the file type from the extension and pass the pdf files to `readFileSync()` function to read the file buffer synchronously.

3. Finally, use the `getTitle(dataBuffer)` to generate the tile and use `renameSync()` function to rename the file title.

The Complet Programme is shown below. 


 ```js
const { readdirSync, renameSync, readFileSync } = require('fs');
const { join, extname, basename, resolve } = require('path');
const pdf = require('pdf-parse');

// Get path to file directory
const folder = resolve(__dirname, '../');

// Get an array of the files inside the folder
const files = readdirSync(folder);

// Loop through each file that was retrieved 
  for (const file of files) {
      const extension = extname(file);
      const name = basename(file, extension);
    
      if (extension === '.pdf') {
        const oldPath = folder + `/${file}`;        
        const dataBuffer = readFileSync(oldPath);
        getTitle(dataBuffer).then(title =>{
            renameSync(join(folder, file), join(folder, `${title}${extension}`));
        }).catch(err => console.log(err.message));
      }
  }


  async function getTitle (fileBuffer) {
    return pdf(fileBuffer).then(function(data) {
        let title;
        if (data.info && data.info.Title) {
            title = data.info.Title;
        } else {
            title = data.text ? data.text.replace(/\r?\n|\r/g, " ").substring(0, 120).trim() : '';
        }
        title = title.split(' ')
        .map(s => s.slice(0, 1).toUpperCase() + s.slice(1).toLowerCase())
        .join(' ');
        if (data.info && data.info.Author) {
            title = `${title} By ${data.info.Author}`;
        }
        return `${title.replace(/[^a-zA-Z0-9 ]/g, "")} - ${data.numpages}` 
    });
};

```

### TODO

Write other features you will want to see in the comments below.