<template>
   <div>
       <router-view></router-view>
   </div>
</template>

<script>
  import { mapActions } from 'vuex';
  export default {
    methods: mapActions({
      initialAuthenticate: 'initialAuthenticate',
      getAllPins: 'getAllPins'
    }),
    created() {
      this.initialAuthenticate();
      this.getAllPins();
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
