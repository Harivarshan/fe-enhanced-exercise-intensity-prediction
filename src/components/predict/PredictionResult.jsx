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
        const [isDataAvailable, setIsDataAvailable] = useState()
        const [isHidden, setIsHidden] = useState(false)
        const [id, setId] = useState()
        const [role, setRole] = useState()
        const navigate = useNavigate()
        const [isLoading, setIsLoading] = useState(false)


        const getAuthStatus = async () => {
            try {
                setIsLoading(true)
                const userInfo = await checkLogin();
                console.log(userInfo)
                setId(userInfo['id'])
                setRole(userInfo['role'])
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
            console.log("I here boooo", userId)
            const id_chosen = role === 'admin' ? parseInt(userId) : parseInt(id)
            setIsHidden(true)
            setIsLoading(true)
            const response = await PredictionService.predict({"id": id_chosen})
            if (response.status === 200) {
                setIsLoading(false)
                setIsDataAvailable(true)
                setUserData({...userData, ...response.data})
            }

            console.log(response.data)
        }

        const vo2_max_chart = {
            "type1": 42,
            "type2": 40,
            "type3": 35,
            "type4": 32,
            "type5": 30,
            "type6": 26,

        }
        const vo2_max_calculator = (age) => {
            let level;
            console.log(age)
            if (age >= 65) {
                level = vo2_max_chart["type6"];
            } else if (age >= 56) {
                level = vo2_max_chart["type5"];
            } else if (age >= 46) {
                level = vo2_max_chart["type4"];
            } else if (age >= 36) {
                level = vo2_max_chart["type3"];
            } else if (age >= 26) {
                level = vo2_max_chart["type2"];
            } else if (age >= 18) {
                level = vo2_max_chart["type1"];
            }
            return level;
        }
        const generateAdvice = (a_lvl, current_heart, required_heart) => {
            const a_lvl_status = a_lvl >= 30 ? (<li>Great daily activity level! <span
                    className="badge text-bg-success">Good</span>
                </li>) :
                (<li>Increase daily activity <span
                    className="badge text-bg-warning">Important</span>
                </li>)
            const heart_status = required_heart > current_heart ?
                (<li>Increase zone 2 cardio or include weighting for few minutes<span
                    className="badge text-bg-warning">Important</span></li>) :
                (<li>Great cardio level! <span
                    className="badge text-bg-success">Good</span></li>)
            return (
                <ul>
                    {a_lvl_status && a_lvl_status}
                    {heart_status && heart_status}
                </ul>
            )
        }

        const resultScreen =

            isDataAvailable &&
            <div className="overiduuu">
                <dl className="row">
                    <dt className="col-sm-9">User current activity level</dt>
                    <dd className="col-sm-3">{userData['predictions']} </dd>
                    <dt className="col-sm-9">Current Cardio level</dt>
                    <dd className="col-sm-3">{userData['VO2_Max']} </dd>
                    <dt className="col-sm-9">Required Cardio level</dt>
                    <dd className="col-sm-3">{vo2_max_calculator(userData['Age'])} </dd>
                </dl>

                <div className="alert alert-info">
                    {generateAdvice(userData['predictions'], userData['VO2_Max'], vo2_max_calculator(userData['Age']))}
                </div>
            </div>

        const loadingScreen =
            <p className="card-text placeholder-glow">
                <span className="placeholder col-7"></span>
                <span className="placeholder col-9"></span>
                <span className="placeholder col-7"></span>
                <span className="placeholder col-9"></span>
            </p>


        const filler = () => {
            return (
                <>
                    <div className="row">
                        <div className="col-5 border-end">
                            <div>
                                <img src={img} alt="" className="img-calib"/>
                            </div>
                        </div>
                        <div className="col my-auto">
                            <button onClick={getPrediction} hidden={isHidden} className="buton ">
                                Predict
                            </button>
                            {isLoading ? loadingScreen : resultScreen}
                        </div>
                    </div>

                </>
            )
        }

        return (<>
                <div className="mx-auto margin-top mb-0 p-3 shadow rounded-4 w-50">
                    {filler()}
                </div>
            </>
        );
    }
;


export default PredictionPage;
