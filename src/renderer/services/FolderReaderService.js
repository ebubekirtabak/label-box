const fs = require('fs');
const mime = require('mime');

export default class ForderReaderService {
  getAllFiles (folders) {
    const folderGroups = {};
    folders.forEach((path) => {
      folderGroups[path] = [];
      folderGroups[path] = fs.readdirSync(path) || [];
      folderGroups[path] = folderGroups[path].map(file => ({
        name: file, type: mime.getType(path + file), fullPath: `${ path }/${ file }`,
      }));
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
    files.filter(file => file.type && file.type.indexOf('application/xml') !== -1).forEach((file) => {
      this.readTextFile(file).then((data) => {
        fileTexts[file.fullPath] = data;
      });
    });
    console.log(fileTexts);
  }

  readTextFile (file) {
    return new Promise((resolve, error) => {
      fs.readFile(file.fullPath || file, (err, data) => {
        if (err) {
          error(err);
        }

        resolve(data.toString());
      });
    });
  }

  removeFile (file) {
    fs.unlink(file.path || file, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    
    });
  }

  writeTextFile (file) {
    if (file.name) {
      const { name, data } = file;
      fs.writeFile(name, data, (err) => {
        if (err) throw err;
      });
    }
  }
}
