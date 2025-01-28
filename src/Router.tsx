import { createBrowserRouter, Outlet } from 'react-router-dom';
import App from './App';
import AssemblyPage from './pages/AssemblyPage/AssemblyPage';

const router = createBrowserRouter([
  {
    path: '',
    element: (
      <div>
        <Outlet />
      </div>
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
