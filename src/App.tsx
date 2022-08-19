import React, { useEffect, useState } from 'react';
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
  const [room, setRoom] = useState('');

  socket.on('userLeft', (data) => {
    console.log(data);
  });

  socket.on('joinToRoom', (data) => {
    setRoom(data);
    socket.emit('joinRoom', data);
  });

  const [didRedirect, setDidRedirect] = React.useState(false);

  const playerDidRedirect = React.useCallback(() => {
    setDidRedirect(true);
  }, []);

  const playerDidNotRedirect = React.useCallback(() => {
    setDidRedirect(false);
  }, []);

  const [userName, setUserName] = React.useState('');

  return (
    <ColorContext.Provider value={{didRedirect: didRedirect, playerDidRedirect: playerDidRedirect, playerDidNotRedirect: playerDidNotRedirect}}>
      <BrowserRouter>
        <Routes>
          <Route path={routes.root} element={<Navigate to={routes.createNewGame}/>} />
          <Route path={routes.createNewGame} element={<OnBoard socket={socket} room={room} setUserName={setUserName}/>} />
          <Route path={routes.game} element={<React.Fragment>
            {didRedirect ?
              <React.Fragment>
                <JoinGame socket={socket} userName={userName} isCreator={true}></JoinGame>
                {/* TODO: Game field components */}
              </React.Fragment>
              :
              <JoinRoom socket={socket}></JoinRoom>
            }
          </React.Fragment>}>
          </Route>
          <Route path='*' element={<Navigate to={routes.createNewGame}/>} />
        </Routes>
      </BrowserRouter>
    </ColorContext.Provider>
  );
}

export default App;
