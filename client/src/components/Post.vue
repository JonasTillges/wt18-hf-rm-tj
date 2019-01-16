<template>
  <div class="container">
    <h1>{{document.title}}</h1>
    <div v-html="document.content"></div>
    <div >von: {{document._user.email}}</div>
    <div>
      <span v-for="(doc, index) in document._tags" class="post_tag" >
        {{doc._tag.name}}
      </span>
    </div>
  </div>
</template>

<script>

  import ActionService from '@/services/ActionService'

  export default {
  name: 'list',
  data () {
    return {
      document: Object
    }
  },
  computed: {
    postData: function () {
    }
  },
  mounted() {

    let _this = this;
    let postDocument = this.$applicationStorage.posts.filter(
        (document) => {
          if(document._id == _this.$route.params.id) {
            return true;
          }
        }
    );

    this.$data.document = postDocument.pop();

    console.log(this.$data.document);

  }
}
</script>
