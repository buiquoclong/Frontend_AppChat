import React, { useState, useEffect } from 'react';
import { w3cwebsocket } from 'websocket';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

const Login = () => {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [userTouched, setUserTouched] = useState(false);
    const [passTouched, setPassTouched] = useState(false);
    const [loginError, setLoginError] = useState(false);

    const handleLogin = () => {
        if (user.trim() === '' || pass.trim() === '') {
            return;
        }

        const ws = new w3cwebsocket('ws://140.238.54.136:8080/chat/chat');
        ws.onopen = () => {
            const requestData = {
                action: 'onchat',
                data: {
                    event: 'LOGIN',
                    data: {
                        user: user,
                        pass: pass,
                    },
                },
            };

            ws.send(JSON.stringify(requestData));
        };
        ws.onmessage = (event) => {
            const responseData = JSON.parse(event.data);
            console.log(responseData);

            if (responseData.event === 'LOGIN' && responseData.status === 'success') {
                setLoginSuccess(true);
                setLoginError(false);
            } else {
                setLoginSuccess(false);
                setLoginError(true);
            }
        };


        return () => {
            ws.close();
        };
    };

    useEffect(() => {
        return handleLogin;
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        handleLogin();
    };

    const handleUserBlur = () => {
        setUserTouched(true);
    };

    const handlePassBlur = () => {
        setPassTouched(true);
    };

    return (
        <div className="row">
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={handleSubmit}>
                    <div className="card">
                        <div className="card-header">
                            <h2>Login</h2>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label>Tên đăng nhập</label>
                                <input
                                    className="form-control"
                                    value={user}
                                    onChange={(e) => setUser(e.target.value)}
                                    onBlur={handleUserBlur}
                                />
                                {userTouched && user.trim() === '' && (
                                    <p className="text-danger">Vui lòng nhập tên đăng nhập</p>
                                )}
                            </div>
                            <div className="form-group">
                                <label>Mật khẩu</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={pass}
                                    onChange={(e) => setPass(e.target.value)}
                                    onBlur={handlePassBlur}
                                />
                                {passTouched && pass.trim() === '' && (
                                    <p className="text-danger">Vui lòng nhập mật khẩu</p>
                                )}
                            </div>
                            {loginError && (
                                <p className="text-danger">Đăng nhập không thành công. Vui lòng kiểm tra lại tài khoản và mật khẩu.</p>
                            )}
                            {loginSuccess && (
                                <p className="text-success">Đăng nhập thành công!</p>
                            )}
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">
                                Đăng nhập
                            </button>
                            <Link to="/register" className="btn btn-link">
                                Đăng ký
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
