import styles from '@/styles/globals.css';
import store from '@/store/store';
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material';
import { Montserrat } from '@next/font/google';

const montserrat = Montserrat({
  variable: '--montserrat-font',
  subsets: ['cyrillic'],
});
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
        <main className={montserrat.className}>
          <Component {...pageProps} />
        </main>  
      </ThemeProvider>
    </Provider>
  );
}
