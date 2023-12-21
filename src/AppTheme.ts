import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
    palette: {
        primary: {
            main: '#1267cfe9',
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: red.A700,
        },
    },
});

export default theme;