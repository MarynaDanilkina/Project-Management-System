import { lightGreen } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: lightGreen[400],
      dark: lightGreen[500],
    },
  },
});

export default theme;
