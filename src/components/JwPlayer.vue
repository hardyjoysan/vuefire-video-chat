<template>
  <div>
    <h1>JWPlayer</h1>
    <div id="test_player"></div>
    <button class="test_btn" @click="addTodo">TEST</button>
  </div>
</template>

<script>
import { db } from '../db';

export default {
  data() {
    return {
      documents: [],
      newTodo: "",
      counter: 0,
      likes: []
    }
  },
  firestore () {
    return {
      likes: db.collection('likes')
    }
  },
  methods:{
    updateLikeCount: function(){
      var node  = document.createElement("a");
      node.className = 'bubbles';
      var parent = document.querySelector('#test_player')
      parent.appendChild(node);
      setTimeout(() => {
        parent.removeChild(node);
      }, 5000);
    },
    
    addTodo: function(){
      db.collection('likes').doc('video').update({
        count: ++this.counter,
      });
    },

    timeLapsed: function(){
      var fromTime = new Date('2020-05-22T19:45:00');
      var toTime = new Date();

      var differenceTravel = toTime.getTime() - fromTime.getTime();
      var seconds = Math.floor((differenceTravel) / (1000));

      return seconds;
    },
  },
  updated: function(){
    console.log(this.counter);
    
  },
  mounted: async function(){

    db.collection('likes').doc('video').onSnapshot(likes => {
      this.counter = likes.get('count');
      this.updateLikeCount();
    }, err => {
      console.log(`Encountered error: ${err}`);
    });    
    
    var jwplayer = window.jwplayer("test_player");

    var jwConfig = {
      "autostart": false,
      "controls": true,
      "playlist": "//cdn.jwplayer.com/v2/playlists/P3Iw06yW?recommendations_playlist_id=MCqgUTWM"
    };

    await jwplayer.setup(jwConfig);

    jwplayer.on('ready', async () => {
      document.querySelector('.jw-slider-time').remove();
      await jwplayer.seek(this.timeLapsed());
    });    

  }
}
</script>

<style scoped>
  @import '../assets/test.css';
</style>