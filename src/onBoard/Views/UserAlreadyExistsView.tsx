import { Stack, Typography } from "@mui/material";
import WarningIcon from '@mui/icons-material/Warning';
import textToDisplayPL from '../../assets/textToDisplay/pl-PL.json';

const { UserAlreadyExists } = textToDisplayPL;

export const UserAlreadyExistsView = () => (
    <Stack style={{height: '100vh', position: 'relative'}}>
        <Typography variant="h2" textAlign={'center'}>
            {UserAlreadyExists.userExists}
        </Typography>
        <WarningIcon color="warning" style={{fontSize: '70vh', marginLeft: 'auto', marginRight: 'auto'}} />
        <Typography variant="h2" textAlign={'center'} position={'relative'}>
            {UserAlreadyExists.tryAgain}
        </Typography>
    </Stack>
);