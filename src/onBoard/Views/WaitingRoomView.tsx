import { TextareaAutosize, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { domainClientURL } from "../../App";

export const WaitingRoomView = (props: any) => (
    <Stack>
        <Typography variant="h2" textAlign={'center'} top={'5vh'} position={'relative'}>Hey 
            <Box fontWeight='fontWeightMedium' display='inline'>
                {props.myUserName} 
            </Box>, copy and paste the URL below to send to your friends:
        </Typography>
        <Stack position={'absolute'} left={'25%'} top={'30%'}>
            <TextareaAutosize aria-label="empty textarea" style={{minWidth:'50vw', fontSize: '36px', resize: 'horizontal', maxWidth: '70vw' }} defaultValue={domainClientURL + '/game/' + props.gameId}/>
        </Stack>
        <br/>
        <Typography variant="h3" textAlign={'center'} top={'50vh'} position={'relative'}>Waiting for other opponent to join the game...</Typography>
    </Stack>
);