import React, { useEffect, useState } from "react";
import { FC } from "react";
import { Socket } from "socket.io-client";
import { LogScreenView } from "./Views/LogScreenView";
import { JoinGame } from "./JoinGame";
import { SelectPawnView } from "./Views/SelectPawnView";

interface IJoinRoomProps {
    socket: Socket;
}

export const JoinRoom:FC<IJoinRoomProps> = ({socket}) => {
    const [user, setUser] = useState({
        didGetUserName: false,
        didGetColor: false,
        userName: "",
        colorPawn: ""
    });

    const setColor = (colorPawn: string) => {
        const _user = {...user, didGetColor: true, colorPawn: colorPawn}
        setUser(_user);
        // socket.emit('updateUser', _user);
    }

    const joinGameRoom = () => {
        setUser({...user, didGetUserName: true});
    }

    const setInputValue = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setUser({...user, userName: event.target.value});
    }
    
    return (
        user.didGetUserName ?
            user.didGetColor ?
                <JoinGame coreSocket={socket} coreUserName={user.userName} coreIsCreator={false} userColorPawn={user.colorPawn}/>
                :
                <SelectPawnView setColor={setColor} playerName={user.userName} socket={socket} />
            :
            <LogScreenView onClickBtn={joinGameRoom} onChangeInput={setInputValue} isDisabled={!(user.userName.length > 0)}/>
    );
}