import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import "../css/Login.css"

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [socket, setSocket] = useState(null);
    const [usernameTouched, setUsernameTouched] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);
    const [notification, setNotification] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false);

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
                    window.location.href = '/homepage'
                } else {
                    setNotification('Đăng nhập không thành công. Vui lòng kiểm tra lại tài khoản hoặc mật khẩu!');
                }
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
                const response = JSON.parse(event.data);
                if (response && response.status === "success") {
                    // Đăng nhập thành công
                    // Lưu trữ re_login_code
                    sessionStorage.setItem('re_login_code', response.data["RE_LOGIN_CODE"]);
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

        <div className="center-content" style={{display:"flex", justifyContent: "center", alignItems:"center",height: "100vh", background: "#f0f2f5" }}>

                <div className="login-container">
                    <form className="container" onSubmit={handleSubmit}>
                    <div className="login-content row">
                        <div className="col-12 text-center login-title">Đăng nhập</div>
                        <div className="col-12 form-group magrin-input">
                            <label>Tài khoản: </label>
                            <input
                                value={username}
                                type="text"
                                className="login-input "
                                placeholder="Tên đăng nhập"
                                onChange={(e) => setUsername(e.target.value)}
                                onBlur={handleUserBlur}
                            />
                        </div>
                        {usernameTouched && username.trim() === '' && (
                            <p className="text-danger noti">Vui lòng nhập tên đăng nhập</p>
                        )}
                        <div className="col-12 form-group magrin-input " >
                            <label>Mật khẩu: </label>
                            <input
                                value={password}
                                type="password"
                                className="login-input "
                                placeholder="Mật khẩu"
                                onChange={(e) => setPassword(e.target.value)}
                                onBlur={handlePassBlur}
                            />
                        </div>

                        {passwordTouched && password.trim() === '' && (
                            <p className="text-danger noti">Vui lòng nhập mật khẩu</p>
                        )}
                        <div className="col-12" style={{paddingTop: "20px"}}>
                            <button onClick={() => handleLogin()} className="btn-login btlogin" >
                                Đăng nhập
                            </button>
                        </div>
                        <div className="col-12 register">
                            <p>Bạn chưa có tài khoản? <a href="/register" className="">Đăng ký ngay!</a></p>
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
