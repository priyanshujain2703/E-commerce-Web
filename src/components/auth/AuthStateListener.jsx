import { useEffect } from 'react';

import { useStore } from '../../context/StoreContext.jsx';
import { subscribeToAuthChanges } from '../../firebase/auth.js';
import { mapAuthUser } from '../../utils/authUser.js';

function AuthStateListener() {
  const { dispatch } = useStore();

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((user) => {
      dispatch({ type: 'SET_USER', payload: mapAuthUser(user) });
    });

    return unsubscribe;
  }, [dispatch]);

  return null;
}

export default AuthStateListener;
