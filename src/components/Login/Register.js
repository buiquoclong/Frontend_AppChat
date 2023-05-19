import React, {useState, useEffect} from 'react';
import {w3cwebsocket} from "websocket";
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';


const Register = () => {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');

    const handleRegister = () => {
        // Tạo một đối tượng websocket
        const ws = new w3cwebsocket('ws://140.238.54.136:8080/chat/chat');
        // Hàm sử lý sự kiện gửi yêu cầu đăng ký
        ws.onopen = () => {
            // Tạo dữ liệu yêu cầu đăng ký
            const requestData = {
                action: "onchat",
                data: {
                    event: "REGISTER",
                    data: {
                        user: user,
                        pass: pass,
                    },
                },
            };

            // Gửi yêu cầu đăng ký thông qua websocket
            ws.send(JSON.stringify(requestData));
        };

        // Đăng ký sự kiện nhận dữ liệu từ server websocket
        ws.onmessage = (event) => {
            // Xử lý dữ liệu nhận được từ server
            const responeData = JSON.parse(event.data);
            console.log(responeData); // In ra dữ liệu nhận được từ server
        };

        // Đóng kết nối Websocket khi conponent unmount
        return () => {
            ws.close();
        };
    };

    // Sử dụng hook useEffect để đóng kết nối Websocket khi component unmount
    useEffect(() =>{
        return handleRegister;
    },[]);

    // Hàm xử lý sự kiện submit form
    const handleSubmit = (event) => {
        event.preventDefault();
        // Gọi hàm handleRegister để thực hiện việc đăng ký thông qua Websocket
        handleRegister();
    }
    return (
        <div className="row">
            <div  className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={handleSubmit}>
                    <div className="card">
                        <div className="card-header">
                            <h2>Register</h2>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <label>Tên đăng nhập</label>
                                <input
                                    className="form-control"
                                    value={user}
                                    onChange={(e) => setUser(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Mật khẩu</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={pass}
                                    onChange={(e) => setPass(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">
                                Đăng ký
                            </button>
                            <Link to="/" className="btn btn-link">Trở lại</Link>

                        </div>
                    </div>
                </form>

            </div>

        </div>
    );
};

export default Register;
