import { useEffect, useState } from "react";

export const ChatView = (props: any) => {
    const socket = props.socket;
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messageReceived, setMessageReceived] = useState('');
    
    const sendMessage = () => {
      socket.emit('sendMessage', {message, room});
      console.log(socket);
    }

    socket.on('userLeft', (data: any) => {
        console.log(data);
    });
    
    socket.on('joinToRoom', (data: any) => {
        setRoom(data);
        socket.emit('joinRoom', data);
    });
    
    useEffect(() => {
        socket.on('receiveMessage', (message: any) => {
          setMessageReceived(message);
          console.log(message);
        });
    }, [socket]);

    return (
        <div></div>
    );
}