import { FC, useContext } from "react";
import { Socket } from "socket.io-client";
import { ColorContext } from "../context/colorContext";
import { CreateNewGame } from "./CreateNewGame";

interface IOnBoardProps {
  socket: Socket;
  setUserName: (name: string) => void;
  setUserColorPawn: (pawn: string) => void;
}
export const OnBoard: FC<IOnBoardProps> = ({socket, setUserName, setUserColorPawn}) => {
  const color = useContext(ColorContext);

  return <CreateNewGame didRedirect = {color.playerDidRedirect} setUserName = {setUserName} setUserColorPawn={setUserColorPawn} socket={socket}/>
}