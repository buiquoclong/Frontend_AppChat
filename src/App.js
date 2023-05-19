import React, {useEffect} from 'react';
// import ReactDOM from "react-dom/client";
// import { BrowserRouter, Route, render  } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


import './App.css';
import Register from './components/Login/Register';
import Login from './components/Login/Login';




function App() {


    return (
        <Router>
            <div>
                <h1 className="text-center">My Appchat</h1>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
