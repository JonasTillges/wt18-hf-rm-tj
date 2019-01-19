import Api from '@/services/Api'

export default {
    compose(credentials) {
        return Api().post('compose', credentials);
    },
    getUserData(credentials) {
        return Api().post('getUserData', credentials);
    },
    getPost(credentials) {
        return Api().post('post', credentials);
    },
    getList(credentials) {
        return Api().post('list', credentials);
    },
    comment(credentials) {
        return Api().post('comment', credentials);
    },
    register(credentials) {
        return Api().post('register', credentials);
    },
    editPost(credentials) {
        return Api().post('editPost', credentials);
    },
    editComment(credentials) {
        return Api().post('editComment', credentials);
    }
}
