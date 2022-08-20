import { Input, Typography, styled } from "@mui/material"
import { Stack } from "@mui/system"
import { FC } from "react";
import { BasicStyleButton } from "./BasicButton";

export const SendButton = styled(BasicStyleButton)({
    textAlign: 'center',
    display: 'flex'
});

interface ILogScreenProps{
    onClickBtn: () => void;
    onChangeInput: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    isDisabled: boolean;
}

export const LogScreen: FC<ILogScreenProps> = ({onClickBtn, onChangeInput, isDisabled}) => {
    return (
    <Stack alignItems={'center'} top='26%' position={'relative'}>
        <Stack sx={{background: '#276350'}} alignItems={'center'} padding={'50px'} borderRadius={'10%'}>
            <Typography variant="h3" color={'white'}>Your Username</Typography>
            <Input sx={{width: '240px', background: '#ffffff', margin: '50px'}} type="text" onChange={(event) => onChangeInput(event)} required/>
            <SendButton disabled={isDisabled} onClick={onClickBtn} sx={{padding: '5px', marginBottom: '50px'}} >Submit</SendButton>
        </Stack>
    </Stack>
    )
}