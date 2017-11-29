<template>
  <div>
    <app-header></app-header>
    <section>
      <div class="container">
        <div class="columns">
          <div class="col-4">
            <img src="/assets/night.svg" alt="">
          </div>
          <div class="col-8">
            <h1># My Pins</h1>
          </div>
        </div>
      </div>
    </section>
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
