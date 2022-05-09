import { SET_USER } from "./mutation-types";
const state = {
  user: {},
};

const getters = {
  user: (state) => {
    return state.user;
  },
};

const mutations = {
  [SET_USER](state, payload) {
    state.user = payload;
  },
};

const actions = {
  setUser({ commit }, data) {
    commit(SET_USER, data);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
