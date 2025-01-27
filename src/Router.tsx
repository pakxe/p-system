import { createBrowserRouter, Outlet } from 'react-router-dom';
import App from './App';
import AssemblyPage from './pages/AssemblyPage/AssemblyPage';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

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
        element: (
          <ErrorBoundary FallbackComponent={({ error }) => <div>에러 발생: {error.message}</div>}>
            <Suspense fallback={<div>로딩 중...</div>}>
              <App />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: '/assembly',
        element: <AssemblyPage />,
      },
    ],
  },
]);

export default router;
