import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';

import MainLayout from './components/layout/MainLayout.jsx';
import { routes } from './routes.jsx';

function App() {
  const element = useRoutes(routes);

  return (
    <Suspense fallback={null}>
      <MainLayout>{element}</MainLayout>
    </Suspense>
  );
}

export default App;
