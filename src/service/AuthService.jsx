import axiousClient from "./axiousClient/axiousClient.jsx";

const USER_API_BASE_URL = "http://127.0.0.1:5000";

class UserService {


    validate() {
        return axiousClient.get(USER_API_BASE_URL + '/validate');
    }

    signIn(user_creds) {
        return axiousClient.post(USER_API_BASE_URL + '/signin', user_creds);
    }

    signOut() {
        return axiousClient.get(USER_API_BASE_URL + '/sign-out');
    }

    logIn(user_creds) {
        return axiousClient.post(USER_API_BASE_URL + '/login', user_creds);
    }
}

export default new UserService()