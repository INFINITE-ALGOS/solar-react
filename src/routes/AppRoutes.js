import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from '../components/Signup/Signup';
import Login from '../components/Login/Login';
import MainPage from '../components/MainPage/MainPage';
import SolarPanelPage from '../components/SolarPanelPage/SolarPanelPage';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/solar-panel" element={<SolarPanelPage />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;
