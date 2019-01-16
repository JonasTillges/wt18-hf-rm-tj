<template>
  <div class="container">
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
  import ActionService from '@/services/ActionService'


  export default {
  name: 'list',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      documents: Array
    }
  },
  mounted() {

    //TODO implement in applicationStorage ... if empty then getList else use storage

    if(this.$applicationStorage.posts.length) {
      this.$data.documents = this.$applicationStorage.posts;
      console.log('documents from chache');
    } else {
      ActionService.getList({}).then(
        (answer) => {
        //TODO implement in applicationStorage!!!let concatAndDeDuplicateObjects = (p, ...arrs) => [].concat(...arrs).reduce((a, b) => !a.filter(c => b[p] === c[p]).length ? [...a, b] : a, []);
        let concatAndDeDuplicateObjects = (p, ...arrs) => [].concat(...arrs).reduce((a, b) => !a.filter(c => b[p] === c[p]).length ? [...a, b] : a, []);
        this.$applicationStorage.posts = concatAndDeDuplicateObjects('_id', this.$applicationStorage.posts, answer.data.documents);
        this.$data.documents = this.$applicationStorage.posts;
        console.log('documents from server');
    },
      (err) => {
        console.log(err.message);
      }
    );
    }

  }
}
</script>
