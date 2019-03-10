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

const actions = {
  setImageList: ({ commit }, n) => {
    commit('SET_IMAGE_LIST', n);
  },
  setSelectedImage: ({ commit }, n) => {
    commit('SET_IMAGE_LIST', n);
  },
};

const mutations = {
  SET_IMAGE_LIST: (state, n) => {
    state.imageList = n;
  },
  SET_SELECTED_IMAGE: (state, n) => {
    state.selectedImage = n;
  },
  setXmlList: (state, item) => {
    state.setXmlList = item;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
