<template>
  <div>
    <app-header></app-header>
    <div class="pin-grid">
      <app-card v-for="pin in myPins"
          :key="pin._id"
          :imgUrl="pin.imgUrl"
          :siteUrl="pin.siteUrl"
          :numLikes="pin.numLikes"
          :context="'user'"
          :id="pin._id"
      ></app-card>
    </div>
  </div>
</template>

<script>
  import Header from '../containers/Header.vue';
  import Card from '../containers/Card.vue';
  import { mapGetters } from 'vuex';
  export default {
    computed: mapGetters({
      myPins: 'myPins'
    }),
    components: {
      'app-header' : Header,
      'app-card': Card
    }
  }
</script>

<style>
  .pin-grid {
    width: 95%;
    margin: auto;
  }
</style>
