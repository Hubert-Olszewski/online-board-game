import { Input, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { keyboardKey } from "@testing-library/user-event";
import { FC } from "react";
import { StyledButton } from "../../components/BasicButton";

interface ILogScreenProps{
    onClickBtn: () => void;
    onChangeInput: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    isDisabled: boolean;
}

export const LogScreenView: FC<ILogScreenProps> = ({onClickBtn, onChangeInput, isDisabled}) => {
    const handleKeyDown = (e: keyboardKey) => {
        e.keyCode === 13 && onClickBtn();
    }

    return (
    <Stack alignItems={'center'} top='26%' position={'relative'}>
        <Stack sx={{background: '#276350'}} alignItems={'center'} padding={'50px'} borderRadius={'10%'}>
            <Typography variant="h3" color={'white'}>Your Username</Typography>
            <Input sx={{width: '240px', background: '#ffffff', margin: '50px'}} type="text" onKeyDown={handleKeyDown} onChange={(event) => onChangeInput(event)} required/>
            <StyledButton disabled={isDisabled} onClick={onClickBtn} sx={{padding: '5px', marginBottom: '50px'}}>Submit</StyledButton>
        </Stack>
    </Stack>
    )
}