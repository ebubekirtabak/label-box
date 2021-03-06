
import FolderReaderService from './FolderReaderService';

export default class XmlServices {
  readXml (file) {
    const reader = new FolderReaderService();
    return reader.readTextFile(file);
  }

  xmlToJson (xmlData) {
    return new Promise((resolve) => {
      const convert = require('xml-js');
      try {
        const result = convert.xml2json(xmlData, { compact: true, spaces: 4 });
        resolve({ data: result, result: 200 });
      } catch (err) {
        // was not XML
        resolve({ data: '', result: 400 });
      }
    });
  }

  xmlToJsonFromFile (file) {
    return new Promise((resolve) => {
      console.log(`read File: ${ file.name }`);
      this.readXml(file).then((data) => {
        this.xmlToJson(data).then((jsonData) => {
          if (jsonData.result === 200) {
            resolve(JSON.parse(jsonData.data));
          } else {
            resolve('400');
          }
        });
      });
    });
  }
}
