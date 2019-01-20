<template>
    
    <div class="toasts" aria-live="polite" aria-atomic="true" v-if="toasts.length">

        <!-- Then put toasts within -->
        <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="toast-header">
            <img src="" class="rounded mr-2" alt="">
            <strong class="mr-auto">Bootstrap</strong>
            <small class="text-muted">just now</small>
            <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="toast-body">
            See? Just like this.
          </div>
        </div>

        <div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="toast-header">
            <img src="" class="rounded mr-2" alt="">
            <strong class="mr-auto">Bootstrap</strong>
            <small class="text-muted">2 seconds ago</small>
            <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="toast-body">
            Heads up, toasts will stack automatically
          </div>
        </div>

    </div>

</template>

<script>
import { EventBus } from '../global/event-bus.js';

export default {
  name: "toasts",
  data() {
    return {
      toasts: new Array
    }
  },
  mounted() {
    let _this = this;
    EventBus.$on('socket-message', (data) => {
      _this.$data.toasts.push(data);
    });
  }

}
</script>
