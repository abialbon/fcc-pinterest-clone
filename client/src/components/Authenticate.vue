<template>
  <p>I am the authenticate component</p>
</template>

<script>
  import Vue from 'vue';
  import { store } from '../store/store';
  export default {
    beforeRouteEnter: (to, from, next) => {
    // TODO: Change the URL
    let authServerUrl = `https://window-surf.herokuapp.com/auth/twitter/callback`;
    Vue.http.post(authServerUrl, {
      oauth_token: to.query.oauth_token,
      oauth_verifier: to.query.oauth_verifier })
      .then(data => data.json())
      .then(data => {
        // TODO: Better error handling cases for authentication failure
        if (data.authenticated) {
          store.dispatch('authenticate', { token: data.token, displayName: data.displayName });
          localStorage.setItem('app_name', data.displayName);
          localStorage.setItem('app_token', data.token);
          store.dispatch('getMyPins');
          next('/pins');
        } else {
          next('/')
        }
      })
      .catch(e => next())
    }
  }
</script>

<style>

</style>
