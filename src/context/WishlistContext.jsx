import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';

const WishlistContext = createContext(null);
const WISHLIST_STORAGE_KEY = 'aureus-tread-wishlist';

function readStoredWishlist() {
  try {
    const storedWishlist = window.localStorage.getItem(WISHLIST_STORAGE_KEY);
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  } catch {
    return [];
  }
}

function wishlistReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_WISHLIST': {
      const exists = state.items.some((item) => item.id === action.payload.id);

      if (exists) {
        return state;
      }

      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }
    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case 'TOGGLE_WISHLIST': {
      const exists = state.items.some((item) => item.id === action.payload.id);

      return {
        ...state,
        items: exists
          ? state.items.filter((item) => item.id !== action.payload.id)
          : [...state.items, action.payload],
      };
    }
    case 'CLEAR_WISHLIST':
      return { ...state, items: [] };
    default:
      return state;
  }
}

export function WishlistProvider({ children }) {
  const [state, dispatch] = useReducer(wishlistReducer, { items: [] }, () => ({
    items: readStoredWishlist(),
  }));

  useEffect(() => {
    window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);

  const value = useMemo(
    () => ({
      wishlistItems: state.items,
      wishlistCount: state.items.length,
      addToWishlist: (product) =>
        dispatch({ type: 'ADD_TO_WISHLIST', payload: product }),
      removeFromWishlist: (productId) =>
        dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId }),
      toggleWishlist: (product) =>
        dispatch({ type: 'TOGGLE_WISHLIST', payload: product }),
      clearWishlist: () => dispatch({ type: 'CLEAR_WISHLIST' }),
      isWishlisted: (productId) => state.items.some((item) => item.id === productId),
    }),
    [state.items],
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider.');
  }

  return context;
}
