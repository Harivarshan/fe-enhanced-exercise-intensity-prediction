import axiousClient from "./axiousClient/axiousClient.jsx";

const USER_API_BASE_URL = "http://127.0.0.1:5000/predict";

class UserService {


    predict(user_id) {
        return axiousClient.post(USER_API_BASE_URL, user_id);
    }


}

export default new UserService()