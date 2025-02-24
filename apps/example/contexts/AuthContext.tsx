import { createContext, useContext, useEffect, useState } from 'react';

import { FirebaseAuthService } from '../services/authentication/FirebaseAuthService';
import { User } from '../types/User';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, name: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = FirebaseAuthService.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const user = await FirebaseAuthService.login(email, password);
      setUser(user);
    } catch (error) {
      throw error;
    }
  };

  const register = async (email: string, name: string, password: string) => {
    try {
      const user = await FirebaseAuthService.register(email, name, password);
      setUser(user);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await FirebaseAuthService.logout();
      setUser(null);
    } catch (error) {
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      const user = await FirebaseAuthService.loginWithGoogle();
      setUser(user);
    } catch (error) {
      throw error;
    }
  };

  const resetPassword = async (email: string) => {
    await FirebaseAuthService.resetPassword(email);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    loginWithGoogle,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
