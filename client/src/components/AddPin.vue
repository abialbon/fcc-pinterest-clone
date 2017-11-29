<template>
  <div class="add-card container">

    <app-header></app-header>
    <div class="card">
      <div class="card-image">
        <img :src="imgurl" @error="imageLoadError" alt="">
      </div>
      <div class="card-header">
        <div class="card-title h4">Add your pin</div>
      </div>
      <div class="card-body">
    <form @submit.prevent="">
      <div class="form-group">
        <label for="imgurl" class="form-label">Image</label>
        <input
          class="form-input"
          name="imgurl"
          id="imgurl"
          @input="imgurl = $event.target.value"
          placeholder="image url"
        />
      </div>
      <div class="form-group">
        <label for="siteurl" class="form-label">Website</label>
        <input
          class="form-input"
          name="siteurl"
          id="siteurl"
          v-model="siteurl"
          placeholder="website url"
        />
      </div>
      <div class="form-group">
        <input class="btn btn-primary" type="Submit" value="Submit" @click.prevent="sendRequest"/>
      </div>
    </form>
      </div>
    </div>

  </div>
</template>

<script>
import Header from '../containers/Header';
import { mapActions } from 'vuex';
export default {
  data: function() {
    return {
      imgurl: '/assets/broken-image.jpg',
      siteurl: ''
    }
  },
  methods: {
    ...mapActions({
      addPin: 'addToMyPins'
    }),
    imageLoadError() {
      this.imgurl = '/assets/broken-image.jpg'
    },
    sendRequest() {
      this.addPin({ imgUrl: this.imgurl, siteUrl: this.siteurl });
      this.siteurl = '';
      document.querySelector('#imgurl').value = '';
    }
  },
  components: {
    'app-header': Header
  }
}
</script>

<style lang="scss" scoped>
  .card {
    width: 100%;
    max-width: 420px;
    margin: auto;
    .card-image img {
      width: 100%;
      height: auto;
      border-bottom: 4px solid rgba(66,66,206,0.4);
    }
  }
</style>
