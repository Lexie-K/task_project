import styles from '@/styles/globals.css';
import store from '@/store/store';
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material';

export default function App({ Component, pageProps }) {
  const theme = createTheme({
    breakpoints: {
      values: {
        sm: 768,
      },
    },
    typography: {
      useNextVariants: true,
    },
  });

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}
