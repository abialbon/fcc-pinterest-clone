<template>
  <header class="navbar">
    <div class="navbar-section">
      <router-link active-class="active" to="/pins" class="btn btn-link ">All Pins</router-link>
      <router-link active-class="active" to="/mypins" class="btn btn-link" exact>My Pins</router-link>
      <router-link active-class="active" to="/mypins/add" class="btn btn-link">Add A Pin</router-link>
    </div>
    <div class="navbar-center">
      <router-link to="/" class="navbar-brand">Window Surf</router-link>
    </div>
    <div class="navbar-section">
      <a class="btn btn-link" v-if="!isAuthenticated" @click="goToTwitterLink" >Login</a>
      <a href="#" class="btn btn-link" v-if="isAuthenticated">Logout</a>
    </div>
  </header>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    methods: {
      goToTwitterLink() {
        // Get the request token from the server and form the link to take the user for twitter authorization
        let twitterUrl;
        this.$http.post('http://localhost:3100/auth/twitter/')
          .then(data => data.json())
          .then(result => {
            twitterUrl = `https://api.twitter.com/oauth/authorize?oauth_token=${result.oauth_token}&oauth_token_secret=${result.oauth_token_secret}&oauth_callback_confirmed=${result.oauth_callback_confirmed}`
            window.location = twitterUrl;
          });
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
