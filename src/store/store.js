import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  count: 0,
  tagList: [],
  selectedImage: {},
  imageList: [],
  xmlList: [],
  folderName: '',
};

export default new Vuex.Store({
  state,
  getters: {
    getImageList: state => state.imageList,
    getSelectedImage: state => state.selectedImage,
    getXmlList: state => state.xmlList,
  },
  mutations: {
    setImageList: (state, n) => {
      state.imageList = n;
    },
    setSelectedImage: (state, item) => {
      state.selectedImage = item;
    },
    setXmlList: (state, item) => {
      state.setXmlList = item;
    },
  },
});
