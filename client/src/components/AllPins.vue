<template>
  <div>
    <app-header></app-header>
    <section class="bg-dark">
      <h1>All Pins</h1>
    </section>
  </div>
</template>

<script>
  import Header from '../containers/header.vue';
  export default {
    components: {
      'app-header' : Header
    }
  }
</script>
