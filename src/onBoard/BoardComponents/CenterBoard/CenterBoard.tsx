import { Typography } from "@mui/material";
import { CenterDeck } from "./CenterDeck";

export const CenterBoard = () => (
    <div className="center">
        <CenterDeck className="community-chest-deck" label="Community Chest"/>
        <Typography variant="h2" className="title">MONOPOLY</Typography>
        <CenterDeck className="chance-deck" label="Chance"/>
    </div>
);