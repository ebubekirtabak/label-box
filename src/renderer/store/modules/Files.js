const state = {
  folderGroups: [],
};

const mutations = {
  SET_FOLDER_GROUPS (state, n) {
    state.folderGroups = n;
  },
};

const getters = {
  getFolderGroups: state => state.folderGroups,
};

const actions = {
  setFolderGroups ({ commit }, n) {
    commit('SET_FOLDER_GROUPS', n);
  },
};

export default {
  state,
  actions,
  getters,
  mutations,
};
