console.log('-----------app start------------');
console.log();

const fs = require('fs').promises;

console.log('-----------root path');
console.log(__dirname);

const folderName = process.argv[2] === undefined ? '' : process.argv[2];

console.log('-----------target folder');
console.log(folderName);

console.log('-----------file list');
fs.stat(`${__dirname}/${folderName}/video`)
.then((states) => {
  console.log(states);
})
.catch(console.error);

fs.readdir('./test')
.then((array) => {
  for (fileName of array) {
    console.log(fileName);
  }
})
.catch(console.error);
