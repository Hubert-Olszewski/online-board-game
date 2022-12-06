import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { IClassNames } from "../../Views/BoardView";


export const CenterDeck: FC<IClassNames> = ({className, label}) => (
    <div className={className}>
        <Typography variant="h6" className="label">{label}</Typography>
        <Stack className="deck"></Stack>
    </div>
);