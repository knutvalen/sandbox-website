import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#2196f3',
            light: '#6ec6ff',
            dark: '#0069c0',
            contrastText: '#000000',
        },
        secondary: {
            main: '#00e676',
            light: '#66ffa6',
            dark: '#00b248',
            contrastText: '#000000',
        },
    },
});

export default theme;