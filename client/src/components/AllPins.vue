<template>
  <div>
    <app-header></app-header>
    <section>
      <h1>#All Pins</h1>
    </section>
  </div>
</template>

<script>
  import Header from '../containers/Header.vue';
  export default {
    components: {
      'app-header' : Header
    }
  }
</script>

<style lang="scss" scoped>
  section {
    background-color: #f1f7ed;
    height: 400px;
  }
</style>
