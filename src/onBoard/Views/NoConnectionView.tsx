import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import textToDisplayPL from '../../assets/textToDisplay/pl-PL.json';

const { noConnection } = textToDisplayPL;

export const NoConnectionView = () => (
    <Stack>
        <Typography variant="h1" textAlign={'center'} top={'50%'}>
            {noConnection.noConnection}
            <br/><br/><br/><br/><br/><br/>
            {noConnection.tryAgain}
        </Typography>
    </Stack>
);