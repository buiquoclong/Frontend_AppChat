import React, { useEffect } from 'react';
import { client } from 'websocket';

const connectWebSocket = () => {
    const connection  = new WebSocket.client();

    connection .on('connectFailed', (error) => {
        console.error('Kết nối không thành công: ', error);
    });

    connection .on('connect', (connection) => {
        console.log('Kết nối thành công!');

        connection.on('error', (error) => {
            console.error('Lỗi kết nối: ', error);
        });

        connection.on('message', (message) => {
            console.log('Nhận tin nhắn mới: ', message);
            // Xử lý tin nhắn nhận được tại đây
        });
    });

    connection .connect('ws://140.238.54.136:8080/chat/chat');
};

export default connectWebSocket;
