import { useEffect } from 'react';

import { useStore } from '../../context/StoreContext.jsx';
// import { subscribeToAuthChanges } from '../../firebase/auth.js';
// import { mapAuthUser } from '../../utils/authUser.js';

function AuthStateListener() {
  const { dispatch } = useStore();

  useEffect(() => {
    // Temporarily bypass Firebase auth to fix white screen
    // Uncomment the Firebase code below when credentials are verified
    dispatch({ type: 'SET_USER', payload: null });

    /*
    const unsubscribe = subscribeToAuthChanges((user) => {
      dispatch({ type: 'SET_USER', payload: mapAuthUser(user) });
    });

    return unsubscribe;
    */
  }, [dispatch]);

  return null;
}

export default AuthStateListener;
