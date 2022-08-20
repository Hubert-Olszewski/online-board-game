import { FC, useState } from "react";
import { v4 as uuid } from 'uuid';
import { useNavigate } from "react-router-dom";
import { LogScreen, SendButton } from "../components/LogScreen";
import { Socket } from "socket.io-client";

interface ICreateNewGameProps{
    didRedirect: () => void;
    setUserName: (name: string) => void;
    socket: Socket;
}

interface INewGameStatus{
    gameId: string, 
    mySocketId: string
}

export const CreateNewGame: FC<ICreateNewGameProps> = ({didRedirect, setUserName, socket}) => {
    const navigate = useNavigate();
    const [mySocketId, setMySocketId]= useState<string>('');
    const [user, setUser] = useState({
        didGetUserName: false,
        userName: "",
        gameId: ""
    });
    
    socket.on("createNewGame", (statusUpdate: INewGameStatus) => {
      console.log("A new game has been created! Game id: " + statusUpdate.gameId + " ServerSocket id: " + statusUpdate.mySocketId + " ClientSocketID: " + socket.id);
      console.log('CreateNewGame - client', statusUpdate);
      setMySocketId(statusUpdate.mySocketId);
    });

    const createNewGameRoom = () => {
        const newGameRoomId = uuid();
        setUser({...user, gameId: newGameRoomId, didGetUserName: true});

        setUserName(user.userName);
        didRedirect();

        socket.emit('createNewGame', newGameRoomId);
    }

    const setInputValue = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setUser({...user, userName: event.target.value});
    }

    const navigateToGameRoom = () => {
        navigate('/game/' + user.gameId); //TODO: Do przemyślenia - przenieść nawigacje do socket.on('CreateNewGame') i zlikwidować przycisk StartGame
    }

    return (
        user.didGetUserName ?        
            <SendButton sx={{left: '47%', top:'51%'}} onClick={navigateToGameRoom}>Start Game</SendButton>
            :
            <LogScreen onClickBtn={createNewGameRoom} onChangeInput={setInputValue} isDisabled={!(user.userName.length > 0)}/>
    );
}