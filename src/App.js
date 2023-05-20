import React, {useEffect} from 'react';
// import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import {BrowserRouter, Route, Routes} from "react-router-dom";

import './css/App.css';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import ChatApp from "./components/ChatRoom/ChatApp";


function App() {


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/chat" element={<ChatApp/>}/>
            </Routes>
        </BrowserRouter>
        // <div>
        //     <ChatApp/>
        // </div>
        // <Router>
        //     <div>
        //         <h1 className="text-center">My Appchat</h1>
        //         <Routes>
        //             <Route path="/" element={<Login />} />
        //             <Route path="/register" element={<Register />} />
        //         </Routes>
        //     </div>
        // </Router>
    );
}

export default App;
