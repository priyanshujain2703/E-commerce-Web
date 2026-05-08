import { lazy, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';

import MainLayout from './components/layout/MainLayout.jsx';
import LoadingSpinner from './components/ui/LoadingSpinner.jsx';
import { routes } from './routes.jsx';

const AuthStateListener = lazy(() => import('./components/auth/AuthStateListener.jsx'));

function App() {
  const element = useRoutes(routes);

  return (
    <Suspense
      fallback={
        <div className="grid min-h-screen place-items-center bg-ink-50">
          <LoadingSpinner label="Loading store" />
        </div>
      }
    >
      <AuthStateListener />
      <MainLayout>{element}</MainLayout>
    </Suspense>
  );
}

export default App;
