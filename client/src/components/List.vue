<template>
  <div class="container">


    <div class="list">
      <div v-for="(item) in documents" :key="item._id" class="list_post">

        <div class="card border-light mb-3">
          <div class="card-header">
            {{item._user.name}} am {{item.created_at | formatDate}}
            <router-link :to="{ name: 'Post', params: { id: item._id }}" class="post_more">Mehr</router-link>
          </div>
          <div class="card-body row align-items-center">
            <div class="col-12 col-sm-9">
              <h5 class="card-title">{{ item.title }}</h5>
              <div class="card-text" v-html="item.content">{{ item.content }}</div>
              <div class="post_tags">
                <span v-for="(doc) in item._tags" :key="doc._tag._id" class="post_tag">
                  {{doc._tag.name}}
                </span>
              </div>
            </div>
            <div class="col-12 col-sm-3 text-muted post_info">
              <span class="post_comments-count">{{item._comments.length}}</span>
              <span class="post_comments-answers">Antworten</span>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>

  import {EventBus} from '../global/event-bus.js';

  export default {
    name: 'list',
    data () {
      return {
        documents: Array
      }
    },
    mounted() {

      let _this = this;

      // Listen for list-updated event and its payload.
      EventBus.$on('list-updated', function (value) {
        console.log('list update');
        _this.$data.documents = _this.$applicationStorage.posts;
      });

      this.$data.documents = this.$applicationStorage.posts;
    }


  }
</script>
