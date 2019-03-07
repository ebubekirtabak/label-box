const state = {
  count: 0,
  tagList: [],
  selectedImage: {},
  imageList: [],
  xmlList: [],
  folderName: '',
};

const getters = {
  getImageList: state => state.imageList,
  getSelectedImage: state => state.selectedImage,
  getXmlList: state => state.xmlList,
};

const mutations = {
  setImageList: (state, n) => {
    state.imageList = n;
  },
  setSelectedImage: (state, item) => {
    state.selectedImage = item;
  },
  setXmlList: (state, item) => {
    state.setXmlList = item;
  },
};

export default {
  state,
  getters,
  mutations,
};
