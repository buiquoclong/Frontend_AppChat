import React, {useState, useEffect} from "react";
import {createBrowserHistory} from 'history';
import {useHistory} from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [socket, setSocket] = useState(null);
    const [usernameTouched, setUsernameTouched] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);
    const [notification, setNotification] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [userList, setUserList] = useState([]);

    // const history = createBrowserHistory();
    const history = useHistory();

    // Khi component được tạo, thiết lập kết nối WebSocket
    useEffect(() => {
        const newSocket = new WebSocket("ws://140.238.54.136:8080/chat/chat");

        newSocket.addEventListener("open", (event) => {
            console.log("Kết nối WebSocket đã được thiết lập", event);
            setSocket(newSocket);
        });

        return () => {
            // Đóng kết nối WebSocket khi component bị hủy
            newSocket.close();
        };
    }, []);

    const handleLogin = () => {

        const login = {
            action: 'onchat',
            data: {
                event: 'LOGIN',
                data: {
                    user: username,
                    pass: password,
                },
            },
        };
        socket.send(JSON.stringify(login));
        console.log("Đã gửi thông tin login cho server")


        socket.onmessage = (event) => {
            const response = JSON.parse(event.data);
            if (response.event === 'LOGIN') {
                if (response.status === 'success') {
                    sessionStorage.setItem('re_login_code', response.data["RE_LOGIN_CODE"]);
                    setLoginSuccess(true);
                    setNotification('Đăng nhập thành công!');
                    window.location.href = '/homepage'
                } else {
                    setNotification('Đăng nhập không thành công. Vui lòng kiểm tra lại tài khoản hoặc mật khẩu!');
                }
            }
            if (response.status === 'success' && response.event === 'GET_USER_LIST') {
                const users = response.data;
                setUserList(users);
                history.push('/homepage', {userList: users, setUserList: setUserList});


            }

        }


    }

    // Sau khi đăng nhập thành công, set socket và lưu trữ thông tin đăng nhập
    useEffect(() => {
        if (loginSuccess) {
            // Lưu trữ thông tin đăng nhập vào localStorage
            sessionStorage.setItem('username', username);
            sessionStorage.setItem('password', password);
        }

        if (socket) {
            socket.onmessage = (event) => {
                const responseData = JSON.parse(event.data);
                const response = JSON.parse(event.data);
                if (response.status === 'success' && response.event === 'GET_USER_LIST') {
                    const users = response.data;
                    setUserList(users);
                    console.log("Đã lưu vào users", users);
                }
                if (responseData && responseData.status === "success") {
                    // Đăng nhập thành công
                    // setIsLoginSuccess(true);
                    // Lưu trữ thông tin đăng nhập, ví dụ: lưu trữ token
                    sessionStorage.setItem('re_login_code', responseData.data["RE_LOGIN_CODE"]);
                }
            };
        }
    }, [socket, loginSuccess, username, password]);

    const handleSubmit = (event) => {
        event.preventDefault();
        handleLogin();
    };
    const handleUserBlur = () => {
        setUsernameTouched(true);
    };


    const handlePassBlur = () => {
        setPasswordTouched(true);
    };
    return (
        <div className="row">
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={handleSubmit}>
                    <div className="card">
                        <div className="card-header">
                            <h2>Đăng nhập</h2>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label>Tên đăng nhập</label>
                                <input
                                    className="form-control"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    onBlur={handleUserBlur}
                                />
                                {usernameTouched && username.trim() === '' && (
                                    <p className="text-danger">Vui lòng nhập tên đăng nhập</p>
                                )}
                            </div>
                            <div className="form-group">
                                <label>Mật khẩu</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onBlur={handlePassBlur}
                                />
                                {passwordTouched && password.trim() === '' && (
                                    <p className="text-danger">Vui lòng nhập mật khẩu</p>
                                )}
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">
                                Đăng nhập
                            </button>
                            <a href="/register" className="btn btn-link">Đăng ký</a>
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

export default Login;
