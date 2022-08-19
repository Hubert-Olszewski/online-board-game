import { styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ColorContext } from "../context/colorContext";
import { CreateNewGame } from "./CreateNewGame";

export const OnBoard = (props: any) => {
  const color = React.useContext(ColorContext);
  const socket = props.socket;
  const room = props.room;

  const [message, setMessage] = useState('');
  const [messageReceived, setMessageReceived] = useState('');
  const sendMessage = () => {
    socket.emit('sendMessage', {message, room});
    console.log(socket);
  }
  useEffect(() => {
      socket.on('receiveMessage', (message: any) => {
        setMessageReceived(message);
        console.log(message);
      });
  }, [socket]);

  return <CreateNewGame didRedirect = {color.playerDidRedirect} setUserName = {props.setUserName} socket={props.socket} room={props.room}/>
}