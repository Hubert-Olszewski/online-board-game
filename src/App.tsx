import { useCallback, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { OnBoard } from './onBoard/OnBoard';
import { ColorContext } from './context/colorContext';
import routes from './utils/routes';
import { JoinRoom } from './onBoard/JoinRoom';
import { JoinGame } from './onBoard/JoinGame';
import socket from './api/socket';
import './styles/App.css';

interface IPropsUser {
  money: number;
}

export interface IUser {
  gameId: string;
  userId: string;
  isCreator: boolean;
  isConnected: boolean;
  didJoinTheGame: boolean;
  userName: string;
  props: IPropsUser,
  colorPawn: string;
}

const App = () => {
  const [didRedirect, setDidRedirect] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
  const [userColorPawn, setUserColorPawn] = useState<string>('');

  const playerDidRedirect = useCallback(() => {
    setDidRedirect(true);
  }, []);
  const playerDidNotRedirect = useCallback(() => {
    setDidRedirect(false);
  }, []);

  return (
    <ColorContext.Provider value={{didRedirect: didRedirect, playerDidRedirect: playerDidRedirect, playerDidNotRedirect: playerDidNotRedirect}}>
      <BrowserRouter>
        <Routes>
          <Route path={routes.root} element={<Navigate to={routes.createNewGame}/>} />
          <Route path={routes.createNewGame} element={<OnBoard socket={socket} setUserName={setUserName} setUserColorPawn={setUserColorPawn} />} />
          <Route path={routes.game} element=
          {
            didRedirect ?
                <JoinGame coreSocket={socket} coreUserName={userName} userColorPawn={userColorPawn} coreIsCreator={true}/>
                :
                <JoinRoom socket={socket}/>
          }></Route>
          <Route path='*' element={<Navigate to={routes.createNewGame}/>} />
        </Routes>
      </BrowserRouter>
    </ColorContext.Provider>
  );
}

export default App;
