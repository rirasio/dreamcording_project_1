const fs = require('fs');
const path = require('path');
const targetFolderPath = `${__dirname}/${process.argv[2] === undefined ? 'test' : process.argv[2]}`;
const videoExtension = new Set(['mp4', 'mov']);
const captureExtension = new Set(['png', 'aae']);
const photoExtension = new Set(['jpg']);

fs.stat(`${targetFolderPath}/video`, makeFolder);
fs.stat(`${targetFolderPath}/captured`, makeFolder);
fs.stat(`${targetFolderPath}/duplicated`, makeFolder);
fs.readdir(targetFolderPath, {withFileTypes: true}, moveFile);

function makeFolder(err, stats) {
  if (err) {
    fs.promises.mkdir(`${targetFolderPath}/${err.path.split(path.sep).pop()}`).catch(console.error);
  }
  return;
}

function moveFile(err, files) {
  if (err) {
    console.error;
  }
  
  for (dirent of files) {
    if (dirent.isDirectory() === false) {
      const ext = dirent.name.split('.').pop();

      if (videoExtension.has(ext)) {
        console.log('비디오 파일은 video 폴더로 이동합니다.');
        fs.promises.rename(`${targetFolderPath}/${dirent.name}`, `${targetFolderPath}/video/${dirent.name}`).catch(console.error);
        continue;
      }

      if (captureExtension.has(ext)) {
        console.log('스크린샷 파일은 captured 폴더로 이동합니다.');
        fs.promises.rename(`${targetFolderPath}/${dirent.name}`, `${targetFolderPath}/captured/${dirent.name}`).catch(console.error);
        continue;
      }

      if (photoExtension.has(ext)) {
        const nameSet = new Set(dirent.name);
        if (nameSet.has('E')) {
          console.log('수정 사진의 원본은 duplicated 폴더로 이동합니다.');
          nameSet.delete('E');
          fs.promises.rename(`${targetFolderPath}/${[...nameSet].join('')}`, `${targetFolderPath}/duplicated/${[...nameSet].join('')}`).catch(console.error);
          continue;
        }
      }
    }
  }
  return;
}