import {Outlet, useNavigate} from "react-router-dom";
import "./navbar.css"

import dumbbell from "../../../assets/dumbbell.png"
import {useEffect, useState} from "react";
import AuthService from "../../../service/AuthService.jsx";

const NavBar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [userType, setUserType] = useState("")
    const Navigate = useNavigate();


    useEffect(() => {
        AuthService.validate().then((res) => {
            setIsAuthenticated(true);
            setUserType(res.data['role'])
        });
    }, [setUserType])
    const renderContent = (isAuthenticated) => {
        if (isAuthenticated) {
            if (userType === "user") {
                return (
                    <>
                        <a className="nav-link" onClick={() =>
                            Navigate('/profile')
                        }>Profile</a>
                        <a className="nav-link" onClick={() =>
                            Navigate('/predict')
                        }>Predict</a>
                        <a className="nav-link" onClick={() =>
                            Navigate('/signout')
                        }>Sign out</a>
                    </>
                )
            }
            if (userType === "admin") {
                return (
                    <>
                        <a className="nav-link" onClick={() =>
                            Navigate('/users')
                        }>Users</a>
                        <a className="nav-link" onClick={() =>
                            Navigate('/signout')
                        }>Sign out</a>
                    </>
                )
            }
        } else {
            return (<a className="nav-link" onClick={() =>
                Navigate('/login')
            }>Log In</a>)
        }
    }

    return <>
        <div className="fullscreen">
            <nav className="navbar fixed-top navbar-expand-sm shadow-sm mb-5">
                <div className="container-fluid">
                    <a className="navbar-brand" onClick={() =>
                        Navigate('/')
                    }>
                        <img src={dumbbell} alt="Logo" width="32" height="32"
                             className="d-inline-block align-text-top me-1 "/>
                        P-I-E-E
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav ms-sm-auto">
                            <a className="nav-link" onClick={() =>
                                Navigate('/home')
                            }>Home</a>
                            {renderContent(isAuthenticated)}
                        </div>
                    </div>
                </div>
            </nav>
            <Outlet/>
        </div>
    </>
}

export default NavBar;
