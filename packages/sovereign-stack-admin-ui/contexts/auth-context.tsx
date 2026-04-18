import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export interface User {
  id: string;
  username: string;
  email: string;
  is_admin?: boolean;
}

export interface AuthConfig {
  storageKey: string;
  apiUrl?: string;
  demoCredentials?: { username: string; password: string; email: string };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refetch: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
  children,
  config,
}: {
  children: ReactNode;
  config: AuthConfig;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    if (config.apiUrl) {
      // Real API auth (vibe pattern)
      try {
        const response = await fetch(`${config.apiUrl}/api/me`, {
          credentials: 'include',
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      }
    } else {
      // localStorage demo auth (spectrum, pythia, pcg pattern)
      const storedUser = localStorage.getItem(config.storageKey);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (username: string, password: string) => {
    if (config.apiUrl) {
      // Real API login
      const response = await fetch(`${config.apiUrl}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        throw new Error('Invalid credentials');
      }
      const userData = await response.json();
      setUser(userData);
    } else if (config.demoCredentials) {
      // Demo login with credential validation
      if (
        username === config.demoCredentials.username &&
        password === config.demoCredentials.password
      ) {
        const userData: User = {
          id: '1',
          username,
          email: config.demoCredentials.email,
          is_admin: true,
        };
        setUser(userData);
        localStorage.setItem(config.storageKey, JSON.stringify(userData));
      } else {
        throw new Error('Invalid credentials');
      }
    } else {
      // Open demo login (spectrum pattern - any credentials accepted)
      if (username && password) {
        const userData: User = {
          id: '1',
          username,
          email: `${username}@admin.local`,
          is_admin: true,
        };
        setUser(userData);
        localStorage.setItem(config.storageKey, JSON.stringify(userData));
      } else {
        throw new Error('Username and password required');
      }
    }
  };

  const logout = async () => {
    if (config.apiUrl) {
      try {
        await fetch(`${config.apiUrl}/api/logout`, {
          method: 'POST',
          credentials: 'include',
        });
      } catch {
        // Proceed with local logout even if API call fails
      }
    }
    setUser(null);
    localStorage.removeItem(config.storageKey);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refetch: fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
