import React, { useState } from 'react';
import UserList from './UserList';

const ChatBox = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSendMessage = () => {
        if (message.trim() !== '') {
            setMessages([...messages, message]);
            setMessage('');
        }
    };

    return (
        <div>
            <h2>Chat Box</h2>
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div key={index} className="message">
                        {msg}
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={message}
                    onChange={handleMessageChange}
                    placeholder="Type a message..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
            <UserList />
        </div>
    );
};

export default ChatBox;
