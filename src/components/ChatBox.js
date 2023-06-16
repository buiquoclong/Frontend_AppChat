import "../css/ChatBox.css";
import React, {useRef, useEffect} from "react";
import {formatDate} from "./Forrmat";


export default function ChatBox({chatMess, groupName, userType}) {
    const chatBoxRef = useRef(null);

    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [chatMess]);


    const handleClickLink = (event) => {
        event.preventDefault();
        const url = event.target.getAttribute("href");
        window.open(url, "_blank");
    };

    // Sắp xếp tin nhắn theo thời gian tăng dần
    if (!chatMess || !Array.isArray(chatMess)) {
        return null;
    }

    const sortedChatContent = chatMess.sort((a, b) => {
        const timeA = new Date(a.createAt).getTime();
        const timeB = new Date(b.createAt).getTime();
        return timeA - timeB;
    });

    return (
        <>
            <div className="group-header">
                <div className="header-content" style={{paddingLeft: "30px"}}>
                    {userType === 0 ? (
                        <img
                            src="https://png.pngtree.com/png-clipart/20190921/original/pngtree-user-avatar-boy-png-image_4693645.jpg"
                            alt="Group Avatar"
                            className="group-avatar"
                            style={{borderRadius: "50%"}}
                        />
                    ) : (
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuUmw3aSVt9u_Bw-kMMa2t4bv_E-YRFqZ9vg&usqp=CAU"
                            alt="Group Avatar"
                            className="group-avatar"
                            style={{borderRadius: "50%"}}
                        />
                    )}

                    <h2 className="group-name">{groupName}</h2>
                </div>
                <div className="icons-container">
                    <i className="fas fa-magnifying-glass"></i>
                    <i className="fa-solid fa-phone"></i>
                    <i className="fa-solid fa-video"></i>
                </div>
            </div>

            <div style={{
                width: "100%",
                height: "calc(100vh - 125px)",
                overflowY: "scroll",
                scrollBehavior: "smooth",
                scrollPaddingRight: "20px",
                background: "#ffffff",
                paddingBottom: "20px",
                marginBottom: "20px",
            }} className="setfont" ref={chatBoxRef}>
                <ul style={{listStyleType: "none", paddingLeft: "20px"}}>
                    {sortedChatContent.map((mess, index) => (
                        <div key={index}>
                            {mess.name === sessionStorage.getItem("username") ? (
                                <li style={{
                                    width: "520px",
                                    float: "right",
                                    textAlign: "right",
                                    marginLeft: "auto",
                                    marginRight: "0",
                                    paddingRight: "20px",
                                    marginBottom: "20px",
                                    display: "flex",
                                    justifyContent: "flex-end",
                                }} className="d-flex mb-4 ml-300">
                                    <div className="" style={{marginLeft: "auto"}}>
                                        <div className="card-header d-flex justify-content-end"
                                             style={{padding: "0px"}}>
                                            <p className="fw-bold name mb-0">{mess.name} </p>
                                            <p className="text-muted mb-0 time">
                                                - {formatDate(mess.createAt)}
                                            </p>
                                        </div>
                                        <div className="card-body btn-info" style={{
                                            width: "100%",
                                            maxWidth: "520px",
                                            padding: "4px",
                                            borderRadius: "3px",
                                            background: "#0084ff",
                                        }}>
                                            <p className="mb-0" style={{paddingRight: "5px", wordWrap: "break-word"}}>
                                                {mess.mes.includes("http") ? (
                                                    <a href={mess.mes} target="_blank" rel="noopener noreferrer"
                                                       onClick={handleClickLink} style={{color: "#ffffff"}}>
                                                        {mess.mes}
                                                    </a>
                                                ) : (
                                                    <>
                                                        {mess.mes}
                                                    </>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            ) : (
                                <li
                                    style={{width: "520px", float: "left", paddingRight: "20px", marginBottom: "20px",}}
                                    className="d-flex mb-4">
                                    <img
                                        src="https://png.pngtree.com/png-clipart/20190921/original/pngtree-user-avatar-boy-png-image_4693645.jpg"
                                        alt="avatar"
                                        className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                                        width="40"
                                    />
                                    <div className="">
                                        <div className="card-header d-flex justify-content-between"
                                             style={{padding: "0px"}}>
                                            <div className="d-flex align-items-center">
                                                <p className="fw-bold mb-0 name">{mess.name}</p>
                                                <p className="text-muted mb-0 time ms-2">
                                                    - {formatDate(mess.createAt)}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="card" style={{
                                            width: "100%",
                                            maxWidth: "520px",
                                            padding: "4px",
                                            borderRadius: "3px",
                                            background: "#e4e6eb",
                                        }}>
                                            <p className="mb-0 w-100" style={{
                                                paddingLeft: "10px",
                                                paddingRight: "10px",
                                                wordWrap: "break-word"
                                            }}>
                                                {mess.mes.includes("http") ? (
                                                    <a href={mess.mes} target="_blank" rel="noopener noreferrer"
                                                       onClick={handleClickLink}>
                                                        {mess.mes}
                                                    </a>
                                                ) : (
                                                    mess.mes
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            )}

                        </div>
                    ))}
                </ul>
            </div>
        </>
    );
}
