import axios from 'axios';

const USER_API_BASE_URL = "http://127.0.0.1:5000/auth";

class UserService {


    validate() {
        return axios.get(USER_API_BASE_URL + '/validate');
    }

    signIn(user_creds) {
        return axios.post(USER_API_BASE_URL + '/signin', user_creds);
    }

    signOut() {
        return axios.get(USER_API_BASE_URL + '/sign-out');
    }

    logIn(user_creds) {
        return axios.post(USER_API_BASE_URL + '/user_creds', user_creds);
    }
}

export default new UserService()