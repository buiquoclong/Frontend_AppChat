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
                                Đăng ký
                            </button>
                            <a href="/" className="btn btn-link">
                                Trở lại
                            </a>
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