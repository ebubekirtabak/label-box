import JSZip from 'jszip';

export default class ExportServices {
  exportList(imagesArray) {
    const zip = new JSZip();

    imagesArray.forEach((img) => {
      if (img.name.lastIndexOf('.') !== -1) {
        const xmlName = `${img.name.substring(0, img.name.lastIndexOf('.'))}.xml`;
        zip.file(xmlName, this.createXmlData(img.tagList, img));
      }
    });

    zip.generateAsync({ type: 'blob' }).then((content) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(content);
      link.download = 'example.zip';
      link.click();
    });
  }

  createXmlData(xmlList, img) {
    const file = img.file;

    let xmlText = '<annotation>\n' +
    `\t<folder>${file.name}</folder>\n` +
    `\t<filename>${file.name}</filename>\n` +
    `\t<path>${file.path}</path>\n` +
    '\t<source>\n' +
    '\t\t<database>Unknown</database>\n' +
    '\t</source>\n' +
    '\t<size>\n' +
    `\t\t<width>${file.width}</width>\n` +
    `\t\t<height>${file.height}</height>\n` +
    '\t\t<depth>3</depth>\n' +
    '\t</size>\n' +
    '\t<segmented>0</segmented>\n';
    xmlList.forEach((item) => {
      if (item.isSetResolution && img.imgResolutions) {
        const imgResolutions = img.imgResolutions;
        item.isSetResolution = true;
        let difference = (imgResolutions.width - imgResolutions.naturalWidth);
        console.log(` > ${imgResolutions.width - imgResolutions.naturalWidth} < `);
        $this.perCent.width = (difference / imgResolutions.naturalWidth) * 100; // difference
        difference = (imgResolutions.height - imgResolutions.naturalHeight);
        $this.perCent.height = (difference / imgResolutions.naturalHeight) * 100; // difference
        console.log(`width: ${imgResolutions.width} : naturalWidth : ${imgResolutions.naturalWidth} : difference : ${$this.perCent.width}`);
        console.log(`height: ${imgResolutions.height} : naturalHeight: ${imgResolutions.naturalHeight} : difference : ${$this.perCent.height}`);
        if (imgResolutions.width > imgResolutions.naturalWidth) {
          console.log(`Width: + ${item.width / 100 * $this.perCent.width}`);
          item.width = parseInt(item.width + (item.width / 100 * $this.perCent.width));
          item.xmin = parseInt(item.xmin + (item.xmin / 100 * $this.perCent.width));
        } else {
          item.width = parseInt(item.width + (item.width / 100 * $this.perCent.width));
          item.xmin = parseInt(item.xmin + (item.xmin / 100 * $this.perCent.width));
        }

        if (imgResolutions.height > imgResolutions.naturalHeight) {
          item.ymin = parseInt(item.ymin + (item.ymin / 100 * $this.perCent.height));
          item.height = parseInt(item.height + (item.height / 100 * $this.perCent.height));
        } else {
          item.ymin = parseInt(item.ymin + (item.ymin / 100 * $this.perCent.height));
          item.height = parseInt(item.height + (item.height / 100 * $this.perCent.height));
        }
      }

      xmlText += '\t<object>\n' +
      `\t\t<name>${item.label}</name>\n` +
      '\t\t<pose>Unspecified</pose>\n' +
      '\t\t<truncated>0</truncated>\n' +
      '\t\t<difficult>0</difficult>\n' +
      '\t\t<bndbox>\n' +
      `\t\t\t<xmin>${item.xmin}</xmin>\n` +
      `\t\t\t<ymin>${item.ymin}</ymin>\n` +
      `\t\t\t<xmax>${(item.xmin + item.width)}</xmax>\n` +
      `\t\t\t<ymax>${(item.ymin + item.height)}</ymax>\n` +
      '\t\t</bndbox>\n' +
      '\t</object>\n';
    });
    xmlText += '</annotation>\n';

    return xmlText;
  }
}
