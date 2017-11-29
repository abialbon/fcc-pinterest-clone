<template>
   <div>
     <router-view></router-view>
   </div>
</template>

<script>
  import { mapActions } from 'vuex';
  export default {
    methods: mapActions({
      initialAuthenticate: 'initialAuthenticate'
    }),
    created() {
      this.initialAuthenticate();
    }
  }
</script>

<style lang="scss">
  .active {
    background-color: #ffe135 !important;
    color: white !important;
    font-weight: bold !important;
  }
</style>
