import Api from '@/services/Api'

export default {
    register(credentials) {
        return Api().post('register', credentials); 
    },
    activate(credentials) {
        return Api().post('activate', credentials);
    }
}
