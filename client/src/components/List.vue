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
    EventBus.$on('list-updated', function(value) {
      console.log('list update');
      _this.$data.documents = _this.$applicationStorage.posts;
    });

    this.$data.documents = this.$applicationStorage.posts;
  }


}
</script>
