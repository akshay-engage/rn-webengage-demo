import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type {Product} from '../data/catalog';

const STORAGE_KEY = '@recharge_demo/cart';

export interface CartLine {
  product: Product;
  quantity: number;
}

interface CartContextValue {
  lines: CartLine[];
  /** Total number of individual units across all lines. */
  itemCount: number;
  /** Sum of price * quantity across all lines. */
  total: number;
  /** Add a product; if it already exists, increment its quantity. */
  addToCart: (product: Product) => void;
  /** Increase the quantity of an existing line by one. */
  increment: (productId: string) => void;
  /** Decrease quantity by one; removes the line when it reaches zero. */
  decrement: (productId: string) => void;
  /** Remove a line entirely. */
  removeLine: (productId: string) => void;
  /** Empty the cart. */
  clear: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({children}: {children: React.ReactNode}) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrating, setHydrating] = useState(true);

  // Rehydrate persisted cart on launch.
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (mounted && stored) {
          setLines(JSON.parse(stored) as CartLine[]);
        }
      } catch {
        // Ignore corrupt state and start empty.
      } finally {
        if (mounted) {
          setHydrating(false);
        }
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Persist cart whenever it changes (after hydration).
  useEffect(() => {
    if (hydrating) {
      return;
    }
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(lines)).catch(() => {});
  }, [lines, hydrating]);

  const addToCart = useCallback((product: Product) => {
    setLines(prev => {
      const existing = prev.find(l => l.product.id === product.id);
      if (existing) {
        return prev.map(l =>
          l.product.id === product.id
            ? {...l, quantity: l.quantity + 1}
            : l,
        );
      }
      return [...prev, {product, quantity: 1}];
    });
  }, []);

  const increment = useCallback((productId: string) => {
    setLines(prev =>
      prev.map(l =>
        l.product.id === productId ? {...l, quantity: l.quantity + 1} : l,
      ),
    );
  }, []);

  const decrement = useCallback((productId: string) => {
    setLines(prev =>
      prev
        .map(l =>
          l.product.id === productId ? {...l, quantity: l.quantity - 1} : l,
        )
        .filter(l => l.quantity > 0),
    );
  }, []);

  const removeLine = useCallback((productId: string) => {
    setLines(prev => prev.filter(l => l.product.id !== productId));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const itemCount = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity, 0),
    [lines],
  );

  const total = useMemo(
    () => lines.reduce((sum, l) => sum + l.product.price * l.quantity, 0),
    [lines],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      itemCount,
      total,
      addToCart,
      increment,
      decrement,
      removeLine,
      clear,
    }),
    [lines, itemCount, total, addToCart, increment, decrement, removeLine, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
}
