<template>
  <div class="container" v-if="loggedIn">
      <h1>Hi {{name}}, diese Fragen hast du gestellt:</h1>
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
  import AuthService from '@/services/Auth'

  export default {
  name: 'list',
  data () {
    return {
      name: '',
      documents: Array,
      loggedIn: AuthService.isReal()
    }
  },
  mounted() {

    //TODO initiales laden der route gibt keine info

    let _this = this;

    EventBus.$on('login-status', function() {
      console.log('login!!!', AuthService.isReal());
      if (AuthService.isReal()) {
        _this.$data.loggedIn = true;
        _this.name = _this.$applicationStorage.user.name;
      } else {
        _this.$router.replace('login');
      }
    });

    let userid = _this.$applicationStorage.user._id;
    this.name = _this.$applicationStorage.user.name;

    let posts = this.$applicationStorage.posts;
    let postArray = new Array;
    posts.forEach(function (post) {
        if(post._user._id === userid){
            postArray.push(post);
        }
    });
    console.log(postArray);
    this.$data.documents = postArray;
  }


}
</script>
