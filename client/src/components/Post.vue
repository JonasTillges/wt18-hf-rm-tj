<template>
  <div class="container">
    <h1>{{topic}}</h1>
    <div>{{content}}</div>
  </div>


</template>

<script>

  import ActionService from '@/services/ActionService'

  export default {
  name: 'list',
  data () {
    return {
      topic: '444',
      content: '555',
      tags: '',
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed: {
    postData: function () {
    }
  },
  mounted() {
    let me = this.$applicationStorage.posts.filter(
        (document) => document._id === this.$route.params.id
    );

    console.log(me);

    let you = this.$applicationStorage.posts.filter(function(document) {
        console.log(document._id, this.$route.params.id)
      }
    );

    console.log(you);

    console.log('Beitrag laden');
    console.log(this.$applicationStorage.posts);
    console.log(this.$route.params.id);

    this.$data.topic = me.topic;
    this.$data.content = me.content;


  }
}
</script>
