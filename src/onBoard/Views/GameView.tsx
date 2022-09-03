import { Socket } from "socket.io-client";
import { ChatView } from "./ChatView";
import { FC } from "react";
import { Stack } from "@mui/system";

interface IGameViewProps{
    socket: Socket;
    gameId: string | undefined;
    userName: string;
    opponentUserName: string;
}

export const GameView: FC<IGameViewProps> = ({socket, gameId, userName, opponentUserName}) => {
    
    return (
        <Stack>
            <ChatView socket={socket} gameId={gameId} userName={userName} opponentUserName={opponentUserName}></ChatView>
        </Stack>
    );
}