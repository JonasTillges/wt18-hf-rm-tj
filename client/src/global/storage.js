import Vue from 'vue';

//application Storage
Vue.prototype.$applicationStorage = {
    user: {_id: "5c3b3941d2f0f512fce7f255"},
    posts: new Array,
    tags: new Array,
    concatAndDeDuplicateObjects: (p, ...arrs) => [].concat(...arrs).reduce((a, b) => !a.filter(c => b[p] === c[p]).length ? [...a, b] : a, []),
    addPosts: (newPosts, _this) => {
        _this.posts = _this.concatAndDeDuplicateObjects('_id', newPosts, _this.posts);
    }
};

