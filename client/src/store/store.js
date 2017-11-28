import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    authenticated: false,
    token: '',
    displayName: ''
  },
  getters: {
    isAuthenticated: state => state.authenticated
  },
  mutations: {
    authenticate: (state, payload) => {
      state.authenticated = true;
      state.token = payload.token;
      state.displayName = payload.displayName;
    }
  },
  actions: {
    authenticate: ({ commit }, payload) => {
      commit('authenticate', payload);
    }
  }
});
