<template>
  <div class="card">
    <div class="card-image">
      <img :src="imgUrl" alt="">
    </div>
    <div class="card-footer">
      <a :href="siteUrl" target="_blank" class="btn btn-primary">Visit Site</a>
      <button class="btn badge" :data-badge="numLikes">Like &nbsp;</button>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['imgUrl', 'siteUrl', 'numLikes']
  }
</script>

<style lang="scss" scoped>
  .card {
    width: 300px;
    .card-image img {
      width: 300px;
      height: auto;
    }
  }
</style>
