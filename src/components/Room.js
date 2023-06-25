import "../css/Room.css"
import React, {useState, useEffect} from "react";

export default function Room({handleJoinRoom, handleCreateRoom, handleSearchRoom }) {
    const [roomName, setRoomName] = useState('');

    function handleChange(event) {
        setRoomName(event.target.value); // Cập nhật giá trị từ thẻ input vào state
    }

    function SearchRoomClick() {
        if (roomName !== "") {
            handleSearchRoom(roomName); // Truyền giá trị message vào hàm handleSendMessage
            setRoomName('');
        }

    }
    function CreateRoomClick() {
        if (roomName !== "") {
            handleCreateRoom(roomName);
            setRoomName('');
        }

    }

    function JoinRoomClick() {
        if (roomName !== "") {
            handleJoinRoom(roomName); // Truyền giá trị message vào hàm handleSendMessage
            setRoomName('');
        }
    }

    return (
        <div className='row gy-2 gx-3 align-items-center room'>
            <div className='col'>
                <input
                    id='roomName'
                    className='form-control'
                    type='text'
                    placeholder='Nhập tên phòng...'
                    value={roomName}
                    onChange={handleChange}
                    style={{width: "100%"}}
                />
            </div>
            <div className='col-auto'>
                <i className="fa-solid fa-magnifying-glass search" onClick={SearchRoomClick}></i>
                <i className="fa fa-users-line join" onClick={JoinRoomClick}></i>
                <i className='fas fa-plus-square create' onClick={CreateRoomClick}/>
            </div>
        </div>
    );
}