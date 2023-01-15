import { Stack, Typography } from "@mui/material"
import textToDisplayPL from '../../assets/textToDisplay/pl-PL.json';

const { fullRoom } = textToDisplayPL;

export const FullRoomView = () => (
    <Stack alignItems={'center'} height={'80vh'} sx={{background: '#276350'}}>
        <Stack alignItems={'center'} top={'30%'} position={'relative'}>
            <Typography variant="h3" color={'white'}>{fullRoom.fullRoomMessg}</Typography>
            <br/><br/><br/><br/><br/><br/><br/><br/>
            <Typography variant="h3" color={'white'} textAlign={'center'}>{fullRoom.waitOrLeave}</Typography>
        </Stack>
    </Stack>
);