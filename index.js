const fs = require('fs').promises;

const targetFolderPath = `${__dirname}/${process.argv[2] === undefined ? 'test' : process.argv[2]}`;

fs.stat(`${targetFolderPath}/video`)
.catch(() => {
  fs.mkdir(`${targetFolderPath}/video`).catch(console.error);
});

fs.stat(`${targetFolderPath}/captured`)
.catch(() => {
  fs.mkdir(`${targetFolderPath}/captured`).catch(console.error);
});

fs.stat(`${targetFolderPath}/duplicated`)
.catch(() => {
  fs.mkdir(`${targetFolderPath}/duplicated`).catch(console.error);
});

const videoExtension = new Set(['mp4', 'mov']);
const captureExtension = new Set(['png', 'aae']);
const photoExtension = new Set(['jpg']);

fs.readdir(targetFolderPath)
.then((array) => {
  for (fileName of array) {
    let nameAndExtension = fileName.split('.');

    if (videoExtension.has(nameAndExtension[1])) {
      fs.link(`${targetFolderPath}/${fileName}`, `${targetFolderPath}/video/${fileName}`)
      .then(() => {
        fs.rm(`${targetFolderPath}/${fileName}`)
        .catch(console.error);
      })
      .catch(console.error);

      continue;
    }

    if (captureExtension.has(nameAndExtension[1])) {
      fs.link(`${targetFolderPath}/${fileName}`, `${targetFolderPath}/captured/${fileName}`)
      .then(() => {
        fs.rm(`${targetFolderPath}/${fileName}`)
        .catch(console.error);
      })
      .catch(console.error);

      continue;
    }

    if (photoExtension.has(nameAndExtension[1])) {
      if (nameAndExtension[0].split('_').pop().includes('E')) {
        let targetFileName = `${nameAndExtension[0].split('_')[0]}_${nameAndExtension[0].split('_')[1].substr(1)}.${nameAndExtension[1]}`;
        
        fs.link(`${targetFolderPath}/${targetFileName}`, `${targetFolderPath}/duplicated/${targetFileName}`)
        .then(() => {
          fs.rm(`${targetFolderPath}/${targetFileName}`)
          .catch(console.error);
        })
        .catch(console.error);
      }

      continue;
    }
    
  }
})
.catch(console.error);
