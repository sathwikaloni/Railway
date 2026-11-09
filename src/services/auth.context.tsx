import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { storageService } from './storage.service';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (emailOrMobile: string, pass: string) => { success: boolean; message?: string };
  register: (user: Omit<User, 'id' | 'createdAt'>) => { success: boolean; message?: string };
  logout: () => void;
  pendingRedirect: string | null;
  setPendingRedirect: (route: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => storageService.getCurrentUser());
  const [pendingRedirect, setPendingRedirect] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthChange = () => {
      setCurrentUser(storageService.getCurrentUser());
    };
    window.addEventListener('auth-change', handleAuthChange);
    return () => window.removeEventListener('auth-change', handleAuthChange);
  }, []);

  const login = (emailOrMobile: string, pass: string): { success: boolean; message?: string } => {
    const trimmed = emailOrMobile.trim().toLowerCase();
    const users = storageService.getUsers();
    const found = users.find(
      u => (u.email.toLowerCase() === trimmed || u.mobile === trimmed) && u.password === pass
    );

    if (found) {
      storageService.setCurrentUser(found);
      setCurrentUser(found);
      return { success: true };
    }

    return { success: false, message: 'Invalid email/mobile or password' };
  };

  const register = (userData: Omit<User, 'id' | 'createdAt'>): { success: boolean; message?: string } => {
    const users = storageService.getUsers();
    const emailExists = users.some(u => u.email.toLowerCase() === userData.email.trim().toLowerCase());
    if (emailExists) {
      return { success: false, message: 'An account with this email already exists' };
    }

    const mobileExists = users.some(u => u.mobile === userData.mobile.trim());
    if (mobileExists) {
      return { success: false, message: 'An account with this mobile number already exists' };
    }

    const newUser: User = {
      ...userData,
      id: `usr-${Date.now()}`,
      createdAt: new Date().toISOString()
    };

    storageService.saveUser(newUser);
    storageService.setCurrentUser(newUser);
    setCurrentUser(newUser);
    return { success: true };
  };

  const logout = () => {
    storageService.setCurrentUser(null);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        login,
        register,
        logout,
        pendingRedirect,
        setPendingRedirect
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
