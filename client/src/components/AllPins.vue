<template>
  <div>
    <app-header></app-header>
    <section>
      <h1>#All Pins</h1>
    </section>
    <div class="pin-grid">
      <app-card v-for="pin in allPins"
                :key="pin._id"
                :imgUrl="pin.imgUrl"
                :siteUrl="pin.siteUrl"
                :numLikes="pin.numLikes"
                :context="'all'"
      ></app-card>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import Header from '../containers/Header.vue';
  import Card from '../containers/Card.vue';
  export default {
    computed: mapGetters({
      allPins: 'allPins'
    }),
    components: {
      'app-header' : Header,
      'app-card': Card
    }
  }
</script>

<style lang="scss" scoped>
  section {
    background-color: #f1f7ed;
    height: 400px;
  }
</style>
