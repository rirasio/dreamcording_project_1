console.log('-----------app start------------');

const fs = require('fs').promises;

console.log('argv');
console.log(process.argv);

console.log('file list');
fs.readdir('./test')
.then((array) => { console.log(array) })
.catch(console.error);
