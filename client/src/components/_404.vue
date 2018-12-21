<template>
    <div id="app">
        <lottie :options="defaultOptions" :height="500" :width="500" v-on:animCreated="handleAnimation"/>

    </div>
</template>

<script>
  import Lottie from './lottie.vue';
  import * as animationData from '../animations/404_page.json';

  export default {
    name: 'app',
    components: {
      'lottie': Lottie
    },
    data() {
      return {
        defaultOptions: {animationData: animationData},
        animationSpeed: 1
      }
    },
    methods: {
      handleAnimation: function (anim) {
        this.anim = anim;
        this.anim.play();
        
      },

      stop: function () {
        this.anim.stop();
      },

      play: function () {
        this.anim.play();
      },

      pause: function () {
        this.anim.pause();
      },

      onSpeedChange: function () {
        this.anim.setSpeed(this.animationSpeed);
      }
    }
  }
</script>
