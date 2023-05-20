import React, { useState, useEffect } from 'react';
import { w3cwebsocket } from 'websocket';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

const Register = () => {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [notification, setNotification] = useState('');
    const [userTouched, setUserTouched] = useState(false);
    const [passTouched, setPassTouched] = useState(false);

    const handleRegister = () => {
        if (user.trim() === '' || pass.trim() === '') {
            return;
        }
        const ws = new w3cwebsocket('ws://140.238.54.136:8080/chat/chat');

        ws.onopen = () => {
            const requestData = {
                action: 'onchat',
                data: {
                    event: 'REGISTER',
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

            if (responseData.status === 'success') {
                setNotification('Đăng ký thành công!');
            } else if (responseData.status === 'error') {
                setNotification('Tài khoản đã tồn tại!');
            }
        };

        return () => {
            ws.close();
        };
    };

    useEffect(() => {
        if (notification !== '') {
            const timer = setTimeout(() => {
                setNotification('');
            }, 3000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [notification]);

    const handleSubmit = (event) => {
        event.preventDefault();
        handleRegister();
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
                            <h2>Đăng ký</h2>
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
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">
                                Đăng ký
                            </button>
                            <Link to="/" className="btn btn-link">
                                Trở lại
                            </Link>
                        </div>
                    </div>
                </form>
                {notification && (
                    <div className="alert alert-info mt-3">{notification}</div>
                )}
            </div>
        </div>
    );
};

export default Register;
