import React from 'react';
import {useNavigate} from "react-router-dom";
import Logo from "../../../assets/dumbbell.png";
import LogoTextGif from "../../../assets/logo-text.gif";
import "./landing_page.css"

const LandingPage = () => {
    const HomeButton = () => {
        const navigate = useNavigate();

        const handleButtonClick = () => {
            navigate('/home');
        };

        return (
            <button onClick={handleButtonClick}>
                Get Lifting 🏋️
            </button>
        );
    };

    return (
        <>
            <div>
                <img src={Logo} alt="P-I-E-E"/>
                <img src={LogoTextGif} alt="p-i-e-e" className="gif"/>
            </div>
            <HomeButton/>
        </>
    );
};

export default LandingPage;