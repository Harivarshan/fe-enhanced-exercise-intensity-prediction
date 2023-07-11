// noinspection DuplicatedCode

import {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import './profile.css.css'
import AuthService from "../../../service/AuthService.jsx";

const SignIn_Login = () => {
    const isSignIn = useParams().action; // Get the isSignIn parameter from the URL
    const [userData, setUserData] = useState({});

    const navigate = useNavigate()
    const [errorMsg, setErrorMsg] = useState("")
    const [authStatus, setAuthStatus] = useState(false)
    const [isLoading, setIsLoading] = useState(false)


    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (isSignIn === 'signin') {
            const data = Login()
            console.log('Perform sign-in:', email, data);
        } else {
            Login()
        }

        setEmail('');
        setPassword('');
    };

    const Login = async () => {
        try {
            const user_creds = {email: email, password: password, name: name?.toString()}
            console.log(user_creds)
            setErrorMsg("")
            setIsLoading(true)
            setAuthStatus(false)
            const response = isSignIn === 'signin' ? await AuthService.signIn(user_creds) :
                await AuthService.logIn(user_creds)
            if (response.status === 200) {
                setAuthStatus(true);
                console.log("data", response.data);
            }
        } catch (error) {
            if (error.response && (error.response.status === 401 || error.response.status === 400)) {
                console.log("data", error.response);
                setErrorMsg(error.response.data["error"]);
            }
        } finally {
            setIsLoading(false)
        }
    };

    useEffect(() => {
        if (authStatus) {
            navigate('/users');
        }
    }, [authStatus]);

    const alertBox = () => {
        if (errorMsg) {
            return <div className="alert alert-danger mt-3" role="alert">
                {errorMsg}
            </div>
        }
    }

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

    return (
        <div className="mx-auto margin-top mb-0 p-3 shadow rounded-4 w-50">
            <h2>Profile <img src={} alt={"log-in"}/></h2>
            {Loading()}
            <form onSubmit={handleFormSubmit}>
                {isSignIn === 'signin' ?
                    <>Name 📛 <br/>
                        <div className="mb-2">
                            <input className="bordaaa shadow-sm" type="name" value={name}
                                // onChange={(e) => setName(e.target.value)}
                                   required/>
                        </div>
                    </> :
                    ''}
                Email 📩: <br/>
                <div className="mb-2">
                    <input className="bordaaa shadow-sm" type="email" value={userData}
                        // onChange={(e) => setEmail(e.target.value)}
                           required/>
                </div>
                Password 🔑 : <br/>
                <div className="mb-2">
                    <input className="bordaaa shadow-sm" type="password" value={password}
                        // onChange={(e) => setPassword(e.target.value)}
                           required/>
                </div>
                Email 📩: <br/>
                <div className="mb-2">
                    <input className="bordaaa shadow-sm" type="email" value={userData}
                        // onChange={(e) => setEmail(e.target.value)}
                           required/>
                </div>
                Password 🔑 : <br/>
                <div className="mb-2">
                    <input className="bordaaa shadow-sm" type="password" value={password}
                        // onChange={(e) => setPassword(e.target.value)}
                           required/>
                </div>
                <div className="warning"></div>
                <button type="button">Edit</button>
                <button type="button">Add</button>
            </form>
            {alertBox()}
        </div>
    );
};

export default SignIn_Login;
