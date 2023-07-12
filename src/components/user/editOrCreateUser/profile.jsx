// noinspection DuplicatedCode

import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import './profile.css'
import UserService from "../../../service/UserService.jsx";
import AuthService from "../../../service/AuthService.jsx";

const Profile = () => {
    const [userData, setUserData] = useState({});
    const userId = useParams().id;

    const [id, setId] = useState()
    const navigate = useNavigate()
    const [isEdit, setIsEdit] = useState(true)
    const [isCreate, setIsCreate] = useState(false)
    const [isLoading, setIsLoading] = useState(false)


    const handleFormSubmit = (e) => {
        e.preventDefault();
        // if (isSignIn === 'signin') {
        //     const data = Login()
        //     console.log('Perform sign-in:', email, data);
        // } else {
        //     Login()
        // }
        //
        // setEmail('');
        // setPassword('');
    };

    const getAuthStatus = async () => {
        try {
            setIsLoading(true)
            const userInfo = await checkLogin();
            setId(userInfo['id'])
            const response = userInfo['role'] === 'user' ? await UserService.getUserById(userInfo['id']) : await UserService.getUserById(userId);
            setUserData(response.data);
        } catch (error) {
            if (error.response.status === 404) {
                console.log("am i here?")
                setIsCreate(true)
                setIsEdit(false)
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

    useEffect(() => {
        updateValue("Person ID", id)
    }, [id]); // Dependency array with myVariable


    const Loading = () => {
        if (isLoading) {
            return <div className="alert alert-info mt-3" role="alert">
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        }
    }

    const editMode = () => {
        setIsEdit(false)
    }

    const AddData = async () => {
        try {
            setIsLoading(true)
            console.log(id)
            if (isCreate) {
                await console.log("inside block")
                updateValue("Person ID", id)
                console.log(userData)
            }
            console.log(userData)
            const response = isCreate ? await UserService.createUser(userData) : await UserService.updateUser(userData, id)
            if (response.status === 200) {
                return response.data
            }
        } catch (e) {
            console.log(e.response, e)
        } finally {
            console.log(userData)
            setIsLoading(false)
            setIsEdit(true)
            setIsCreate(false)
        }
    }

    const updateValue = (type, e) => {
        setUserData(userData => ({
            ...userData,
            [type]: e,
        }));
    }


    return (
        <div className="mx-auto margin-top mb-0 p-3 shadow rounded-4 w-50">
            <h2>{Object.keys(userData).length > 0 ? "Profile 👔" : "Create User 👔"}</h2>
            {Loading()}
            <form onSubmit={handleFormSubmit}>
                Age 🔢 <br/>
                <div className="mb-2">
                    <input className="bordaaa shadow-sm" type="number" value={userData['Age']}
                           onChange={(e) => updateValue('Age', e.target.value)}
                           required disabled={isEdit}/>
                </div>

                Gender ☿️ : <br/>
                <div className="mb-2">
                    <select name="encoded_gender" className="bordaaa shadow-sm" disabled={isEdit}
                            onChange={(e) => updateValue(e.target.name, e.target.value)}
                            value={userData['encoded_gender']} required>
                        <option value="">Select gender</option>
                        <option value={0}>Male</option>
                        <option value={1}>Female</option>
                    </select>
                </div>

                Avg Daily Steps 🚶‍♂️: <br/>
                <div className="mb-2">
                    <input className="bordaaa shadow-sm" type="number" value={userData['Daily Steps']}
                           disabled={isEdit}
                           onChange={(e) => updateValue('Daily Steps', e.target.value)}
                           required/>
                </div>
                Resting Heart Rate 💓 : <br/>
                <div className="mb-2">
                    <input className="bordaaa shadow-sm" type="number" value={userData['Heart Rate']}
                           disabled={isEdit}
                           onChange={(e) => updateValue('Heart Rate', e.target.value)}
                           required/>
                </div>
                VO2_Max 🌬️: <br/>
                <div className="mb-2">
                    <input className="bordaaa shadow-sm" type="email" value={userData['VO2_Max']}
                           disabled={isEdit}
                           onChange={(e) => updateValue('VO2_Max', e.target.value)}
                           required/>
                </div>
                Diastolic pressure #️🔽 : <br/>
                <div className="mb-2">
                    <input className="bordaaa shadow-sm" type="number" value={userData['diastolic_preasure']}
                           disabled={isEdit}
                           onChange={(e) => updateValue('diastolic_preasure', e.target.value)}
                           required/>
                </div>
                Diastolic pressure #️🔼 : <br/>
                <div className="mb-2">
                    <input className="bordaaa shadow-sm" type="number" value={userData['systolic_preasure']}
                           disabled={isEdit}
                           onChange={(e) => updateValue('systolic_preasure', e.target.value)}
                           required/>
                </div>
                BMI Category 🏋️ : <br/>
                <select name="encoded_BMI_Category" className="bordaaa shadow-sm" disabled={isEdit}
                        onChange={(e) => updateValue(e.target.name, e.target.value)}
                        value={userData['encoded_BMI_Category']} required>
                    <option value="">Select BMI category</option>
                    <option value={0}>Normal</option>
                    <option value={1}>Obese</option>
                    <option value={2}>Overweight</option>
                </select>
                <div className="warning"></div>
                <button className="me-2" type="button" onClick={editMode} hidden={isCreate} disabled={!isEdit}>Edit
                </button>
                <button type="button" onClick={AddData} disabled={isEdit}>Add</button>
            </form>
            {/*{alertBox()}*/}
        </div>
    );
};

export default Profile;
