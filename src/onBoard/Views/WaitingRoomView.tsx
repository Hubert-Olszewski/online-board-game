import { TextareaAutosize, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { FC } from "react";
import { domainClientURL } from "../../api/socket";

interface IUserName{
    gameId: string | undefined;
    userName: string
}

export const WaitingRoomView: FC<IUserName> = ({gameId, userName}) => (
    <Stack>
        <Typography variant="h2" textAlign={'center'} top={'5vh'} position={'relative'}>Hey {' '}
            <Box fontWeight='fontWeightMedium' display='inline'>
                {userName} 
            </Box>, copy and paste the URL below to send to your friends:
        </Typography>
        <Stack position={'absolute'} left={'25%'} top={'30%'}>
            <TextareaAutosize aria-label="empty textarea" style={{minWidth:'50vw', fontSize: '36px', resize: 'horizontal', maxWidth: '70vw' }} defaultValue={domainClientURL + '/game/' + gameId}/>
        </Stack>
        <br/>
        <Typography variant="h3" textAlign={'center'} top={'50vh'} position={'relative'}>Waiting for other opponents to join the game...</Typography>
    </Stack>
);