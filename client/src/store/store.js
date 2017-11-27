import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    authenticated: false
  },
  getters: {
    isAuthenticated: state => state.authenticated
  }
});
