import Vue from 'vue';

//application Storage
Vue.prototype.$applicationStorage = {
    isLoggedIn: false,
    token: "",
    firebase: Object,
    user: Object,
    posts: new Array,
    tags: new Array,
    concatAndDeDuplicateObjects: (p, ...arrs) => [].concat(...arrs).reduce((a, b) => !a.filter(c => b[p] === c[p]).length ? [...a, b] : a, []),
    addPosts: (newPosts, _this) => {
        _this.posts = _this.concatAndDeDuplicateObjects('_id', newPosts, _this.posts);
    }
};

