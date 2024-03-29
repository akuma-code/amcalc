import { createTheme } from '@mui/material/styles';
import { red, yellow, orange } from '@mui/material/colors';

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
            main: orange['900'],
        },
        warning: {
            main: red.A700
        },
        info: {
            main: yellow[900]
        }
    },
});

export default theme;