import React, { useState } from "react";
import { LogScreen } from "../components/LogScreen";
import { JoinGame } from "./JoinGame";

export const JoinRoom = (props: any) => {
    const [user, setUser] = useState({
        didGetUserName: false,
        userName: "",
    });

    const joinGameRoom = () => {
        setUser({...user, didGetUserName: true});
    }

    const setInputValue = (event: any) => {
        setUser({...user, userName: event.target.value});
    }
    
    return (
        user.didGetUserName ?
        <JoinGame socket={props.socket} userName={user.userName} isCreator={false}></JoinGame>
        :
        <LogScreen onClickBtn={joinGameRoom} onChangeInput={setInputValue} isDisabled={!(user.userName.length > 0)}></LogScreen>
    );
}