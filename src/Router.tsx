import { createBrowserRouter, Outlet } from 'react-router-dom';
import App from './App';
import AssemblyPage from './pages/AssemblyPage/AssemblyPage';
import { ModalProvider } from './hooks/useModal';
import AssemblyDeskPage from './pages/AssemblyPage/AssemblyDeskPage';
import SnowBallPage from './pages/SnowBallPage';

const router = createBrowserRouter([
  {
    path: '',
    element: (
      <ModalProvider>
        <Outlet />
      </ModalProvider>
    ),
    children: [
      {
        path: '/',
        element: <App />,
      },
      {
        path: '/assembly',
        element: <AssemblyPage />,
      },
      {
        path: '/assembly/desk',
        element: <AssemblyDeskPage />,
      },
      {
        path: '/snosnow',
        element: <SnowBallPage />,
      },
    ],
  },
]);

export default router;
