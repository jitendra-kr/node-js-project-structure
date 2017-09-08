const readDir = require('./read_directory').class;

let readDirObj = new readDir(),
 skipFiles = ['index'],
 filesArray = readDirObj.getFiles(__dirname, skipFiles); 

console.log(filesArray);