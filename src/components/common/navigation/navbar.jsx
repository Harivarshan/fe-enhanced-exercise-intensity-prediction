import {Outlet} from "react-router-dom";
import "./navbar.css"

import dumbbell from "../../../assets/dumbbell.png"

const NavBar = () => {


    return <>
        <div className="fullscreen">
            <nav className="navbar fixed-top navbar-expand-sm shadow-sm mb-5">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
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
                            <a className="nav-link" href="/home">Home</a>
                            <a className="nav-link" href="/users">Users</a>
                            <a className="nav-link" href="/predict">Predict</a>
                        </div>
                    </div>
                </div>
            </nav>
            <Outlet/>
        </div>
    </>
}

export default NavBar;
