import React, {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


import './css/App.css';
import Register from './components/Login/Register';
import Login from './components/Login/Login';
import ChatApp from "./components/ChatRoom/ChatApp";




function App() {


    return (
        // <div>
        //     <ChatApp/>
        // </div>
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
