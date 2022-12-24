import { TextareaAutosize, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { FC } from "react";
import { domainClientURL } from "../../api/socket";
import textToDisplayPL from '../../assets/textToDisplay/pl-PL.json';

interface IUserName{
    gameId: string | undefined;
    userName: string
}

const { waitingRoom } = textToDisplayPL;

export const WaitingRoomView: FC<IUserName> = ({gameId, userName}) => (
    <Stack>
        <Typography variant="h2" textAlign={'center'} top={'5vh'} position={'relative'}>{waitingRoom.hello} {' '}
            <Box fontWeight='fontWeightMedium' display='inline'>
                {userName} 
            </Box>{waitingRoom.copyAndPasteUrl}
        </Typography>
        <Stack position={'absolute'} left={'25%'} top={'30%'}>
            <TextareaAutosize aria-label="empty textarea" style={{minWidth:'50vw', fontSize: '36px', resize: 'horizontal', maxWidth: '70vw' }} defaultValue={domainClientURL + '/game/' + gameId}/>
        </Stack>
        <br/>
        <Typography variant="h3" textAlign={'center'} top={'50vh'} position={'relative'}>{waitingRoom.waitingForOtherOpponents}</Typography>
    </Stack>
);