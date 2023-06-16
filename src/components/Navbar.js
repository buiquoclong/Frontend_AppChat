import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import "../css/Navbar.css";

export default function Navbar(props) {
    const history = useHistory();
    const {error} = props;
    const handleLogout = () => {
        //Gửi yêu cầu đăng ký đến server WebSocket
        const requestData = {
            action: "onchat",
            data: {
                event: "LOGOUT",
            },
        };
        history.push("/");
    };
    useEffect(() => {

        localStorage.removeItem('username');
        localStorage.removeItem('password');

    }, []);

    return (
        <>
            <nav className='navbar navbar-expand-lg navbar-light'
                 style={{width: "78px", height: '100vh', backgroundColor: "#0573ff"}}>
                <div className="container-fluid" style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                    <div className='d-flex flex-column flex-grow-1'>
                        <a className='navbar-brand' href='#' style={{margin: "0 auto"}}>
                            <img
                                src='https://cdn-icons-png.flaticon.com/512/3607/3607444.png'
                                height='50'
                                alt=''
                                loading='lazy'
                                style={{borderRadius: '50%', border: "2px solid #ffffff"}}
                            />
                        </a>
                        <div className={` navbar-collapse flex-column`} style={{textAlign: "center"}}>
                            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                                <li className='nav-item'>
                                    <a className='nav-link' href='#' style={{color: "#ffffff"}}>
                                        {sessionStorage.getItem('username')}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='mt-auto'>
                        <form className='d-flex'>
                            <button className=''
                                    style={{backgroundColor: '#0573ff', border: "none", paddingBottom: "20px"}}>
                                <i className="fa-solid fa-right-from-bracket fa-rotate-180" onClick={handleLogout}
                                   style={{color: '#ffffff', fontSize: "30px", border: "none"}}></i>
                            </button>
                        </form>
                    </div>
                </div>
            </nav>


        </>
    );
}