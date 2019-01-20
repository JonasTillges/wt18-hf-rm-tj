<template>
    
  <div v-if="notification" class="row">
    <div class="alert alert-danger col-12" role="alert">
      {{notification}}
    </div>
  </div>
    
</template>

<script>
import { EventBus } from '../global/event-bus.js';

export default {
  name: "notification",
  data() {
    return {
      notification: ""
    }
  },
  mounted() {
    let _this = this;
    EventBus.$on('notification', (message) => {
      _this.$data.notification = message;
    });
  }

}
</script>
