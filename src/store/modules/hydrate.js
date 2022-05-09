import { HYDRATING, HYDRATED, HYDRATION_FAILED } from "../mutation-types";
const state = {
  hydrating: false,
  hydrated: false,
  failed: false,
};

const getters = {
  hydrated: (state) => state.hydrated,
  hydrating: (state) => state.hydrating,
};

const mutations = {
  [HYDRATING](state) {
    state.hydrating = true;
  },
  [HYDRATED](state) {
    state.hydrated = true;
    state.hydrating = false;
  },
  [HYDRATION_FAILED](state) {
    state.failed = true;
    state.hydrating = false;
  },
};

const actions = {
  async hydrate({ commit, dispatch }, data) {
    commit(HYDRATING);
    try {
      await dispatch("setUser", data);
      commit(HYDRATED);
    } catch (err) {
      commit(HYDRATION_FAILED);
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
