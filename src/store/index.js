import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const storeInstance = new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
});

// Initial state
const initialState = JSON.parse(JSON.stringify(storeInstance.state));

//Resets the store when user logs out
const resetStore = () => {
  storeInstance.replaceState(JSON.parse(JSON.stringify(initialState)));
};
