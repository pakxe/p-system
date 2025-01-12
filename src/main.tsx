import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { GlobalStyle } from './GlobalStyle';
import { Global } from '@emotion/react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Global styles={GlobalStyle} />
  </StrictMode>,
);
