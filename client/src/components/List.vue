<template>
  <div class="container">
    <h1>Übersicht Beiträge</h1>

    <div id="example-2">
      <div v-for="(item, index) in documents" v-if="!item.isComplete">
        <div>{{ item.title }}</div>
        <div>{{ item.content }}</div>
        <div>Tags:
          <span v-for="(doc, index) in item._tags" v-if="!item.isComplete">
            {{doc._tag.name}}
          </span>
        </div>
        <router-link :to="{ name: 'Post', params: { id: item._id }}">Mehr</router-link>
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
