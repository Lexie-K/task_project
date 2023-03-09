import styles from '@/styles/globals.css';
import store, { persistor } from '@/store/store';
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material';
import { Montserrat } from '@next/font/google';
import { PersistGate } from 'redux-persist/integration/react';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../config/createEmotionCache';
import { persistStore } from 'redux-persist';

const montserrat = Montserrat({
  variable: '--montserrat-font',
  subsets: ['cyrillic'],
});
const clientSideEmotionCache = createEmotionCache();

export default function App({
  Component,
  emotionCache = clientSideEmotionCache,
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
    <CacheProvider value={emotionCache}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            <main className={montserrat.className}>
              <Component {...pageProps} />
            </main>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </CacheProvider>
  );
}
