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
  initTagList: ({ commit }, n) => {
    commit('INIT_TAG_LIST', n);
  },
  setImageList: ({ commit }, n) => {
    commit('SET_IMAGE_LIST', n);
  },
  setSelectedImage: ({ commit }, n) => {
    commit('SET_SELECTED_IMAGE', n);
  },
  setSelectedTag: ({ commit }, n) => {
    commit('SET_SELECTED_TAG', n);
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
  updateTagFromTagList: ({ commit }, n) => {
    commit('UPDATE_TAG_FROM_TAG_LIST', n);
  },
  clearSelectedTag: ({ commit }) => {
    commit('CLEAR_SELECTED_TAG');
  },
};

const mutations = {
  INIT_TAG_LİST: (state, n) => {
    const index = state.selectedImage.tagList.findIndex(tag => tag.id === n.id);
    debugger;
    state.selectedImage.tagList[index] = state.selectedTag;
  },
  SET_IMAGE_LIST: (state, n) => {
    state.imageList = n;
  },
  SET_SELECTED_IMAGE: (state, n) => {
    state.selectedImage = n;
  },
  SET_SELECTED_TAG: (state, n) => {
    state.selectedTag = n;
    const index = state.selectedImage.tagList.findIndex(tag => tag.id === state.selectedTag.id);
    state.selectedImage.tagList[index] = state.selectedTag;
  },
  SET_XML_LIST: (state, item) => {
    state.setXmlList = item;
  },
  PUSH_TAG_TO_SELECTED_IMAGE: (state, item) => {
    state.selectedImage.tagList = [item, ...state.selectedImage.tagList];
  },
  UPDATE_SELECTED_TAG: (state, item) => {
    state.selectedTag = Object.assign(state.selectedTag, item);
    const index = state.selectedImage.tagList.findIndex(tag => tag.id === state.selectedTag.id);
    state.selectedImage.tagList[index] = state.selectedTag;
  },
  UPDATE_TAG_FROM_TAG_LIST: (state, item) => {
    const index = state.selectedImage.tagList.findIndex(tag => tag.id === item.id);
    state.selectedImage.tagList[index] = item;
  },
  CLEAR_SELECTED_TAG: (state) => {
    state.selectedTag = {};
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
