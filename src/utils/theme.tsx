import { createTheme } from '@mui/material';

const theme = createTheme({
    palette: {
      background: {
        default: '#E8F9FD'
      },
      primary: {
        main: '#CCC',
      },
      secondary: {
        main: '#333333',
      },
    },
    typography: {
      fontFamily: 'Comic Sans MS',
    },
});

export default theme;