import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { FC } from "react";
import { Box, Stack } from "@mui/system";
import { TextareaAutosize, Typography } from "@mui/material";
import { keyboardKey } from "@testing-library/user-event";
import { StyledButton } from "../../components/BasicButton";
import { IUser } from "../../App";

interface IChatViewProps{
    socket: Socket;
    gameId: string | undefined;
}

interface IMessageReceived{
    message: string;
    user: IUser;
}

export const ChatView: FC <IChatViewProps> = ({socket, gameId}) => {
    const [room, setRoom] = useState(gameId);
    const [currentUser, setCurrentUser] = useState<IUser | null>(null);
    const [disconnectedUser, setDisconntectedUser] = useState<IUser | null>(null);
    const [message, setMessage] = useState('');
    const [messageStorage, setMessageStorage] = useState<string[]>([]);

    const sendMessage = () => {
        if(message !== ''){
            socket.emit('sendMessage', {message, room, user: currentUser});
            setMessage('');
        }
    }

    useEffect(() => {
        socket.on('receiveMessage', (response: IMessageReceived) => {
            setMessageStorage(arr => [...arr, `${response.user.userName}: ${response.message}`]);
            console.log(response);
        });

        socket.on("playerJoinedRoom", (newUser: IUser) => {
            console.log('playerJoinedRoom', socket.id, newUser.userId, currentUser);

            if(disconnectedUser && newUser.userName === disconnectedUser.userName){
                newUser.props = disconnectedUser.props;
            }

            setCurrentUser(newUser);
            setMessageStorage(arr => [...arr, `${newUser.userName} (me) has joined the room!`]);
        });

        socket.on('playerReconnected', (newUser: IUser) => {
            console.log('playerReconnected', socket.id, newUser.userId, currentUser);

            setMessageStorage(arr => [...arr, `${newUser.userName} has joined the room!`]);
        });

        socket.on('onDisconnect', (disconectedUser: IUser) => {
            console.log('onDisconnect', currentUser, disconectedUser);

            setDisconntectedUser(disconectedUser);
            setMessageStorage(arr => [...arr, `${disconectedUser.userName} has left the room!`]);
        });

    }, []);

    const setInputValue = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        event.target.value !== '\n' && setMessage(event.target.value);
    }

    const handleKeyDown = (e: keyboardKey) => {
        e.keyCode === 13 && sendMessage();
    }

    return (
        <Stack sx={{padding: '15px', width: '25vw', margin:0, position: 'relative', float: 'right'}}>
            <Box aria-label="empty textarea" style={{border:'1px solid black', overflow:'auto', height: '80vh', fontSize: '18px', backgroundColor: 'white' }}>
                { 
                    messageStorage.map((item, index) => 
                    <Typography key={index}>
                        {item}
                    </Typography>)
                }
            </Box>
            <Stack>
                <TextareaAutosize aria-label="empty textarea" value={message} onChange={setInputValue} onKeyDown={handleKeyDown} placeholder={'Type your message here...'} style={{ fontSize: '18px', resize: 'none', maxHeight: '270px', overflow: 'auto' }}/>
                <StyledButton onClick={sendMessage}>Send</StyledButton>
            </Stack>
        </Stack>
    );
}