import { Socket } from "socket.io-client";
import { ChatView } from "./ChatView";
import { FC } from "react";
import { BoardView } from "./BoardView";

interface IGameViewProps{
    socket: Socket;
    gameId: string | undefined;
}

export const GameView: FC<IGameViewProps> = ({socket, gameId}) => (
    <div>
        <BoardView socket={socket}/>
        <ChatView socket={socket} gameId={gameId} />
    </div>
);