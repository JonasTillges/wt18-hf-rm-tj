<template>
  <list :documents="documents" />
</template>

<script>

  import {EventBus} from '../global/event-bus.js';
  import List from '../components/List.vue';

  export default {
    name: 'allPosts',
    components: {
      'list': List
    },
    data () {
      return {
        documents: Array
      }
    },
    mounted() {

      let _this = this;

      // Listen for list-updated event and its payload.
      EventBus.$on('list-updated', function (value) {
        _this.$data.documents = _this.$applicationStorage.posts;
      });

      this.$data.documents = this.$applicationStorage.posts;
    }


  }
</script>
