import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@recharge_demo/auth';

export interface AuthState {
  /** True once the user has logged in with a name or continued as guest. */
  isAuthenticated: boolean;
  /** The typed name, or null when browsing as a guest. */
  name: string | null;
  /** True when the user chose "Skip login". */
  isGuest: boolean;
}

interface AuthContextValue extends AuthState {
  /** True until the persisted state has been rehydrated from storage. */
  hydrating: boolean;
  /** Log in with a display name. */
  login: (name: string) => void;
  /** Continue without a name (guest). */
  loginAsGuest: () => void;
  /** Clear auth and return to a logged-out state. */
  logout: () => void;
}

const initialState: AuthState = {
  isAuthenticated: false,
  name: null,
  isGuest: false,
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({children}: {children: React.ReactNode}) {
  const [state, setState] = useState<AuthState>(initialState);
  const [hydrating, setHydrating] = useState(true);

  // Rehydrate persisted auth state on launch.
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (mounted && stored) {
          const parsed = JSON.parse(stored) as AuthState;
          setState(parsed);
        }
      } catch {
        // Ignore corrupt/missing state and start logged out.
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

  // Persist auth state whenever it changes (after hydration).
  useEffect(() => {
    if (hydrating) {
      return;
    }
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state)).catch(() => {});
  }, [state, hydrating]);

  const login = useCallback((name: string) => {
    const trimmed = name.trim();
    setState({
      isAuthenticated: true,
      name: trimmed.length > 0 ? trimmed : null,
      isGuest: trimmed.length === 0,
    });
  }, []);

  const loginAsGuest = useCallback(() => {
    setState({isAuthenticated: true, name: null, isGuest: true});
  }, []);

  const logout = useCallback(() => {
    setState(initialState);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({...state, hydrating, login, loginAsGuest, logout}),
    [state, hydrating, login, loginAsGuest, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
