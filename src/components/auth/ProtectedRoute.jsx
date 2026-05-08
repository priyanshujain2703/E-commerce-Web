import { Navigate, useLocation } from 'react-router-dom';

import { useStore } from '../../context/StoreContext.jsx';
import LoadingSpinner from '../ui/LoadingSpinner.jsx';

function ProtectedRoute({ children }) {
  const location = useLocation();
  const { state } = useStore();

  if (state.authLoading) {
    return (
      <section className="page-shell grid min-h-[50vh] place-items-center py-16">
        <LoadingSpinner label="Checking access" />
      </section>
    );
  }

  if (!state.user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

export default ProtectedRoute;
