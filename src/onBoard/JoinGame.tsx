import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GameView } from "./Views/GameView";
import { NoConnectionView } from "./Views/NoConnectionView";
import { ColorContext } from "../context/colorContext";
import { WaitingRoomView } from "./Views/WaitingRoomView";

export const JoinGame = (props: any) => {
    const socket = props.socket;
    const color = useContext(ColorContext)
    const { gameid } = useParams();
    const [opponentSocketId, setOpponentSocketId] = useState('')
    const [opponentDidJoinTheGame, setDidOpponentJoinGame] = useState(false)
    const [opponentUserName, setOpponentUserName] = useState('')
    const [gameSessionDoesNotExist, setGameSessionDoesntExist] = useState(false)
    const [gameRoomData, setGameRoomData] = useState({
        gameId : gameid,
        userName : props.userName,
        isCreator: props.isCreator
    });

    useEffect(() => {
        socket.on("playerJoinedRoom", (statusUpdate: any) => {
            console.log("A new player has joined the room! Username: " + statusUpdate.userName + ", Game id: " + statusUpdate.gameId + " Socket id: " + statusUpdate.mySocketId)
            if (socket.id !== statusUpdate.mySocketId) {
                setOpponentSocketId(statusUpdate.mySocketId)
            }
        });

        socket.on("status", (statusUpdate: any) => {
            console.log(statusUpdate)
            alert(statusUpdate)
            if (statusUpdate === 'This game session does not exist.' || statusUpdate === 'There are already 2 people playing in this room.') {
                setGameSessionDoesntExist(true)
            }
        });

        socket.on('start game', (opponentUserName: any) => {
            console.log("START!")
            if (opponentUserName !== props.myUserName) {
                setOpponentUserName(opponentUserName)
                setDidOpponentJoinGame(true) 
            } else {
                // in chessGame, pass opponentUserName as a prop and label it as the enemy. 
                // in chessGame, use reactContext to get your own userName
                // socket.emit('myUserName')
                socket.emit('request username', gameid)
            }
        })
    
    
        socket.on('give userName', (socketId: any) => {
            if (socket.id !== socketId) {
                console.log("give userName stage: " + props.myUserName)
                socket.emit('recieved userName', {userName: props.myUserName, gameId: gameid})
            }
        })
    
        socket.on('get Opponent UserName', (data: any) => {
            if (socket.id !== data.socketId) {
                setOpponentUserName(data.userName)
                console.log('data.socketId: data.socketId')
                setOpponentSocketId(data.socketId)
                setDidOpponentJoinGame(true) 
            }
        })

    }, []);

    socket.emit("playerJoinGame", gameRoomData);

    return(
        <Stack>
            <Typography variant="h3" textAlign={'center'}>Welcome to the Online Board Game!</Typography>
            <React.Fragment>
                {
                    opponentDidJoinTheGame ? <GameView></GameView> 
                    : 
                    gameSessionDoesNotExist ? 
                        <NoConnectionView></NoConnectionView>
                        :
                        <WaitingRoomView gameId={gameid} ></WaitingRoomView>
                }
            </React.Fragment>
        </Stack>
    );
}