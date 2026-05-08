import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';

const CartContext = createContext(null);
const CART_STORAGE_KEY = 'aureus-tread-cart';

function getCartItemKey(item) {
  return [item.id, item.selectedSize || 'default-size', item.selectedColor || 'default-color'].join(
    '__',
  );
}

function readStoredCart() {
  try {
    const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);
    return storedCart ? JSON.parse(storedCart) : [];
  } catch {
    return [];
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const incomingItem = {
        ...action.payload,
        quantity: Math.max(1, action.payload.quantity || 1),
      };
      const incomingKey = getCartItemKey(incomingItem);
      const existingItem = state.items.find((item) => getCartItemKey(item) === incomingKey);

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            getCartItemKey(item) === incomingKey
              ? { ...item, quantity: item.quantity + incomingItem.quantity }
              : item,
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, incomingItem],
      };
    }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter((item) => getCartItemKey(item) !== action.payload),
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map((item) =>
          getCartItemKey(item) === action.payload.key
            ? { ...item, quantity: Math.max(1, action.payload.quantity) }
            : item,
        ),
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] }, () => ({
    items: readStoredCart(),
  }));

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);

  const value = useMemo(() => {
    const subtotal = state.items.reduce(
      (total, item) => total + (item.discountPrice || item.price) * item.quantity,
      0,
    );
    const originalTotal = state.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
    const savings = Math.max(0, originalTotal - subtotal);
    const shipping = subtotal > 0 && subtotal < 250 ? 12 : 0;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;
    const itemCount = state.items.reduce((count, item) => count + item.quantity, 0);

    return {
      cartItems: state.items,
      itemCount,
      subtotal,
      savings,
      shipping,
      tax,
      total,
      addToCart: (item) => dispatch({ type: 'ADD_TO_CART', payload: item }),
      removeFromCart: (key) => dispatch({ type: 'REMOVE_FROM_CART', payload: key }),
      updateQuantity: (key, quantity) =>
        dispatch({ type: 'UPDATE_QUANTITY', payload: { key, quantity } }),
      clearCart: () => dispatch({ type: 'CLEAR_CART' }),
      getCartItemKey,
    };
  }, [state.items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider.');
  }

  return context;
}
