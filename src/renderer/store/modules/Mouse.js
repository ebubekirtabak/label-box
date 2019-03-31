const state = {
  mouse: {
    x: 0,
    y: 0,
    oldX: 0,
    oldY: 0,
    startX: 0,
    startY: 0,
    direction: '+',
  },
  mouseHoldOnArea: false,
};

const getters = {
  getMouse: state => state.mouse,
  getMouseHoldOnArea: state => state.mouseHoldOnArea,
};

const actions = {
  setMouse: ({ commit }, n) => {
    commit('SET_MOUSE', n);
  },
};

const mutations = {
  SET_MOUSE: (state, n) => {
    state.mouse = n;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
