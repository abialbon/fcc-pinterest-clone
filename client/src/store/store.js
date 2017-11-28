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
      state.authenticated = true;
      state.token = payload.token;
      state.displayName = payload.displayName;
    },
    addToMyPins: (state, payload) => {
      state.myPins = [...state.myPins, payload]
    }
  },
  actions: {
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
