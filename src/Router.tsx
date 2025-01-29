import { createBrowserRouter, Outlet } from 'react-router-dom';
import AssemblyPage from './pages/AssemblyPage/AssemblyPage';
import { ModalProvider } from './hooks/useModal';
import AssemblyDeskPage from './pages/AssemblyPage/AssemblyDeskPage';
import SnoSnowPage from './pages/SnoSnowPage/SnoSnowPage';
import SystemPage from './pages/SystemPage';

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
        element: <SystemPage />,
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
        element: <SnoSnowPage />,
      },
    ],
  },
]);

export default router;
