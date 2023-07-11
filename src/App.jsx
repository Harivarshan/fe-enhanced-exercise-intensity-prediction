import './App.css'
import {Route, Routes} from 'react-router-dom'
import HomePage from "./components/common/home/home.jsx";
import LandingPage from "./components/common/landing/landing_page.jsx";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import NavBar from "./components/common/navigation/navbar.jsx";
import ViewUser from "./components/user/viewUser/viewUser.jsx";
import SignIn_Login from "./components/common/signIn/signIn_login.jsx";

const App = () => {

    return (
        <div className="marg">
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route element={<NavBar/>}>
                    <Route path="/:action" element={<SignIn_Login/>}/>
                    <Route path="/home" element={<HomePage/>}/>
                    <Route path="/users" element={<ViewUser/>}/>
                    <Route path="/profile" element={<ViewUser/>}/>
                </Route>
            </Routes>
        </div>
    );
};

export default App
