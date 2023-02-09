import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect, Routes } from "react-router-dom";
import ManagerLayout from '../components/layouts/ManagerLayout';
import UserLayout from '../components/layouts/UserLayout';
const App = () => {
    return (
        <>
            <Router>
                <UserLayout />
            </Router>
            <Router>
                <ManagerLayout />
            </Router>
        </>
    );
}


export default App