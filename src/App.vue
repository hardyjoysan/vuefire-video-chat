<template>
  <div id="app" class="container-fluid">
    <div class="row">
      <div class="col-8">
        <JwPlayer />
      </div>
      <div class="col-4">
        <RandomChat />
      </div>
    </div>
  </div>
</template>

<script>
import JwPlayer from './components/JwPlayer';
import RandomChat from './components/RandomChat';

export default {
  name: 'App',
  components: {
    JwPlayer,
    RandomChat
  }
}
</script>

<style scoped>
@import'~bootstrap/dist/css/bootstrap.min.css';

</style>