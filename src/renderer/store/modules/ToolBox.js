const state = {
  selectedTool: {},
  toolState: {},
  mouseState: {},
};

const getters = {
  getSelectedTool: state => state.selectedTool,
  getToolState: state => state.toolState,
};

const actions = {
  setSelectedTool: ({ commit }, n) => {
    commit('SET_SELECTED_TOOL', n);
  },
  setToolState: ({ commit }, n) => {
    commit('SET_TOOL_STATE', n);
  },
};

const mutations = {
  SET_SELECTED_TOOL: (state, n) => {
    state.selectedTool = n;
  },
  SET_TOOL_STATE: (state, n) => {
    state.toolState = n;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
