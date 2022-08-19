import { useEffect, useState } from "react";
import { Input, styled, Typography } from "@mui/material";
import { BasicStyleButton } from "../components/BasicButton";
import { Box, Stack } from "@mui/system";
import { v4 as uuid } from 'uuid';
import { Navigate, useNavigate } from "react-router-dom";
import { LogScreen, SendButton } from "../components/LogScreen";



export const CreateNewGame = (props: any) => {
    const socket = props.socket;
    const navigate = useNavigate();
    const [mySocketId, setMySocketId]= useState('');
    const [user, setUser] = useState({
        didGetUserName: false,
        userName: "",
        gameId: ""
    });
    
    socket.on("createNewGame", (statusUpdate: any) => {
      console.log("A new game has been created! Username: " + statusUpdate.userName + ", Game id: " + statusUpdate.gameId + " Socket id: " + statusUpdate.mySocketId);
      setMySocketId(statusUpdate.mySocketId);
    });

    const createNewGameRoom = () => {
        const newGameRoomId = uuid();
        setUser({...user, gameId: newGameRoomId, didGetUserName: true});

        props.setUserName(user.userName);
        props.didRedirect();

        socket.emit('createNewGame', newGameRoomId);
    }

    const setInputValue = (event: any) => {
        setUser({...user, userName: event.target.value});
    }

    const navigateToGameRoom = () => {
        navigate('/game/' + user.gameId);
    }

    return (
        user.didGetUserName ?        
            <SendButton sx={{left: '47%', top:'51%'}} onClick={navigateToGameRoom}>Start Game</SendButton>
            :
            <LogScreen onClickBtn={createNewGameRoom} onChangeInput={setInputValue} isDisabled={!(user.userName.length > 0)}></LogScreen>
    );
}