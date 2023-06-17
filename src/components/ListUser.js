import React, {useState, useEffect} from "react";
import '../css/UserList.css';
import {formatDate} from "./Forrmat"

export default function ListUser({listUser, handleUserClick, selectedUser, searchQuery}) {
    const [showChat, setShowChat] = useState(false); // State để hiển thị/ẩn Chatbox và Input
    const [filteredUserList, setFilteredUserList] = useState([]);

    useEffect(() => {
        if (searchQuery !== undefined && searchQuery !== "") {
            const filteredList = listUser.filter(
                (user) =>
                    user.name !== undefined &&
                    user.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredUserList(filteredList);
        } else {
            setFilteredUserList(listUser);
        }
    }, [listUser, searchQuery]);
    function handleUserItemClick(userName, userType) {
        handleUserClick(userName, userType); // Gọi hàm handleUserClick từ props để xử lý người dùng được chọn
        setShowChat(true); // Hiển thị Chatbox và Input khi người dùng được chọn
    }

    return (
        <div className="card">
            <div className="card-body" style={{ padding: "0px" }}>
                <ul className="list-unstyled mb-0" style={{ height: "630px", overflowY: "scroll" }}>
                    {filteredUserList.map((user, index) => (
                        <li
                            key={index}
                            className={`p-2 border-bottom ${
                                user.name === selectedUser ? "selected-user" : ""
                            }`}
                            onClick={() => handleUserItemClick(user.name, user.type)}
                            style={{ cursor: "pointer" }}
                        >
                            <a className="d-flex justify-content-between">
                                <div className="d-flex flex-row">
                                    {user.type === 0 ? (
                                        <img
                                            src="https://png.pngtree.com/png-clipart/20190921/original/pngtree-user-avatar-boy-png-image_4693645.jpg"
                                            alt="avatar"
                                            className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                                            width="60"
                                        />
                                    ) : (
                                        <img
                                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuUmw3aSVt9u_Bw-kMMa2t4bv_E-YRFqZ9vg&usqp=CAU"
                                            alt="avatar"
                                            className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                                            width="60"
                                        />
                                    )}
                                    <div className="pt-1">
                                        <p className="fw-bold mb-0">{user.name}</p>
                                        <p className="small text-muted"></p>
                                    </div>
                                </div>
                                <div className="pt-1">
                                    <p className="small text-muted mb-1" key={index}>
                                        {" "}
                                        {formatDate(user.actionTime)}
                                    </p>
                                </div>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
