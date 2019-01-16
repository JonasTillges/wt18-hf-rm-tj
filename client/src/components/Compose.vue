<template>
  <div class="container">
    <h1>Thema verfassen</h1>
      <div class="form-group">
        <input v-model="title" type="text" class="form-control" id="title" aria-describedby="titleHelp" placeholder="Was ist dein Thema?">
        <small id="titleHelp" class="form-text text-muted">Benutze ein aussagekräftiges Thema, um andere User darauf aufmerksam zu machen.</small>
      </div>
      <div class="form-group">
        <wysiwyg v-model="content" />
      </div>
      <div class="form-group">
        <label for="tags">Tags</label>
        <input v-model="tags" type="text" class="form-control" id="tags" aria-describedby="tagsHelp" placeholder="Webtechnologien, Vue, Javascript">
        <small id="tagsHelp" class="form-text text-muted">Kommaseparierte Tags z.B. "Webtechnologien, Vue, Javascript"</small>
      </div>
      <button type="submit" @click="compose"  class="btn btn-primary">Thema online stellen</button>
  </div>
</template>

<script>
  import ActionService from '@/services/ActionService'
  export default {
  name: 'list',
  data () {
    return {
      title: 'test',
      content: 'test1',
      tags: 'test2'
    }
  },
  mounted() {
    console.log(this.$applicationStorage);
  },
  methods: {
    compose: function() {
      console.log('create post');

      ActionService.compose({
        _id: this.$applicationStorage.user._id,
        title: this.title,
        content: this.content,
        tags: this.tags
      }).then(
        (answer) => {
          let newPost = answer.data.document.pop();
          console.log(newPost);
          this.$applicationStorage.posts.push(newPost);
          this.$router.replace('post/'+newPost._id);
        },
        (err) => {
          alert(err.message);
      });
    }
  }
}
</script>
