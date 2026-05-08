import { createContext, useContext, useMemo, useReducer } from 'react';

const StoreContext = createContext(null);

const initialState = {
  cart: [],
  user: null,
  shopFilters: {
    search: '',
    category: 'All',
    maxPrice: 300,
    sortBy: 'newest',
  },
};

function storeReducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'ADD_TO_CART':
      return { ...state, cart: [...state.cart, action.payload] };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    case 'CLEAR_CART':
      return { ...state, cart: [] };
    case 'SET_SHOP_FILTER':
      return {
        ...state,
        shopFilters: {
          ...state.shopFilters,
          [action.payload.name]: action.payload.value,
        },
      };
    case 'RESET_SHOP_FILTERS':
      return {
        ...state,
        shopFilters: initialState.shopFilters,
      };
    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(storeReducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error('useStore must be used within a StoreProvider.');
  }

  return context;
}
