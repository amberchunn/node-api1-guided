const fs = require('fs');

//loop through each file in the 'data' folder

for (const filename of fs.readdirSync('data')) {
    //get the filename without an extension
    const baseFilename = filename.substr(0, filename.lastIndexOf('.'));

    //rename the file with a new extension
    fs.renameSync(`data/${filename}`, `data/${baseFilename}.txt`)
}
