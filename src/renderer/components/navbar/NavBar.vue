<template>
  <div class="navbar">
    <input type="file" @change="onFileChange" webkitdirectory directory multiple>
    <a class="btn" v-on:click="exportList()"> Export </a>
  </div>
</template>

<script>
  import XmlServices from '../../services/XmlServices.js';
  import ExportServices from '../../services/ExportServices.js';

  export default {
    name: 'NavBar',
    data () {
      return {
        imagesArray: [],
        xmlFiles: [],
      };
    },
    methods: {
      setArray (files, index) {
        this.imagesArray = this.$store.getters.getImageList;
        // const xmlList = this.$store.getters.getXmlList;
        const i = index;
        console.log(`Image: ${ i }`);
        console.log(`Type: ${ files[i].type }`);
        console.log(`tmpPath: ${ files[i].webkitRelativePath }`);

        if ((index + 1) < files.length) {
          if (files[i].type.startsWith('image')) {
            const tmpPath = URL.createObjectURL(files[i]);
            this.imagesArray.push({ file: files[i], fileData: tmpPath, name: files[i].name, tagList: [], width: 0, height: 0 });
            this.$store.commit('setImageList', this.imagesArray);
            index += 1;
            this.setArray(files, index);
          } else {
            this.xmlFiles.push(files[i]);
            index += 1;
            this.setArray(files, index);
          }
        } else if (this.xmlFiles.length > 0) {
          this.setXMLData(this.xmlFiles, 0);
        }
      },
      onFileChange (e) {
        const files = e.target.files || e.dataTransfer.files;
        if (!files.length) {
          return;
        }

        this.xmlFiles = [];
        this.setArray(files, 0);
      },
      setXMLData (files, index) {
        if ((index + 1) < files.length) {
          const i = index;
          const xmlService = new XmlServices();
          const xmlList = this.$store.getters.getXmlList;
          xmlService.xmlToJsonFromFile(files[i]).then((data) => {
            if (data !== '400') {
              console.log(`reading :${ files[i].name }`);
              xmlList.push(files[i]);
              const imageIndex = this.getImageFromName(data.annotation.filename._text);
              const width = parseInt(data.annotation.size.width._text, 10);
              const height = parseInt(data.annotation.size.height._text, 10);
              this.imagesArray[imageIndex].width = width;
              this.imagesArray[imageIndex].height = height;
              if (imageIndex !== -1 && data.annotation.object && data.annotation.object.length && data.annotation.object.length > 0) {
                data.annotation.object.forEach((item) => {
                  const tagId = (this.imagesArray[imageIndex].tagList.length + 1);
                  const bndbox = item.bndbox;
                  const xmin = parseInt(bndbox.xmin._text, 10);
                  const xmax = parseInt(bndbox.xmax._text, 10);
                  const ymin = parseInt(bndbox.ymin._text, 10);
                  const ymax = parseInt(bndbox.ymax._text, 10);

                  this.imagesArray[imageIndex].tagList.push({
                    id: tagId,
                    label: item.name._text,
                    class: item.pose._text,
                    xmin,
                    width: (xmax - xmin),
                    ymin,
                    height: (ymax - ymin),
                    isSetResolution: false,
                  });
                  this.$store.commit('setImageList', this.imagesArray);
                });
              } else if (imageIndex !== -1 && data.annotation.object && data.annotation.object.name) {
                const tagId = (this.imagesArray[imageIndex].tagList.length + 1);
                const item = data.annotation.object;
                const bndbox = item.bndbox;
                const xmin = parseInt(bndbox.xmin._text, 10);
                const xmax = parseInt(bndbox.xmax._text, 10);
                const ymin = parseInt(bndbox.ymin._text, 10);
                const ymax = parseInt(bndbox.ymax._text, 10);

                this.imagesArray[imageIndex].tagList.push({
                  id: tagId,
                  label: item.name._text,
                  class: item.pose._text,
                  xmin,
                  width: (xmax - xmin),
                  ymin,
                  height: (ymax - ymin),
                  isSetResolution: false,
                });
                this.$store.commit('setImageList', this.imagesArray);
              }

              this.$store.commit('setXmlList', xmlList);
              index += 1;
              this.setXMLData(files, index);
            } else {
              console.log(`File :${ files[i].name } Not founded tag list.`);
              index += 1;
              this.setXMLData(files, index);
            }
          });
        }
      },
      getImageData (file) {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            resolve({ data: e.target.result, file });
          };

          reader.readAsDataURL(file);
        });
      },
      getImageFromName (name) {
        let index = -1;
        for (let i = 0; i < this.imagesArray.length; i += 1) {
          if (this.imagesArray[i].name === name) {
            index = i;
            return index;
          }
        }

        return index;
      },
      exportList () {
        const exportServices = new ExportServices();
        exportServices.exportList(this.$store.getters.getImageList);
      },
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .navbar {
    height: 55px;
    background-color: #2c3e50;
  }
</style>
