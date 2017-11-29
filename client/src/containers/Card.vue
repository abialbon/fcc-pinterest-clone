<template>
  <div class="pin-grid-item">
    <div class="card">
      <div class="card-image">
        <img :src="imgUrl" alt="">
      </div>
      <div class="card-footer">
        <a :href="siteUrl" target="_blank" class="btn btn-primary">Visit Site</a>
        <button class="btn btn-success" v-if="context=='user'" @click="deletePin(id)">Delete</button>
        <button class="btn badge" :data-badge="numLikes" @click="like(id)">Like &nbsp;</button>
      </div>
    </div>
  </div>
</template>

<script>
  import Masonry from 'masonry-layout';
  import { mapActions } from 'vuex';
  export default {
    props: ['imgUrl', 'siteUrl', 'numLikes', 'context', 'id'],
    methods: {
      ...mapActions({
        deletePin : 'deleteMyPin',
        like: 'likeAPin'
      }),
    },
    mounted() {
      let msry = new Masonry('.pin-grid', {
        itemSelector: '.pin-grid-item',
        columnWidth: 270
      })
    }
  }
</script>

<style lang="scss">
  .pin-grid-item {
    width: 250px;
    margin-bottom: 10px;
  }
  .card {
    width: 250px;
    .card-image img {
      width: 250px;
      height: auto;
    }
  }
</style>
