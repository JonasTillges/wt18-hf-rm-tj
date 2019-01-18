<template>
    <div>
        <list :options="defaultOptions"  />
    </div>
</template>


<script>
import List from './ListUser.vue'

    export default {
        name: 'listPosts',
        components: {
            'list': List
        },
        data() {
            return {

            }
        },
        methods: {

        }
    }


</script>