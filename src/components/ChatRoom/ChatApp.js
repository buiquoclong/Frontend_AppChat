import React, { useState } from 'react';
import './ChatApp.css';
import { createBrowserHistory } from 'history';
// import UserList from "../UserList/UserList";
// import ChatBox from "../ChatBox/ChatBox";


const ChatApp = () => {
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const rooms = [
        { id: 1, name: 'Room 1' },
        { id: 2, name: 'Room 2' },
        { id: 3, name: 'Room 3' },
    ];
    const history = createBrowserHistory();
    const handleLogout = () => {
        // Gửi yêu cầu đến server websocket
        const requestData = {
            action: "onchat",
            data: {
                event: "LOGOUT",
            },
        };
        history.push('/');
    };

    const handleRoomClick = (room) => {
        setSelectedRoom(room);
        setMessages([]); // Reset messages when selecting a new room
    };

    const handleInputChange = (event) => {
        setCurrentMessage(event.target.value);
    };

    const handleSendMessage = () => {
        if (currentMessage.trim() !== '') {
            const newMessage = {
                text: currentMessage,
                timestamp: new Date().getTime(),
            };

            setMessages([...messages, newMessage]);
            setCurrentMessage('');
        }
    };

    return (
        <div className="chat-container">
            <button type="submit" className="btn btn-primary" onClick={handleLogout}>
                Đăng xuất
            </button>
            <div className="room-list">
                {rooms.map((room) => (
                    <div
                        key={room.id}
                        className={`room ${selectedRoom === room ? 'active' : ''}`}
                        onClick={() => handleRoomClick(room)}
                    >
                        {room.name}
                    </div>
                ))}
            </div>
            <div className="chat-panel">
                <div className="chat-header">
                    {selectedRoom ? <h2>{selectedRoom.name}</h2> : <h2>Select a room</h2>}
                </div>
                <div className="chat-messages">
                    {messages.map((message, index) => (
                        <div key={index} className="message">
                            <span className="timestamp">{message.timestamp}</span>
                            <span className="text">{message.text}</span>
                        </div>
                    ))}
                </div>
                <div className="chat-input">
                    <input
                        type="text"
                        value={currentMessage}
                        onChange={handleInputChange}
                        placeholder="Type your message..."
                    />
                    <button onClick={handleSendMessage}>Send</button>
                </div>

            </div>
        </div>
    );
};

export default ChatApp;
