<template>
  <div>
    <app-header></app-header>
    <section>
      <div class="container">
        <div class="columns">
          <div class="col-4">
            <img src="/assets/mountain.svg" alt="">
          </div>
          <div class="col-8">
            <h1># Recent Pins</h1>
          </div>
        </div>
      </div>
    </section>
    <div class="pin-grid">
      <app-card v-for="pin in allPins"
                :key="pin._id"
                :imgUrl="pin.imgUrl"
                :siteUrl="pin.siteUrl"
                :numLikes="pin.numLikes"
                :context="'all'"
                :id="pin._id"
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
