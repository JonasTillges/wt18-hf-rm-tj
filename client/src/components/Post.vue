<template>
  <div class="container">
    <h1>Thema verfassen</h1>
    <div class="form-group">
        <input v-model="topic" type="text" class="form-control" id="topic" aria-describedby="topicHelp" placeholder="Was ist dein Thema?">
        <small id="topicHelp" class="form-text text-muted">Benutze ein aussagekräftiges Thema, um andere User darauf aufmerksam zu machen.</small>
      </div>
      <div class="form-group">
        <wysiwyg v-model="content" />
      </div>
      <div class="form-group">
        <label for="tags">Tags</label>
        <input v-model="tags" type="text" class="form-control" id="tags" aria-describedby="tagsHelp" placeholder="Webtechnologien, Vue, Javascript">
        <small id="tagsHelp" class="form-text text-muted">Kommaseparierte Tags z.B. "Webtechnologien, Vue, Javascript"</small>
      </div>
      <button type="submit" class="btn btn-primary">Thema online stellen</button>
  </div>


</template>

<script>

  import ActionService from '@/services/ActionService'


  export default {
  name: 'list',
  data () {
    return {
      topic: '',
      content: '',
      tags: '',
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed: {
    postData: function () {
    }
  },
  mounted() {
    console.log(this.$applicationStorage);
    console.log('Beitrag laden');
    console.log(this.$route.params.id);

    this.$data.topic = "Hey";
    this.$data.content = "was los hier?";


  }
}
</script>
