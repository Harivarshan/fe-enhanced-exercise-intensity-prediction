import axiousClient from "./axiousClient/axiousClient.jsx";

const USER_API_BASE_URL = "http://127.0.0.1:5000/users";

class UserService {

    getUsers() {
        return axiousClient.get(USER_API_BASE_URL);
    }

    createUser(user) {
        return axiousClient.post(USER_API_BASE_URL, user);
    }

    getUserById(userId) {
        return axiousClient.get(USER_API_BASE_URL + '/' + userId);
    }

    updateUser(user, userId) {
        return axiousClient.put(USER_API_BASE_URL + '/' + userId, user);
    }

    deleteUser(userId) {
        return axiousClient.delete(USER_API_BASE_URL + '/' + userId);
    }
}

export default new UserService()