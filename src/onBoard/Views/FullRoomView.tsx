import { Stack, Typography } from "@mui/material"

export const FullRoomView = () => {
    return (
        <Stack alignItems={'center'} height={'80vh'} sx={{background: '#276350'}}>
            <Stack alignItems={'center'} top={'30%'} position={'relative'}>
                <Typography variant="h3" color={'white'}>Unfortunately this room is full :(</Typography>
                <Typography variant="h3" color={'white'}>Wait for someone to leave the room and try again or try to join another one</Typography>
            </Stack>
        </Stack>
    );
}