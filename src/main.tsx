import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';
import App from './App';
import { GlobalStyle } from './GlobalStyle';
import { Global } from '@emotion/react';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SnowBallPAge from './pages/SnowBallPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/snow-ball' element={<SnowBallPAge />} />
      </Routes>
    </BrowserRouter>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Global styles={GlobalStyle} />
    <Router />
  </StrictMode>,
);
