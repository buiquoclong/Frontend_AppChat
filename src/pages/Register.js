import React, {useState, useEffect} from "react";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [socket, setSocket] = useState(null);
    const [usernameTouched, setUsernameTouched] = useState(false);
    const [passwordTouched, setPasswordTouched] = useState(false);
    const [notification, setNotification] = useState('');
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

    const handleRegister = () => {
        // Gửi yêu cầu đăng nhập đến server WebSocket
        const register = {
            action: "onchat",
            data: {
                event: "REGISTER",
                data: {
                    user: username,
                    pass: password,
                },
            },
        };
        socket.send(JSON.stringify(register));
    };

    // Sau khi đăng nhập thành công, set socket và lưu trữ thông tin đăng nhập
    useEffect(() => {
        if (socket) {
            socket.onmessage = (event) => {
                const responseData = JSON.parse(event.data);
                if (responseData && responseData.status === "success") {
                    // Đăng kí thành công
                    setNotification('Đăng ký thành công!');
                } else {
                    setNotification('Tài khoản đã tồn tại!');
                }
            };
        }
    }, [socket]);

    const handleSubmit = (event) => {
        event.preventDefault();
        handleRegister();
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
                        <div className="col-12 text-center login-title">Đăng ký</div>
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
                            <button className="btn-login btlogin" >
                                Đăng ký
                            </button>
                        </div>
                        <div className="col-12 register">
                            <p>Bạn đã có tài khoản? <a href="/" className="">Đăng nhập!</a></p>
                        </div>
                    </div>
                </form>
                {notification && (
                    <div className="alert alert-info mt-3">{notification}</div>
                )}
            </div>



        </div>
    );
}
export default Register;