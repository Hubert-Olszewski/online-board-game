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
    userName: string;
    opponentUsers: IUser[];
    currentUser: IUser;
}

interface IMessageReceived{
    message: string;
    user: string;
}

export const ChatView: FC <IChatViewProps> = ({socket, gameId, userName, opponentUsers, currentUser}) => {
    const [room, setRoom] = useState(gameId);
    const [user, setUser] = useState(userName);
    const [message, setMessage] = useState('');
    const [messageStorage, setMessageStorage] = useState<string[]>([]);

    const sendMessage = () => {
        if(message !== ''){
            socket.emit('sendMessage', {message, room, user});
            setMessage('');
        }
    }

    useEffect(() => {
        if(currentUser.userId === socket.id){
            !currentUser.isConnected && setMessageStorage(arr => [...arr, `${currentUser.userName} has left the room!`]);
        }
        else{
            console.log('Other user has left the room');
        }
    }, [currentUser]);

    useEffect(() => {
        opponentUsers.map(opponent => setMessageStorage(arr => arr.find(message => message === `${opponent.userName} has joined the room!`) ? 
            [...arr, `${opponent.userName} has joined the room!`] : arr)
        );
    }, [opponentUsers]);
    
    useEffect(() => {
        setMessageStorage(arr => [...arr, `${currentUser.userName} has joined the room!`]);
    }, [currentUser])

    useEffect(() => {
        socket.on('receiveMessage', (response: IMessageReceived) => {
            setMessageStorage(arr => [...arr, `${response.user}: ${response.message}`]);
            console.log(response);
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