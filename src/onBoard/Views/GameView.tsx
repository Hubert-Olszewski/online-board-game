import { Socket } from "socket.io-client";
import { ChatView } from "./ChatView";
import { FC } from "react";
import { BoardView } from "./BoardView";
import { IUser } from '../../App';

interface IGameViewProps{
    socket: Socket;
    gameId: string | undefined;
    userName: string;
    opponentUsers: IUser[];
    currentUser: IUser;
}

export const GameView: FC<IGameViewProps> = ({socket, gameId, userName, opponentUsers, currentUser}) => {
    
    return (
        <div>
            <BoardView socket={socket}/>
            <ChatView socket={socket} gameId={gameId} userName={userName} opponentUsers={opponentUsers} currentUser={currentUser}/>
        </div>
    );
}