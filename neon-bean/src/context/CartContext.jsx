import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext(null);
const STORAGE_KEY = 'neonbean-cart';

/** Load cart from localStorage */
function loadCart() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    /* ignore parse errors */
  }
  return { items: [] };
}

/** Compute totals from items array */
function computeTotals(items) {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return { items, totalItems, totalPrice };
}

/** Cart reducer — handles all cart mutations */
export function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { id, name, size, price, image } = action.payload;
      const key = `${id}-${size}`;
      const existing = state.items.find(
        (item) => item.id === id && item.size === size
      );
      if (existing) {
        const updated = state.items.map((item) =>
          item.id === id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return computeTotals(updated);
      }
      return computeTotals([
        ...state.items,
        { id, name, size, price, image, quantity: 1, key },
      ]);
    }

    case 'REMOVE_ITEM': {
      const { id, size } = action.payload;
      const filtered = state.items.filter(
        (item) => !(item.id === id && item.size === size)
      );
      return computeTotals(filtered);
    }

    case 'UPDATE_QUANTITY': {
      const { id, size, quantity } = action.payload;
      if (quantity <= 0) {
        const filtered = state.items.filter(
          (item) => !(item.id === id && item.size === size)
        );
        return computeTotals(filtered);
      }
      const updated = state.items.map((item) =>
        item.id === id && item.size === size
          ? { ...item, quantity }
          : item
      );
      return computeTotals(updated);
    }

    case 'CLEAR_CART':
      return computeTotals([]);

    default:
      return state;
  }
}

/** Cart provider wrapping the app */
export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(
    cartReducer,
    null,
    () => computeTotals(loadCart().items)
  );

  /* Persist to localStorage on every change */
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ items: cart.items }));
    } catch {
      /* storage full — silent fail */
    }
  }, [cart.items]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

/** Hook to access cart state and dispatch */
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

export default CartContext;
