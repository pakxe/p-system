import { createBrowserRouter, Outlet } from 'react-router-dom';
import App from './App';
import AssemblyPage from './pages/AssemblyPage/AssemblyPage';
import { ModalProvider } from './hooks/useModal';

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
    ],
  },
]);

export default router;
