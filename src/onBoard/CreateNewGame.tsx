import { FC, useState } from "react";
import { v4 as uuid } from 'uuid';
import { useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";
import { PanelManagerView } from "./Views/PanelManagerView";
import { LogScreenView } from "./Views/LogScreenView";
import { SelectPawnView } from "./Views/SelectPawnView";

interface ICreateNewGameProps{
    didRedirect: () => void;
    setUserName: (name: string) => void;
    setUserColorPawn: (pawn: string) => void;
    socket: Socket;
}

export const CreateNewGame: FC<ICreateNewGameProps> = ({didRedirect, setUserName, setUserColorPawn, socket}) => {
    const navigate = useNavigate();
    const [amountPlayers, setAmountPlayers] = useState<string>('');
    const [user, setUser] = useState({
        didGetUserName: false,
        didGetColor: false,
        userName: "",
        gameId: "",
    });

    const setColor = (colorPawn: string) => {
        setUser({...user, didGetColor: true});
        setUserColorPawn(colorPawn);
    }

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
            user.didGetColor ?       
                <PanelManagerView startGameOnClick={startGameOnClick} setAmountPlayers={setAmountPlayers} amountPlayers={amountPlayers} />
                :
                <SelectPawnView setColor={setColor} playerName={user.userName} socket={socket} />
            :
            <LogScreenView onClickBtn={createNewGameRoom} onChangeInput={setInputValue} isDisabled={!(user.userName.length > 0)}/>
    );
}