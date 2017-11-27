<template>
  <div class="page-container">
    <div class="welcome-box">
      <div>
        <h1>Window surf</h1>
        <h5>A place for out of window photographs!</h5>
        <br>
        <router-link tag="button" to="/pins" class="btn btn-primary btn-lg">Get started</router-link>
      </div>
    </div>
    <div class="video-container">
      <video loop muted autoplay poster="dist/assets/Cloud_Surf.jpg" class="background-video">
        <source src="dist/assets/Cloud_Surf.webm" type="video/webm">
        <source src="dist/assets/Cloud_Surf.mp4" type="video/mp4">
        <source src="dist/assets/Cloud_Surf.ogv" type="video/ogv">
      </video>
    </div>
  </div>
</template>

<script>

</script>

<style scoped lang="scss">
  .welcome-box {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 8px;
    padding: 40px;
    text-align: center;
    color: whitesmoke;
    position: fixed;
    height: 100vh;
    width: 100vw;
  }
  .video-container {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    z-index: -100;
    .background-video {
      position: absolute;
      top: 0;
      left: 0;
      min-width: 100%;
      min-height: 100%;
    }
  }
</style>
