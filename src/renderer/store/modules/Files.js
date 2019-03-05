const state = {
  folderGroups: [],
};

const mutations = {
  SET_FOLDER_GROUPS (state, n) {
    state.folderGroups = n;
  },
};

const actions = {
  setFolderGroups ({ commit }) {
    commit('SET_FOLDER_GROUPS');
  },
};

export default {
  state,
  actions,
  mutations,
};
