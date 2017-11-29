<template>
  <header class="navbar">
    <div class="navbar-section">
      <router-link active-class="active" to="/pins" class="btn btn-link ">All Pins</router-link>
      <router-link active-class="active" to="/mypins" class="btn btn-link" exact v-if="isAuthenticated">My Pins</router-link>
      <router-link active-class="active" to="/mypins/add" class="btn btn-link" v-if="isAuthenticated">Add A Pin</router-link>
    </div>
    <div class="navbar-center">
      <router-link to="/" class="navbar-brand">Window Surf</router-link>
    </div>
    <div class="navbar-section">
      <a class="btn btn-link" v-if="!isAuthenticated" @click="goToTwitterLink" >Login</a>
      <a href="#" class="btn btn-link" v-if="isAuthenticated" @click="logout">Logout</a>
    </div>
  </header>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  export default {
    methods: {
      ...mapActions(['authenticate']),
      goToTwitterLink() {
        // Get the request token from the server and form the link to take the user for twitter authorization
        let twitterUrl;
        this.$http.post('http://localhost:3100/auth/twitter/')
          .then(data => data.json())
          .then(result => {
            twitterUrl = `https://api.twitter.com/oauth/authorize?oauth_token=${result.oauth_token}&oauth_token_secret=${result.oauth_token_secret}&oauth_callback_confirmed=${result.oauth_callback_confirmed}`
            window.location = twitterUrl;
          });
      },
      logout() {
        this.authenticate({ token: '', displayName: '' });
        localStorage.removeItem('app_name');
        localStorage.removeItem('app_token');
      }
    },
    computed: mapGetters({
      isAuthenticated: 'isAuthenticated'
    })
  }
</script>

<style>
  .navbar {
    height: 70px;
  }
  a.btn.btn-link, .navbar-brand {
    font-size: 1.125em;
  }
</style>
