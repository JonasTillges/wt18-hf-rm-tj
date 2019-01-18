<template>
  <div class="container">
      <h1>Fragen die du gestellt hast:</h1>
      <br>
    <div class="list">
      <div v-for="(item, index) in documents" v-if="!item.isComplete" class="list_post">
        <h4 class="post_title">{{ item.title }}</h4>
        <div class="post_content">
          <div v-html="item.content">{{ item.content }}</div>
          <router-link :to="{ name: 'Post', params: { id: item._id }}" class="post_more">Mehr</router-link>
        </div>
        <div>
          <span v-for="(doc, index) in item._tags" v-if="!item.isComplete" class="post_tag">
            {{doc._tag.name}}
          </span>
        </div>
        <hr>
      </div>
    </div>


  </div>
</template>

<script>

  import { EventBus } from '../global/event-bus.js';

  export default {
  name: 'list',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      documents: Array
    }
  },
  mounted() {

    let _this = this;

    // Listen for list-updated event and its payload.
    // EventBus.$on('list-updated', function(value) {
    //   _this.$data.documents = _this.$applicationStorage.posts;
    // });
    let userid = _this.$applicationStorage.user._id;
    console.log(userid);
    let posts = this.$applicationStorage.posts;
    let postArray = []
    posts.forEach(post => {
        console.log(post);
        if(post._user._id === userid){
            let len = postArray.push(post);
        }
    });
    console.log(postArray);
    this.$data.documents = postArray;
  }


}
</script>
