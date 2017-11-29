<template>
  <div>
    <div>
      <router-view></router-view>
    </div>
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
  section {
    height: 400px;
    background-color: #f4f7be;
    margin-bottom: 2rem;
    .col-4, .col-8 {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 400px;
    }
  }
  .pin-grid {
    width: 90%;
    margin: auto;
    .pin-grid-item {
      width: 300px;
      margin-bottom: 10px;
    }
    .card {
      width: 90%;
      margin:auto;
      .card-image img {
        width: 100%;
        height: auto;
      }
    }
  }
  @media (max-width: 500px) {
    .pin-grid-item {
      width: 100% !important;
      margin-bottom: 10px;
    }
  }
</style>
