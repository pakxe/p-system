import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { GlobalStyle } from './GlobalStyle';
import { Global } from '@emotion/react';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './Router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
    <Global styles={GlobalStyle} />
  </StrictMode>,
);
