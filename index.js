const { readdirSync,renameSync, readFileSync } = require('fs');
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

