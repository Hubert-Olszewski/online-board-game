import React, { useCallback, useEffect, useState } from 'react';
import { BrowserRouter, Route, Link, Routes, Navigate } from "react-router-dom";
import './App.css';
import io from "socket.io-client";
import { OnBoard } from './onBoard/OnBoard';
import { ColorContext } from './context/colorContext';
import routes from './utils/routes';
import { JoinRoom } from './onBoard/JoinRoom';
import { JoinGame } from './onBoard/JoinGame';

const domainServerUrl = "http://localhost:3001";
export const domainClientURL = "http://localhost:3000";
const socket = io(domainServerUrl);

const App = () => {
  const [didRedirect, setDidRedirect] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');

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
          <Route path={routes.createNewGame} element={<OnBoard socket={socket} setUserName={setUserName}/>} />
          <Route path={routes.game} element=
          {
            didRedirect ?
                <JoinGame socket={socket} userName={userName} isCreator={true}/>
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
