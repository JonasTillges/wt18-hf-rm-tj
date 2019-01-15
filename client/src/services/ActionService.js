import Api from '@/services/Api'

export default {
    compose(credentials) {
        return Api().post('compose', credentials);
    },
    getUserData(credentials) {
        return Api().get('/getUserData', credentials);
    }
}
