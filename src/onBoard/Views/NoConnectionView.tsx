import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { notifyError } from "../../utils/toasts";

export const NoConnectionView = () => {
    notifyError('Check your connection and try again');
    return (
        <Stack>
            <Typography variant="h1" textAlign={'center'} top={'50%'}>No connection :/<br/>Try again...</Typography>
        </Stack>
    );
}