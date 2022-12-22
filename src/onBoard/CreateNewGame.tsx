import { FC, useState } from "react";
import { v4 as uuid } from 'uuid';
import { useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";
import { PanelManagerView } from "./Views/PanelManagerView";
import { LogScreenView } from "./Views/LogScreenView";

interface ICreateNewGameProps{
    didRedirect: () => void;
    setUserName: (name: string) => void;
    socket: Socket;
}

export const CreateNewGame: FC<ICreateNewGameProps> = ({didRedirect, setUserName, socket}) => {
    const navigate = useNavigate();
    const [amountPlayers, setAmountPlayers] = useState<string>('');
    const [user, setUser] = useState({
        didGetUserName: false,
        userName: "",
        gameId: "",

    });

    const createNewGameRoom = () => {
        setUserName(user.userName);
        setUser({...user, didGetUserName: true});
    }

    const setInputValue = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setUser({...user, userName: event.target.value});
    }

    const navigateToGameRoom = (gameId: string) => {
        navigate('/game/' + gameId);
    }

    const startGameOnClick = () => {
        const newGameRoomId = uuid() + amountPlayers;
        setUser({...user, gameId: newGameRoomId});
        socket.emit('createNewGame', newGameRoomId);

        didRedirect();
        navigateToGameRoom(newGameRoomId);
    }

    return (
        user.didGetUserName ?        
            <PanelManagerView startGameOnClick={startGameOnClick} setAmountPlayers={setAmountPlayers} amountPlayers={amountPlayers} />
            :
            <LogScreenView onClickBtn={createNewGameRoom} onChangeInput={setInputValue} isDisabled={!(user.userName.length > 0)}/>
    );
}