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
        <form>
      <div class="form-group">
        <label for="imgurl" class="form-label">Image Url</label>
        <input class="form-input" name="imgurl" id="imgurk" @input="imgurl = $event.target.value"></input>
      </div>
      <div class="form-group">
        <label for="siteurl" class="form-label">Site Url</label>
        <input class="form-input" name="siteurl" id="siteurl"></input>
      </div>
      <div class="form-group">
        <input class="btn btn-primary" type="Submit" value="Submit"></input>
      </div>
    </form>
      </div>
    </div>
    
  </div>
</template>

<script>
import Header from '../containers/header';
export default {
  data: function() {
    return {
      imgurl: 'http://localhost:8080/dist/assets/broken-image.jpg'
    }
  },
  methods: {
    imageLoadError() {
      console.log('Image error');
      this.imgurl = 'http://localhost:8080/dist/assets/broken-image.jpg'
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
    max-width: 450px;
    margin: auto;
    .card-image img {
      width: 100%;
      height: auto;
    }
  }
</style>
