import Vue from 'vue';

//application Storage
Vue.prototype.$applicationStorage = {
    isLoggedIn: false,
    token: "",
    firebase: Object,
    user: {name: ""},
    posts: new Array,
    tags: new Array,
    concatAndDeDuplicateObjects: (p, ...arrs) => [].concat(...arrs).reduce((a, b) => !a.filter(c => b[p] === c[p]).length ? [...a, b] : a, []),
    addPosts: (newPosts, _this) => {
        let merged = _this.concatAndDeDuplicateObjects('_id', newPosts, _this.posts);
        if (merged.length) {
            _this.posts = _.orderBy(merged, [c => c.created_at], ['desc'])
        }
    }

};

