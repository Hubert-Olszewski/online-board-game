import React, { useEffect, useState } from 'react';
import './App.css';
import io from "socket.io-client";

const socket = io("http://localhost:3001");

const App = () => {
  const [message, setMessage] = useState('');
  const [messageReceived, setMessageReceived] = useState('');
  const [room, setRoom] = useState('');

  const sendMessage = () => {
    socket.emit('sendMessage', {message, room});
    console.log(socket);
  }

  socket.on('userLeft', (data) => {
    console.log(data);
  });

  socket.on('joinToRoom', (data) => {
    setRoom(data);
    socket.emit('joinRoom', data);
  });
  
  useEffect(() => {
    socket.on('receiveMessage', (message) => {
      setMessageReceived(message);
      console.log(message);
    });
  }, [socket]);
 
  return (
    <div className="App">
      <input type="text" onChange={(event) => setMessage(event.target.value)}/>
      <button onClick={sendMessage}>send</button>
      <h1>{messageReceived}</h1>
    </div>
  );
}

export default App;
