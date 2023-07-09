import './App.css'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import HomePage from "./components/common/home/home.jsx";
import LandingPage from "./components/common/landing/landing_page.jsx";

const App = () => {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/home" element={<HomePage/>}/>
            </Routes>
        </Router>
    );
};

export default App
