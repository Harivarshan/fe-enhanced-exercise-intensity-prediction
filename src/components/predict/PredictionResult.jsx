// noinspection DuplicatedCode

import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import './prediction.css'
import UserService from "../../service/UserService.jsx";
import AuthService from "../../service/AuthService.jsx";
import img from "../../assets/statistics.png"
import PredictionService from "../../service/PredictionService.jsx";


const PredictionPage = () => {
    const [userData, setUserData] = useState({});
    const userId = useParams().id;

    const [id, setId] = useState()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)


    const getAuthStatus = async () => {
        try {
            setIsLoading(true)
            const userInfo = await checkLogin();
            console.log(userInfo)
            setId(userInfo['id'])
            const response = userInfo['role'] === 'user' ? await UserService.getUserById(userInfo['id']) : await UserService.getUserById(userId);
            setUserData(response.data);
        } catch (error) {
            if (error.response.status === 404) {
                navigate('/profile');
            }
        } finally {
            setIsLoading(false)
        }
    }

    const checkLogin = async () => {
        try {
            const response = await AuthService.validate();
            if (response.status === 200) {
                return response.data
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                navigate('/home');
            }
        }
    };

    useEffect(() => {
        getAuthStatus()
    }, []);

    const getPrediction = async () => {

        const data = await PredictionService.predict({"id": id})
        console.log(data)

    }
    const filler = () => {
        if (true) {
            return (
                <>
                    <div className="">
                        <img src={img} alt="" className="img-calib"/>
                        <button onClick={getPrediction} className="buton ">
                            Predict
                        </button>
                    </div>
                </>
            )
        }
    }

    return (<>
            <div className="mx-auto margin-top mb-0 p-3 shadow rounded-4 w-50">
                {filler()}
            </div>
        </>
    );
};

export default PredictionPage;
