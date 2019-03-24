const state = {
  selectedTool: {},
};

const getters = {
  getSelectedTool: state => state.selectedTool,
};

const actions = {
  setSelectedTool: ({ commit }, n) => {
    commit('SET_SELECTED_TOOL', n);
  },
};

const mutations = {
  SET_SELECTED_TOOL: (state, n) => {
    state.selectedTool = n;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
