import React, {useState, useEffect} from "react";
import {useHistory} from 'react-router-dom';

import UserList from "../components/UserList";
import ChatBox from "../components/ChatBox";
import Navbar from "../components/Navbar";
import InputMess from "../components/InputMess";
import Room from "../components/Room";
import "../css/Homepage.css"

export default function Homepage() {
    const [socket, setSocket] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userType, setUserType] = useState(null);
    const [typeSend, setTypeSend] = useState(null);
    const [userList, setUserList] = useState([]);
    const [chatMess, setChatMess] = useState([]);
    const [error, setError] = useState([]);
    const [groupName, setGroupName] = useState("");
    const [showChat, setShowChat] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isChatVisible, setIsChatVisible] = useState(true);
    const history = useHistory();


    function handleSendMessage(message) {
        let messEncode = encodeURI(message);
        let  mes = messEncode.replace(/%20/g," ");
        const chatData = {
            action: 'onchat',
            data: {
                event: 'SEND_CHAT',
                data: {
                    type: typeSend, // Loại tin nhắn (data.chatData.type)
                    to: selectedUser, // get room chat mess (data.chatData.name)
                    mes: mes, // Nội dung tin nhắn từ người dùng nhập vào
                }
            },
        };
        socket.send(JSON.stringify(chatData));
        console.log("Đã gửi tin nhắn lên cho server");
        if (userType == 1) {
            const requestRoomChatMessage = {
                action: "onchat",
                data: {
                    event: "GET_ROOM_CHAT_MES",
                    data: {
                        name: selectedUser,
                        page: 1,
                    },
                },
            };
            socket.send(JSON.stringify(requestRoomChatMessage));
        } else {
            const requestRoomChatMessage = {
                action: "onchat",
                data: {
                    event: "GET_PEOPLE_CHAT_MES",
                    data: {
                        name: selectedUser,
                        page: 1,
                    },
                },
            };
            socket.send(JSON.stringify(requestRoomChatMessage));
        }
    }

    function handleUserClick(userName, type) {
        setSelectedUser(userName);
        setGroupName(userName);
        setUserType(type);
        setShowChat(true);
        setIsChatVisible(true);
        console.log(type)
        console.log(userName);
        if (type == 1) {
            setTypeSend("room");
            console.log("đã biết type = 1 và user là " + userName)
            const requestRoomChatMess = {
                action: "onchat",
                data: {
                    event: "GET_ROOM_CHAT_MES",
                    data: {
                        name: userName,
                        page: 1
                    },
                },
            };
            socket.send(JSON.stringify(requestRoomChatMess));
            console.log("Đã gửi yêu cầu get room chat mes");
        } else {
            setTypeSend("people");
            console.log("đã biết type = 1 và user là " + userName)
            const requestRoomChatMess = {
                action: "onchat",
                data: {
                    event: "GET_PEOPLE_CHAT_MES",
                    data: {
                        name: userName,
                        page: 1
                    },
                },
            };
            socket.send(JSON.stringify(requestRoomChatMess));
            console.log("Đã gửi yêu cầu get people chat mes");
        }
    }

    function handleCreateRoom(roomName) {
        const requestcreateRoom = {
            action: "onchat",
            data: {
                event: "CREATE_ROOM",
                data: {
                    name: roomName,
                },
            },
        };
        socket.send(JSON.stringify(requestcreateRoom));
        console.log("Đã gửi yêu cầu ");
        const userList = {
            action: 'onchat',
            data: {
                event: 'GET_USER_LIST',
            },
        };
        socket.send(JSON.stringify(userList));
    }

    function handleJoinRoom(roomName) {
        const joinRequest = {
            action: "onchat",
            data: {
                event: "JOIN_ROOM",
                data: {
                    name: roomName,
                },
            },
        };

        socket.send(JSON.stringify(joinRequest));
        console.log("Đã gửi yêu cầu ");
        const userList = {
            action: 'onchat',
            data: {
                event: 'GET_USER_LIST',
            },
        };
        socket.send(JSON.stringify(userList));
    }

    useEffect(() => {
        // Kiểm tra xem người dùng đã đăng nhập hay chưa
        const isLoggedIn = sessionStorage.getItem('username');
        if (!isLoggedIn) {
            // Chuyển hướng về "/"
            history.push('/');
        }

        // Khởi tạo kết nối với server qua websocket
        const socket = new WebSocket("ws://140.238.54.136:8080/chat/chat");
        socket.addEventListener("open", () => {
            console.log("WebSocket connection established.");
            // Gửi message RE_LOGIN để đăng nhập lại với thông tin user và code
            socket.send(JSON.stringify({
                    action: "onchat",
                    data: {
                        event: "RE_LOGIN",
                        data: {
                            user: sessionStorage.getItem('username'),
                            code: sessionStorage.getItem('re_login_code')
                        }
                    }
                }
            ))
            ;
            socket.send(JSON.stringify({
                    action: 'onchat',
                    data: {
                        event: 'GET_USER_LIST',
                    },
                }
            ))
            ;
            socket.onmessage = (event) => {
                const response = JSON.parse(event.data);
                if (response.status === 'success' && response.event === 'RE_LOGIN') {
                    sessionStorage.setItem('re_login_code', response.data["RE_LOGIN_CODE"])
                    console.log("re_login: " + response.data["RE_LOGIN_CODE"])
                }
                if (response.status === 'success' && response.event === 'GET_ROOM_CHAT_MES') {
                    const chatMess = response.data.chatData;
                    setChatMess(chatMess);
                    console.log(chatMess);
                }
                if (response.status === 'success' && response.event === 'GET_PEOPLE_CHAT_MES') {
                    const chatMess = response.data;
                    setChatMess(chatMess);
                    console.log(chatMess)
                }
                if (response.status === 'success' && response.event === 'SEND_CHAT') {
                    const receivedMessage = response.data;
                    setChatMess((prevChatMess) => [...prevChatMess, receivedMessage]);
                }
                if (response.status === 'success' && response.event === 'CREATE_ROOM') {
                    const receivedRoomName = response.data;
                }
                if (response.status === 'error' && response.event === 'CREATE_ROOM') {
                    alert(response.mes)
                }
                if (response.status === 'success' && response.event === 'GET_USER_LIST') {
                    const users = response.data;
                    setUserList(users);
                }
                if (response.status === 'success' && response.event === 'JOIN_ROOM') {
                    const receivedRoomName = response.data;
                }
            }

            setSocket(socket);
        });
        // Đóng kết nối khi component unmount
        return () => {
            socket.close();
        };
    }, []);


    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleGoBack = () => {
        setIsChatVisible(false);
    };
    return (
        <>
            <div className="homepage-container">
                {isMobile ? (
                    <>
                        <Navbar/>
                        {isChatVisible ? (

                            showChat ? (
                                <div className="chat-container" style={{background: "#ffffff"}}>
                                    <i className="fa-solid fa-chevron-left"
                                       style={{position: "absolute", padding: "15px 20px", cursor: "pointer"}}
                                       onClick={handleGoBack}></i>
                                    <ChatBox
                                        chatMess={chatMess}
                                        groupName={groupName}
                                        userType={userType}
                                    />
                                    <InputMess
                                        handleSendMessage={handleSendMessage}
                                        groupName={groupName}
                                    />
                                </div>
                            ) : (
                                <div className="homepage-content">
                                    <div className="userlist-container" style={{width: "100%"}}>
                                        <div className="card-body create_room" style={{paddingBottom: "10px"}}>
                                            <Room
                                                handleCreateRoom={handleCreateRoom}
                                                handleJoinRoom={handleJoinRoom}
                                            />
                                        </div>
                                        <UserList
                                            userList={userList}
                                            handleUserClick={handleUserClick}
                                            selectedUser={selectedUser}
                                        />
                                    </div>
                                </div>
                            )
                        ) : (
                            <div className="homepage-content">
                                <div className="userlist-container" style={{width: "100%"}}>
                                    <div className="card-body create_room" style={{paddingBottom: "10px"}}>
                                        <Room
                                            handleCreateRoom={handleCreateRoom}
                                            handleJoinRoom={handleJoinRoom}
                                        />
                                    </div>
                                    <UserList
                                        userList={userList}
                                        handleUserClick={handleUserClick}
                                        selectedUser={selectedUser}
                                    />
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <Navbar/>
                        <div className="homepage-content">
                            <div className="userlist-container">
                                <div className="card-body create_room" style={{paddingBottom: "10px"}}>
                                    <Room
                                        handleCreateRoom={handleCreateRoom}
                                        handleJoinRoom={handleJoinRoom}
                                    />
                                </div>
                                <UserList
                                    userList={userList}
                                    handleUserClick={handleUserClick}
                                    selectedUser={selectedUser}
                                />
                            </div>
                            {showChat ? (
                                <div className="chat-container" style={{background: "#ffffff"}}>

                                    <ChatBox
                                        chatMess={chatMess}
                                        groupName={groupName}
                                        userType={userType}
                                    />
                                    <InputMess
                                        handleSendMessage={handleSendMessage}
                                        groupName={groupName}
                                    />
                                </div>
                            ) : (
                                <div className="nothing_chat">
                                    <h1>Chào mừng đến với MY APPCHAT</h1>
                                    <p>Đây là một ứng dụng nhắn tin sử dụng Reactjs</p>
                                    <img
                                        className="img_nothing_chat"
                                        src="https://cdn.memiah.co.uk/blog/wp-content/uploads/counselling-directory.org.uk/2019/04/shutterstock_1464234134-1024x684.jpg"
                                        alt=""
                                    />
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
}