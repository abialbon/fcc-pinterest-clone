<template>
  <header class="navbar bg-primary">
    <div class="navbar-section">
      <router-link active-class="disabled" to="/pins" class="btn btn-link ">All Pins</router-link>
      <router-link active-class="disabled" to="/mypins" class="btn btn-link">My Pins</router-link>
    </div>
    <div class="navbar-center">
      <router-link to="/" class="navbar-brand">Window Surf</router-link>
    </div>
    <div class="navbar-section">
      <a href="#" class="btn btn-link" v-if="!isAuthenticated">Login</a>
      <a href="#" class="btn btn-link" v-if="isAuthenticated">Logout</a>
    </div>
  </header>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
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
    color: white !important;
  }
</style>
