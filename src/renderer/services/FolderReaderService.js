const fs = require('fs');
const mime = require('mime');

export default class ForderReaderService {
  getAllFiles (folders) {
    const folderGroups = {};
    folders.forEach((path) => {
      folderGroups[path] = [];
      folderGroups[path] = fs.readdirSync(path) || [];
      folderGroups[path] = folderGroups[path].map(file => ({ name: file, type: mime.getType(path + file) }));
    });
    console.log(folderGroups);
    return folderGroups;
  }

  getFolder (folder) {
    const files = fs.readdirSync(folder) || [];
    return files;
  }

  readAllTextFiles(files) {

  }
}
