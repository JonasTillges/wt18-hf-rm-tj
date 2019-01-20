<template>
    <div>
        <div v-if="documents.length">
            <div class="container list_header">
                <h3>Deine Fragen</h3>
            </div>
            <list :documents="documents"  />
        </div>
        <div v-if="!documents.length" class="container user_start">
            <h3> Noch keine Fragen gestellt? </h3>
            <div>Dann stell jetzt deine erste Frage oder beantworte welche.</div>
            <div>
                <router-link to="/post">
                    <i class="fa fa-question-circle" aria-hidden="true"></i>
                    Frage stellen
                </router-link>
                <router-link to="/list">
                    <i class="fa fa-pencil-square" aria-hidden="true"></i>
                    Fragen beantworten
                </router-link>
            </div>
        </div>
    </div>
</template>


<script>
import List from '../components/List.vue';
import { EventBus } from '../global/event-bus.js';
import AuthService from '@/services/Auth'

    export default {
        name: 'User',
        components: {
            'list': List
        },
        data() {
            return {
                name: '',
                documents: Array,
                loggedIn: AuthService.isReal(),
            }
        },
        methods: {
            filterForUser: function () {
                let _this = this;
                return _.filter(
                  _this.$applicationStorage.posts,
                  function(o) {
                      return (o._user._id == _this.$applicationStorage.user._id);
                  }
                )
            }
        },
        mounted() {
            let _this = this;

            this.$data.name = _this.$applicationStorage.user.name;
            // redirect to login if not logged in
            EventBus.$on('login-status', function() {
                if (AuthService.isReal()) {
                    _this.$data.loggedIn = true;
                    _this.$data.name = _this.$applicationStorage.user.name;
                } else {
                    _this.$router.replace('login');
                }
            });

            if (this.$applicationStorage.posts.length){
                this.$data.documents = this.filterForUser();
            }
            // Listen for list-updated event and its payload.
            EventBus.$on('list-updated', function (value) {
                _this.$data.documents = _this.filterForUser();
            });


        }
    }

</script>