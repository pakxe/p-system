import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { GlobalStyle } from './GlobalStyle';
import { Global } from '@emotion/react';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Global styles={GlobalStyle} />
  </StrictMode>,
);
