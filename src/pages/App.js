import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect, Routes } from "react-router-dom";
import ScrollToTop from '../components/ScrollToTop';
import Headers from '../common/Headers';
import BottomMenu from '../common/BottomMenu';
import Footer from '../common/Footer';
import { zUserRoute, zManagerRoute } from '../routes/route';
import ScrollToTopButton from '../components/ScrollToTopButton';
import MetaTag from '../components/MetaTag';
import { useState } from 'react';
import ManagerLayout from '../components/layouts/ManagerLayout';
import UserLayout from '../components/layouts/UserLayout';
const App = () => {
    return (
        <>
            <Router>
                <UserLayout />
                <ManagerLayout />
            </Router>
        </>
    );
}


export default App