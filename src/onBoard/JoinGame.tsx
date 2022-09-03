import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GameView } from "./Views/GameView";
import { NoConnectionView } from "./Views/NoConnectionView";
import { ColorContext } from "../context/colorContext";
import { WaitingRoomView } from "./Views/WaitingRoomView";
import { Socket } from "socket.io-client";
import { FC } from "react";
import { notifyInfo } from "../utils/toasts";


interface IJoinGameProps{
    socket: Socket;
    userName: string;
    isCreator: boolean;
}

interface IGameRoomData{
    gameId : string | undefined;
    userName : string;
    isCreator: boolean;
}

interface IOponentUserData{
    userName: string;
    gameId: string;
    socketId: string;
}

interface IUserGameRoomData{
    gameId : string | undefined;
    userName : string;
    isCreator: boolean;
    mySocketId: string;
}

export const JoinGame: FC<IJoinGameProps> = ({socket, userName, isCreator}) => {
    // const color = useContext(ColorContext);
    const { gameid } = useParams();
    const [opponentSocketId, setOpponentSocketId] = useState<string>('');
    const [opponentDidJoinTheGame, setDidOpponentJoinGame] = useState<boolean>(false);
    const [opponentUserName, setOpponentUserName] = useState<string>('');
    const [gameSessionDoesNotExist, setGameSessionDoesntExist] = useState<boolean>(false);
    const [gameRoomData, setGameRoomData] = useState<IGameRoomData>({
        gameId : gameid,
        userName : userName,
        isCreator: isCreator
    });

    useEffect(() => {
        socket.on("playerJoinedRoom", (statusUpdate: IUserGameRoomData) => {
            console.log("A new player has joined the room! Username: " + statusUpdate.userName + ", Game id: " + statusUpdate.gameId + " comingSocket: " + statusUpdate.mySocketId + ' LocalSocket: ' + socket.id);
            // notifyInfo(`A new player, ${statusUpdate.userName} has joined the room!`);
            if (socket.id !== statusUpdate.mySocketId) {
                setOpponentSocketId(statusUpdate.mySocketId);
            }
        });

        socket.on('startGame', (opponentUserName: string) => {
            console.log("START!");
            if (opponentUserName !== userName) {
                console.log('OpponentName', opponentUserName);
                setOpponentUserName(opponentUserName);
                setDidOpponentJoinGame(true); 
            } else {
                // socket.emit('myUserName')
                console.log('requestUsername', opponentUserName);
                socket.emit('requestUsername', gameRoomData.gameId);
            }
        });
    
        socket.on('giveUserName', (socketId: string) => {
            // console.log('giveUserNameBefore: ' + socketId);
            if (socket.id !== socketId) {
                console.log("giveUserName: " + gameRoomData.userName);
                socket.emit('recievedUserName', {userName: gameRoomData.userName, gameId: gameRoomData.gameId});
            }
        });
    
        socket.on('getOpponentUserName', (data: IOponentUserData) => {
            // console.log('getOpponentUserNameBefore');
            if (socket.id !== data.socketId) {
                console.log('Oponent: ' + data.userName);
                setOpponentUserName(data.userName);
                setOpponentSocketId(data.socketId);
                setDidOpponentJoinGame(true);
            }
        });

        socket.on('onDisconnect', (data: any) => {
            console.log('User has left: ', data);
        });

        socket.on("status", (statusUpdate: string) => {
            console.log(statusUpdate);
            alert(statusUpdate);
            if (statusUpdate === 'This game session does not exist.' || statusUpdate === 'There are already 2 people playing in this room.') {
                setGameSessionDoesntExist(true);
            }
        });

    }, []);

    socket.emit("playerJoinGame", gameRoomData);

    return(
        <Stack>
            <Typography variant="h3" textAlign={'center'} color={'green'}>Welcome to the Online Board Game!</Typography>
                {
                    opponentDidJoinTheGame ? <GameView socket={socket} gameId={gameRoomData.gameId} userName={gameRoomData.userName} opponentUserName={opponentUserName}></GameView> 
                    : 
                    gameSessionDoesNotExist ? 
                        <NoConnectionView/>
                        :
                        <WaitingRoomView gameId={gameRoomData.gameId} userName={gameRoomData.userName}/>
                }
        </Stack>
    );
}