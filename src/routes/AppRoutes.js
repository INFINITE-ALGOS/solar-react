import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from '../components/Signup/Signup';
import Login from '../components/Login/Login';
import MainPage from '../components/MainPage/MainPage';
import SolarPanelPage from '../components/SolarPanelPage/SolarPanelPage';
import SuppliersPage from '../components/SuppliersPage/SuppliersPage';
//import SuppliersPage from '../components/SuppliersPage/AddProductForm';


const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/supplierspage" element={<SuppliersPage />} />
                <Route path='/signup' element={<Signup />} />
                <Route path="/" element={<MainPage />} />
                <Route path="/solar-panel" element={<SolarPanelPage />} />
            </Routes>
        </Router>
    );
}

export default AppRoutes;
