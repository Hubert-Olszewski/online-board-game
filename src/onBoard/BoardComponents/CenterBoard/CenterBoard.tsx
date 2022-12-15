import { Typography } from "@mui/material";
import { FC } from "react";
import { Socket } from "socket.io-client";
import { ControlPanelView } from "../../Views/ControlPanelView";
import { CenterDeck } from "./CenterDeck";

interface ICenterBoardProps {
    socket: Socket;
}

export const CenterBoard: FC<ICenterBoardProps> = ({socket}) => (
    <div className="center">
        <ControlPanelView socket={socket}/>
        <CenterDeck className="community-chest-deck" label="Kasa studencka"/>
        <Typography variant="h2" className="title">MONOPOLSL</Typography>
        <CenterDeck className="chance-deck" label="Szansa studencka"/>
    </div>
);