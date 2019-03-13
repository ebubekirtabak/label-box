const state = {
  count: 0,
  tagList: [],
  selectedImage: {},
  imageList: [],
  xmlList: [],
  folderName: '',
  selectedTag: {},
};

const getters = {
  getImageList: state => state.imageList,
  getSelectedImage: state => state.selectedImage,
  getXmlList: state => state.xmlList,
  getSelectedTag: state => state.selectedTag,
};

const actions = {
  setImageList: ({ commit }, n) => {
    commit('SET_IMAGE_LIST', n);
  },
  setSelectedImage: ({ commit }, n) => {
    commit('SET_SELECTED_IMAGE', n);
  },
  setXmlList: ({ commit }, n) => {
    commit('SET_XML_LIST', n);
  },
  pushTagToSelectedImage: ({ commit }, n) => {
    commit('PUSH_TAG_TO_SELECTED_IMAGE', n);
  },
  updateSelectedTag: ({ commit }, n) => {
    commit('UPDATE_SELECTED_TAG', n);
  },
};

const mutations = {
  SET_IMAGE_LIST: (state, n) => {
    state.imageList = n;
  },
  SET_SELECTED_IMAGE: (state, n) => {
    state.selectedImage = n;
  },
  SET_XML_LIST: (state, item) => {
    state.setXmlList = item;
  },
  PUSH_TAG_TO_SELECTED_IMAGE: (state, item) => {
    state.selectedImage.tagList = [item, ...state.selectedImage.tagList];
  },
  UPDATE_SELECTED_TAG: (state, item) => {
    state.selectedTag = Object.assign(state.selectedTag, item);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
