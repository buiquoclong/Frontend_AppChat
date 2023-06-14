import "../css/InputMess.css";
import React, { useState } from "react";

export default function InputMess({ handleSendMessage, groupName }) {
    const [message, setMessage] = useState("");
    const [file, setFile] = useState(null);

    function handleChange(event) {
        setMessage(event.target.value);
    }

    function handleFileChange(event) {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    }

    function handleClick() {
        if (message.trim() !== "") {
            handleSendMessage(message.trim(), file);
            setMessage("");
            setFile(null);
        }
    }

    return (
        <div className="text-muted d-flex justify-content-start align-items-center pe-3 " style={{background: '#ffffff', height: "55px"}}>
            <input
                autoComplete="off"
                type="text"
                className="form-control form-control-lg no-outline"
                id="messageInput"
                placeholder={`Nhập tin nhắn gửi đến ${groupName}`}
                value={message}
                onChange={handleChange}
                style={{ outline: 'none', border: "none" }}
                onKeyDown={(event) => {
                    if (event.key === "Enter") {
                        handleClick();
                    }
                }}
            />
            <label htmlFor="fileInput" className="ms-1 text-muted icon">
                <i className="fas fa-paperclip "></i>
            </label>
            <input
                type="file"
                id="fileInput"
                style={{ display: "none"}}
                onChange={handleFileChange}
            />
            {file && (
                <span className="ms-2">{file.name}</span>
            )}
            <a className="ms-3 text-muted icon" href="#!">
                <i className="fas fa-smile "></i>
            </a>
            <a className="ms-3 icon" onClick={handleClick}>
                <i className="fas fa-paper-plane "></i>
            </a>
        </div>
    );
}



