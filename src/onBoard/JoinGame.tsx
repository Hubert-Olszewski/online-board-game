import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GameView } from "./Views/GameView";
import { NoConnectionView } from "./Views/NoConnectionView";
import { WaitingRoomView } from "./Views/WaitingRoomView";
import { Socket } from "socket.io-client";
import { FC } from "react";
import { FullRoomView } from "./Views/FullRoomView";
import { IUser } from '../App';


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
    const [opponentUsers, setOpponentUsers] = useState<IUser[]>([]);
    const [currentUser, setCurrentUser] = useState<IUser>({} as IUser);
    const [gameSessionDoesNotExist, setGameSessionDoesntExist] = useState<boolean>(false);
    const [isGameRoomFull, setIsGameRoomFull] = useState<boolean>(false);
    const [gameRoomData, setGameRoomData] = useState<IGameRoomData>({
        gameId : gameid,
        userName : userName,
        isCreator: isCreator
    });

    useEffect(() => {
        socket.on("playerJoinedRoom", ({userName, gameId, mySocketId, isCreator}: IUserGameRoomData) => {
            // console.log("A new player has joined the room! Username: " + userName + ", Game id: " + gameId + " comingSocket: " + mySocketId + ' LocalSocket: ' + socket.id);
            // notifyInfo(`A new player, ${statusUpdate.userName} has joined the room!`);
            const newUser = {
                gameId: gameId ? gameId : '',
                userId: socket.id,
                isCreator: isCreator,
                isConnected: true,
                didJoinTheGame: true,
                didGetUserName: true,
                userName: userName,
                money: -1,
            }
            
            if (socket.id !== mySocketId) {
                const isOpponentUser = opponentUsers.find(({userId}) => userId === mySocketId);
                !isOpponentUser && setOpponentUsers([...opponentUsers, newUser]);
            }
            else{
                setCurrentUser(newUser);
            }
        });

        socket.on('startGame', (opponentUserName: string) => {
            console.log("START!");
            if (opponentUserName !== userName) {
                console.log('OpponentName', opponentUserName);
                const opponentUser = opponentUsers.find((opponent) => opponent.userName === opponentUserName),
                newOpponnentUsers = opponentUsers.filter((opponent) => opponent.userName !== opponentUserName);

                opponentUser && setOpponentUsers([...newOpponnentUsers, {
                    ...opponentUser, 
                    userName: opponentUserName, 
                    didJoinTheGame: true
                }]);
            } else {
                console.log('requestUsername', opponentUserName);
                setCurrentUser({...currentUser, didJoinTheGame: true});
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
    
        socket.on('getOpponentUserName', ({userName, socketId, gameId}: IOponentUserData) => {
            // console.log('getOpponentUserNameBefore');
            const newUser = {
                gameId: gameId ? gameId : '',
                userId: socketId,
                isCreator: false,
                isConnected: true,
                didJoinTheGame: true,
                didGetUserName: true,
                userName: userName,
                money: -1,
            }

            if (socket.id !== socketId) {
                console.log('Oponent: ' + userName);
                const opponentUser = opponentUsers.find(({userId}) => userId === socketId);
                !opponentUser && setOpponentUsers([...opponentUsers, newUser]);
            }
        });

        socket.on('onDisconnect', ({reason, userId}) => {
            console.log('User has left: ', userId, reason);
            const opponentUser = opponentUsers.find(user => user.userId === userId);
            if(currentUser.userId === userId){
                setCurrentUser({...currentUser, isConnected: false});
            }
            else if(opponentUser && opponentUser.userId === userId ){
                const opponentUsersWithOutOne = opponentUsers.filter((user) => user.userId !== userId);
                opponentUsersWithOutOne.push({...opponentUser, isConnected: false});
                setOpponentUsers(opponentUsersWithOutOne);
            }
            
        });

        socket.on('disconnect', (reason) => {
            console.log('disconnect', reason, socket.id);
            setGameSessionDoesntExist(true);
        });

        socket.on("status", (statusUpdate: string) => {
            switch (statusUpdate) {
                case 'gameSessionDoesNotExist':
                    setGameSessionDoesntExist(true);
                    break;
                case 'fullRoom':
                    setIsGameRoomFull(true);
                    break;
                default:
                    break;
            }
        });

    }, []);

    const opponent = opponentUsers.find(opponent => opponent.userId === socket.id);
    if(currentUser && socket.id === currentUser.userId){
        !currentUser.isConnected && socket.emit("playerJoinGame", gameRoomData);
    }
    else if(opponent && socket.id === opponent.userId){
        !opponent.isConnected && socket.emit("playerJoinGame", gameRoomData);
    }

    useEffect(() => {
        socket.emit("playerJoinGame", gameRoomData);
    }, []);


    return(
        <div>
            {
                opponentUsers.length && opponentUsers.reduce((didAllPlayersJoinedTheGame, {didJoinTheGame}) => Boolean(+didAllPlayersJoinedTheGame * +didJoinTheGame), true) ? 
                <GameView socket={socket} gameId={gameRoomData.gameId} userName={gameRoomData.userName} opponentUsers={opponentUsers} currentUser={currentUser} /> 
                : 
                    gameSessionDoesNotExist ? <NoConnectionView/>
                    :
                        isGameRoomFull ? <FullRoomView />
                        :
                        <WaitingRoomView gameId={gameRoomData.gameId} userName={gameRoomData.userName}/>
            }
        </div>
    );
}