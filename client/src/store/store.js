import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    authenticated: false,
    token: '',
    displayName: '',
    myPins: []
  },
  getters: {
    isAuthenticated: state => state.authenticated
  },
  mutations: {
    authenticate: (state, payload) => {
      state.authenticated = !!payload.token;
      state.token = payload.token;
      state.displayName = payload.displayName;
    },
    addToMyPins: (state, payload) => {
      state.myPins = [...state.myPins, payload]
    }
  },
  actions: {
    // Method to check if the user has the token on load
    initialAuthenticate({ commit }) {
      let token = localStorage.getItem('app_token');
      let displayName = localStorage.getItem('app_name');
      if (token) {
        commit('authenticate', { token, displayName});
      }
    },
    // General action to authenticate after the auth response
    authenticate: ({ commit }, payload) => {
      commit('authenticate', payload);
    },
    addToMyPins: (context, payload) => {
      Vue.http.post('http://localhost:3100/api/pin', payload,
        { headers: { 'authorization': `Bearer ${context.state.token}` } })
        .then(data => { return data.json() })
        .then((res) => {
          if (res.success) {
            context.commit('addToMyPins', res.pin);
          }
        });
    }
  }
});
