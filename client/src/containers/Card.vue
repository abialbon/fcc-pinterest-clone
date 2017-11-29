<template>
  <div class="pin-grid-item">
    <div class="card">
      <div class="card-image">
        <img :src="imgUrl" alt="">
      </div>
      <div class="card-footer">
        <a :href="siteUrl" target="_blank" class="btn btn-primary">Visit Site</a>
        <button class="btn btn-delete" v-if="context=='user'" @click="deletePin(id)"><i class="icon icon-delete"></i></button>
        <button class="btn btn-like badge" :data-badge="numLikes" @click="like(id)"><img id="like" src="/assets/like.svg" alt="">&nbsp;Like</button>
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
      let m = new Masonry('.pin-grid', {
        itemSelector: '.pin-grid-item'
      })
    }
  }
</script>

<style lang="scss" scoped>
  .btn {
    color: white;
    border: none;
  }
  .btn-primary {
    background-color: rgba(1,196,159, 1);
  }
  .btn-delete {
    background-color: rgba(255,41,75,0.9);
  }
  .btn-like {
    background-color: rgba(26,135,232,0.9);
  }
  .badge:after {
    background-color: rgba(1,196,159, 1);
  }
  #like {
    width: 18px;
    margin-bottom: -3px;
  }
</style>
