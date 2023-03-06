import styles from '@/styles/globals.css';
import store from '@/store/store';
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material';
import { Montserrat } from '@next/font/google';
// import { CacheProvider } from '@emotion/react';
// import createEmotionCache from '../config/createEmotionCache';
// import CssBaseline from '@mui/material/CssBaseline';

const montserrat = Montserrat({
  variable: '--montserrat-font',
  subsets: ['cyrillic'],
});
// const clientSideEmotionCache = createEmotionCache();

export default function App({
  Component,
  // emotionCache = clientSideEmotionCache,
  pageProps,
}) {
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
    // <CacheProvider value={emotionCache}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <main className={montserrat.className}>
            {/* <CssBaseline/> */}
            <Component {...pageProps} />
            
          </main>
        </ThemeProvider>
      </Provider>
    // </CacheProvider>
  );
}
