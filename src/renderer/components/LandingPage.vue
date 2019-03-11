<template>
  <div id="wrapper">
    <img id="logo" src="~@/assets/logo.png" alt="electron-vue">
    <main>
      <div class="left-side">
        <span class="title">
          Welcome to Label Box App
        </span>
        <button @click="openPaths()"> Open Workspace </button>
        <system-information></system-information>
      </div>
    </main>
  </div>
</template>

<script>
  import { mapMutations, mapActions } from 'vuex';
  import FolderReaderService from '../services/FolderReaderService';
  import SystemInformation from './LandingPage/SystemInformation';
  const mime = require('mime');
  const electron = require('electron').remote;
  const fs = require('fs');
  const { dialog } = electron;

  export default {
    name: 'landing-page',
    components: { SystemInformation },
    methods: {
      ...mapActions([
        'setFolderGroups',
        'setImageList',
      ]),
      ...mapMutations([
        'SET_FOLDER_GROUPS',
      ]),
      open (link) {
        this.$electron.shell.openExternal(link);
      },
      openFolder () {
        dialog.showOpenDialog({ properties: ['openFile', 'openDirectory', 'multiSelections'] }, (result) => {
          const path = result[0];
          const resultsArray = fs.readdirSync((path), (err, data) => {
            if (err) throw err;
            console.log(data);
          });
          console.log(resultsArray);
        });
      },
      openPaths () {
        this.folderSelector().then((result) => {
          this.updateFolderGroups(result);
        });
      },
      updateFolderGroups (result) {
        this.setFolderGroups([result]);
        const that = this;
        Object.keys(result).forEach((key) => {
          result[key].filter(item => item.type && item.type.indexOf('image') !== -1).forEach((item) => {
            that.imagesArray.push({
              file: item.name,
              name: item.name,
              tagList: [],
              width: 0,
              height: 0,
              fullPath: `${ key }/${ item.name }`,
            });
          });
        });
        this.setImageList(this.imagesArray);
        this.$router.push('home');
      },
      folderSelector () {
        return new Promise((resolve) => {
          dialog.showOpenDialog({ properties: ['openFile', 'openDirectory', 'multiSelections'] }, (result) => {
            const folderReader = new FolderReaderService();
            folderReader.getAllFiles(result);
            const folderGroups = {};
            result.forEach((path) => {
              folderGroups[path] = [];
              folderGroups[path] = fs.readdirSync(path).map(file => ({ name: file, type: mime.getType(path + file) })) || [];
            });

            console.log(folderGroups);
            resolve(folderGroups);
          });
        });
      },
    },
    computed: {
      folderGroups () {
        return this.$store.getters.getFolderGroups;
      },
    },
    watch: {
      getFolderGroups (n, i) {
        console.log({ n, i });
      },
      folderGroups (n, i) {
        console.log({ n, i });
      },
    },
    data () {
      return {
        imagesArray: [],
      };
    },
  };
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  main > div { flex-basis: 50%; }

  .left-side {
    display: flex;
    flex-direction: column;
  }

  .welcome {
    color: #555;
    font-size: 23px;
    margin-bottom: 10px;
  }

  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .doc p {
    color: black;
    margin-bottom: 10px;
  }

  .doc button {
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
  }

  .doc button.alt {
    color: #42b983;
    background-color: transparent;
  }
</style>
