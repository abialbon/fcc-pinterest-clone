import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// TODO: Set this to the API server's URL
const baseURL = 'https://window-surf.herokuapp.com';

export const store = new Vuex.Store({
  state: {
    authenticated: false,
    token: '',
    displayName: '',
    myPins: [],
    allPins: [],
  },
  getters: {
    isAuthenticated: state => state.authenticated,
    myPins: state => state.myPins,
    allPins: state => state.allPins
  },
  mutations: {
    authenticate: (state, payload) => {
      state.authenticated = !!payload.token;
      state.token = payload.token;
      state.displayName = payload.displayName;
    },
    addToMyPins: (state, payload) => {
      state.myPins = [...state.myPins, ...payload];
    },
    addToAllPins: (state, payload) => {
      state.allPins = [...state.allPins,...payload];
    },
    deleteMyPin: (state, payload) => {
      let newMyPins = state.myPins.filter(x => x._id !== payload);
      state.myPins = [...newMyPins];
      let newAllPins = state.allPins.filter(x => x._id !== payload);
      state.allPins = [...newAllPins];
    },
    like: (state, payload) => {
      state.myPins.forEach(x => {
        if (x._id === payload) {
          x.numLikes++;
        }
      });
      state.allPins.forEach(x => {
        if (x._id === payload) {
          x.numLikes++;
        }
      })
    },
    unlike: (state, payload) => {
      state.myPins.forEach(x => {
        if (x._id === payload) {
          x.numLikes--;
        }
      });
      state.allPins.forEach(x => {
        if (x._id === payload) {
          x.numLikes--;
        }
      })
    }
  },
  actions: {
    // Method to check if the user has the token on load
    initialAuthenticate({ commit,dispatch }) {
      let token = localStorage.getItem('app_token');
      let displayName = localStorage.getItem('app_name');
      if (token) {
        commit('authenticate', { token, displayName});
        dispatch('getMyPins');
      }
    },
    getMyPins(context) {
      Vue.http.get( baseURL + '/api/mypins', { headers: { 'authorization': `Bearer ${context.state.token}` } })
        .then(response => response.json())
        .then(res => {
          context.commit('addToMyPins', res.data);
        })
    },
    getAllPins(context) {
      Vue.http.get( baseURL + '/api/pins')
        .then(response => response.json())
        .then(res => {
          context.commit('addToAllPins', res.data);
        })
    },
    // General action to authenticate after the auth response
    authenticate: ({ commit }, payload) => {
      commit('authenticate', payload);
    },
    addToMyPins: (context, payload) => {
      Vue.http.post( baseURL + '/api/pin', payload,
        { headers: { 'authorization': `Bearer ${context.state.token}` } })
        .then(data => { return data.json() })
        .then((res) => {
          if (res.success) {
            context.commit('addToMyPins', [res.pin]);
            context.commit('addToAllPins', [res.pin]);
          }
        });
    },
    deleteMyPin: (context, payload) => {
      Vue.http.delete(baseURL + '/api/pin/' + payload,
        { headers: { 'authorization': `Bearer ${context.state.token}` } })
        .then(response => response.json())
        .then(res => {
          if(res.success) {
            context.commit('deleteMyPin', payload);
          }
        })
    },
    likeAPin: (context, payload) => {
      Vue.http.put( baseURL + '/api/pin/' + payload,
        { headers: { 'authorization': `Bearer ${context.state.token}` } })
        .then(response => response.json())
        .then(res => {
            if(res.liked) {
              context.commit('like', payload);
              return;
            }
            context.commit('unlike', payload);
        })
    }
  }
});
