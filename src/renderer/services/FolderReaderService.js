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

  readAllTextFiles (files) {
    const fileTexts = {};
    files.filter(file => file.type.indexOf('text') !== -1).forEach((file) => {
      fileTexts[file.path] = this.readFile(file);
    });
    console.log(fileTexts);
  }

  readFile (file) {
    return new Promise((resolve, error) => {
      fs.readFile(file.path || file, (err, data) => {
        if (err) {
          error(err);
        }

        resolve(data.toString());
      });
    });
  }
}
