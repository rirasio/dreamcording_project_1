console.log('-----------app start------------');
console.log();

const fs = require('fs').promises;

console.log('-----------root path');
console.log(__dirname);

const folderName = process.argv[2] === undefined ? '' : process.argv[2];

console.log('-----------target folder');
console.log(folderName);

console.log('-----------file list');
fs.readdir('./test')
.then((array) => { console.log(array) })
.catch(console.error);
