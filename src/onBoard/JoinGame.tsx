import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GameView } from "./Views/GameView";
import { NoConnectionView } from "./Views/NoConnectionView";
import { WaitingRoomView } from "./Views/WaitingRoomView";
import { Socket } from "socket.io-client";
import { FC } from "react";
import { FullRoomView } from "./Views/FullRoomView";
import { IUser } from '../App';
import { UserAlreadyExistsView } from "./Views/UserAlreadyExistsView";

interface IJoinGameProps{
    coreSocket: Socket;
    coreUserName: string;
    userColorPawn: string;
    coreIsCreator: boolean;
}

export const JoinGame: FC<IJoinGameProps> = ({coreSocket, coreUserName, userColorPawn, coreIsCreator}) => {
    // const color = useContext(ColorContext);
    const { gameid } = useParams();
    const [isRoomReady, setIsRoomReady] = useState<boolean>(false);
    const [gameSessionDoesNotExist, setGameSessionDoesntExist] = useState<boolean>(false);
    const [isGameRoomFull, setIsGameRoomFull] = useState<boolean>(false);
    const [isUserAlreadyExists, setIsUserAlreadyExists] = useState<boolean>(false);
    const [gameRoomData, setGameRoomData] = useState<IUser>({
        gameId : gameid ? gameid : '',
        userName : coreUserName,
        isCreator: coreIsCreator,
        userId: coreSocket.id,
        didJoinTheGame: false,
        isConnected: false,
        props: {
            money: -1,
        },
        colorPawn: userColorPawn
    });

    useEffect(() => {
        coreSocket.on("createdNewGame", (gameId: string, userId: string) => {
            console.log('CreateNewGame - client', gameId, userId);
        });

        coreSocket.on('startGame', (users: IUser[], isGameReady: boolean) => {
            console.log("START!", users);
            setIsRoomReady(isGameReady);
        });

        coreSocket.on('disconnect', (reason) => {
            console.log('disconnect', reason, coreSocket.id);
            setGameSessionDoesntExist(true);
        });

        coreSocket.on("status", (statusUpdate: string) => {
            switch (statusUpdate) {
                case 'gameSessionDoesNotExist':
                    setGameSessionDoesntExist(true);
                    break;
                case 'fullRoom':
                    setIsGameRoomFull(true);
                    break;
                case 'userAlreadyExists':
                    setIsUserAlreadyExists(true);
                    break;
                default:
                    break;
            }
        });

    }, []);

    useEffect(() => {
        coreSocket.emit("playerJoinGame", gameRoomData);
        coreSocket.emit('updatePawns', userColorPawn);
    }, []);

    return(
        <div>
            {
                isRoomReady ? 
                <GameView socket={coreSocket} gameId={gameRoomData.gameId} /> 
                : 
                    gameSessionDoesNotExist ? <NoConnectionView/>
                    :
                        isGameRoomFull ? <FullRoomView />
                        :
                            isUserAlreadyExists ? <UserAlreadyExistsView />
                            : 
                            <WaitingRoomView gameId={gameRoomData.gameId} userName={gameRoomData.userName}/>
            }
        </div>
    );
}