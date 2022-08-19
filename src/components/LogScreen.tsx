import { Input, Typography, styled } from "@mui/material"
import { Stack } from "@mui/system"
import { BasicStyleButton } from "./BasicButton";

export const SendButton = styled(BasicStyleButton)({
    textAlign: 'center',
    display: 'flex'
});

export const LogScreen = (props: any) => {
    return (
    <Stack alignItems={'center'} top='26%' position={'relative'}>
        <Stack sx={{background: '#276350'}} alignItems={'center'} padding={'50px'} borderRadius={'10%'}>
            <Typography variant="h3" color={'white'}>Your Username</Typography>
            <Input sx={{width: '240px', background: '#ffffff', margin: '50px'}} type="text" onChange={(event) => props.onChangeInput(event)} required/>
            <SendButton disabled={props.isDisabled} onClick={props.onClickBtn} sx={{padding: '5px', marginBottom: '50px'}} >Submit</SendButton>
        </Stack>
    </Stack>
    )
}