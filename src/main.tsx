import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { GlobalStyle } from './GlobalStyle';
import { Global, ThemeProvider } from '@emotion/react';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './Router';
import theme from './theme';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
      <Global styles={GlobalStyle} />
    </ThemeProvider>
  </StrictMode>,
);
