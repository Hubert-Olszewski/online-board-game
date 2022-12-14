import React, { useState } from "react";
import { FC } from "react";
import { Socket } from "socket.io-client";
import { LogScreenView } from "./Views/LogScreenView";
import { JoinGame } from "./JoinGame";

interface ISocket{
    socket: Socket;
}

interface IUser{
    didGetUserName: boolean;
    userName: string;
}

export const JoinRoom:FC<ISocket> = ({socket}) => {
    const [user, setUser] = useState<IUser>({
        didGetUserName: false,
        userName: "",
    });

    const joinGameRoom = () => {
        setUser({...user, didGetUserName: true});
    }

    const setInputValue = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setUser({...user, userName: event.target.value});
    }
    
    return (
        user.didGetUserName ?
        <JoinGame coreSocket={socket} coreUserName={user.userName} coreIsCreator={false}/>
        :
        <LogScreenView onClickBtn={joinGameRoom} onChangeInput={setInputValue} isDisabled={!(user.userName.length > 0)}/>
    );
}