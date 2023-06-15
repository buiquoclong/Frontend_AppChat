// import "../css/InputMess.css";
// import React, { useState } from "react";
//
// export default function InputMess({ handleSendMessage, groupName }) {
//     const [message, setMessage] = useState("");
//     const [file, setFile] = useState(null);
//
//     function handleChange(event) {
//         setMessage(event.target.value);
//     }
//
//     function handleFileChange(event) {
//         const selectedFile = event.target.files[0];
//         setFile(selectedFile);
//     }
//
//     function handleClick() {
//         if (message.trim() !== "") {
//             handleSendMessage(message.trim(), file);
//             setMessage("");
//             setFile(null);
//         }
//     }
//
//     return (
//         <div className="text-muted d-flex justify-content-start align-items-center pe-3 " style={{background: '#ffffff', height: "55px", borderTop: "1px solid #0573ff"}}>
//             <input
//                 autoComplete="off"
//                 type="text"
//                 className="form-control form-control-lg no-outline"
//                 id="messageInput"
//                 placeholder={`Nhập tin nhắn gửi đến ${groupName}`}
//                 value={message}
//                 onChange={handleChange}
//                 style={{ outline: '0', border: "none" }}
//                 onKeyDown={(event) => {
//                     if (event.key === "Enter") {
//                         handleClick();
//                     }
//                 }}
//             />
//             <label htmlFor="fileInput" className="ms-1 text-muted icon" style={{fontSize: "20px"}}>
//                 <i className="fas fa-paperclip "></i>
//             </label>
//             <input
//                 type="file"
//                 id="fileInput"
//                 style={{ display: "none"}}
//                 onChange={handleFileChange}
//             />
//             {file && (
//                 <span className="ms-2">{file.name}</span>
//             )}
//             <a className="ms-3 text-muted icon" href="#!" style={{fontSize: "20px"}}>
//                 <i className="fa-regular fa-face-laugh"></i>
//             </a>
//             <a className="ms-3 icon" onClick={handleClick} style={{fontWeight: "bold", fontSize: "17px"}}>
//                 GỬI
//             </a>
//         </div>
//     );
// }
//
//
//


//test1
// import React, { useState } from "react";
// import EmojiPicker, { EmojiStyle, Emoji } from "emoji-picker-react";
//
// export default function InputMess({ handleSendMessage, groupName }) {
//     const [message, setMessage] = useState("");
//     const [file, setFile] = useState(null);
//     const [isShowEmojiPicker, setIsShowEmojiPicker] = useState(false);
//     const [selectedEmojis, setSelectedEmojis] = useState([]);
//
//     function handleChange(event) {
//         setMessage(event.target.value);
//     }
//
//     function handleFileChange(event) {
//         const selectedFile = event.target.files[0];
//         setFile(selectedFile);
//     }
//
//     function handleClickEmojiPicker() {
//         setIsShowEmojiPicker(!isShowEmojiPicker);
//     }
//
//     function handleEmojiClick(emojiData) {
//         setSelectedEmojis([...selectedEmojis, emojiData.unified]);
//     }
//
//     function handleClickSend() {
//         if (message.trim() !== "") {
//             const emojiMessage = selectedEmojis.length > 0 ? JSON.stringify(selectedEmojis) : null;
//             handleSendMessage(message.trim(), file, emojiMessage);
//             setMessage("");
//             setFile(null);
//             setSelectedEmojis([]);
//             setIsShowEmojiPicker(false);
//         }
//     }
//
//     return (
//         <div className="text-muted d-flex justify-content-start align-items-center pe-3 " style={{background: '#ffffff', height: "55px", borderTop: "1px solid #0573ff"}}>
//             <input
//                 autoComplete="off"
//                 type="text"
//                 className="form-control form-control-lg no-outline"
//                 id="messageInput"
//                 placeholder={`Nhập tin nhắn gửi đến ${groupName}`}
//                 value={message}
//                 onChange={handleChange}
//                 style={{ outline: '0', border: "none" }}
//                 onKeyDown={(event) => {
//                     if (event.key === "Enter") {
//                         handleClickSend();
//                     }
//                 }}
//             />
//             <label htmlFor="fileInput" className="ms-1 text-muted icon" style={{fontSize: "20px"}}>
//                 <i className="fas fa-paperclip"></i>
//             </label>
//             <input
//                 type="file"
//                 id="fileInput"
//                 style={{ display: "none" }}
//                 onChange={handleFileChange}
//             />
//             {file && (
//                 <span className="ms-2">{file.name}</span>
//             )}
//             <a className="ms-3 text-muted icon" href="#!" style={{fontSize: "20px"}}>
//                 <i className="fa-regular fa-face-laugh" onClick={handleClickEmojiPicker}></i>
//             </a>
//             {isShowEmojiPicker && (
//                 <div className="emoji-picker" >
//                     <EmojiPicker
//                         onEmojiClick={handleEmojiClick}
//                         emojiStyle={EmojiStyle.APPLE}
//                         disableSearchBar
//                         disableSkinTonePicker
//                         native
//                         autoFocus
//                     />
//                 </div>
//             )}
//             <a className="ms-3 icon" onClick={handleClickSend} style={{fontWeight: "bold", fontSize: "17px"}}>
//                 GỬI
//             </a>
//         </div>
//     );
// }

import React, { useState } from "react";
import EmojiPicker, { EmojiStyle } from "emoji-picker-react";

export default function InputMess({ handleSendMessage, groupName }) {
    const [message, setMessage] = useState("");
    const [file, setFile] = useState(null);
    const [isShowEmojiPicker, setIsShowEmojiPicker] = useState(false);
    const [selectedEmoji, setSelectedEmoji] = useState(null);

    function handleChange(event) {
        setMessage(event.target.value);
    }

    function handleFileChange(event) {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    }

    function handleClickEmojiPicker() {
        setIsShowEmojiPicker(!isShowEmojiPicker);
    }

    function handleEmojiClick(emojiData) {
        setSelectedEmoji(emojiData.emoji);
        setMessage(message + emojiData.emoji);
    }

    function handleClickSend() {
        if (message.trim() !== "") {
            const emojiMessage = selectedEmoji ? JSON.stringify([selectedEmoji]) : null;
            handleSendMessage(message.trim(), file, emojiMessage);
            setMessage("");
            setFile(null);
            setSelectedEmoji(null);
            setIsShowEmojiPicker(false);
            console.log(emojiMessage);
        }
    }

    return (
        <div className="text-muted d-flex justify-content-start align-items-center pe-3 " style={{background: '#ffffff', height: "55px", borderTop: "1px solid #0573ff"}}>
            <input
                autoComplete="off"
                type="text"
                className="form-control form-control-lg no-outline"
                id="messageInput"
                placeholder={`Nhập tin nhắn gửi đến ${groupName}`}
                value={message}
                onChange={handleChange}
                style={{ outline: '0', border: "none" }}
                onKeyDown={(event) => {
                    if (event.key === "Enter") {
                        handleClickSend();
                    }
                }}
            />
            <label htmlFor="fileInput" className="ms-1 text-muted icon" style={{fontSize: "20px"}}>
                <i className="fas fa-paperclip"></i>
            </label>
            <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                onChange={handleFileChange}
            />
            {file && (
                <span className="ms-2">{file.name}</span>
            )}
            <a className="ms-3 text-muted icon" href="#!" style={{fontSize: "20px"}}>
                <i className="fa-regular fa-face-laugh" onClick={handleClickEmojiPicker}></i>
            </a>
            {isShowEmojiPicker && (
                <div className="emoji-picker" >
                    <EmojiPicker
                        onEmojiClick={handleEmojiClick}
                        emojiStyle={EmojiStyle.APPLE}
                        disableSearchBar
                        disableSkinTonePicker
                        native
                        autoFocus
                    />
                </div>
            )}
            <a className="ms-3 icon" onClick={handleClickSend} style={{fontWeight: "bold", fontSize: "17px"}}>
                GỬI
            </a>
        </div>
    );
}
