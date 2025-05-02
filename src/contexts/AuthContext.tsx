
import React, { createContext, useState, useContext, useEffect } from 'react';

// Define user type
interface User {
  id: string;
  name: string;
  email: string;
}

// Auth context type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Check if user is logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('studiora_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login functionality (mock)
  const login = async (email: string, password: string): Promise<boolean> => {
    // Simple validation
    if (!email || !password) {
      return false;
    }

    // Mock successful login
    const mockUser: User = {
      id: 'user-' + Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0],
      email
    };
    
    setUser(mockUser);
    localStorage.setItem('studiora_user', JSON.stringify(mockUser));
    return true;
  };

  // Register functionality (mock)
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simple validation
    if (!name || !email || !password) {
      return false;
    }

    // Mock successful registration
    const mockUser: User = {
      id: 'user-' + Math.random().toString(36).substr(2, 9),
      name,
      email
    };
    
    setUser(mockUser);
    localStorage.setItem('studiora_user', JSON.stringify(mockUser));
    return true;
  };

  // Logout functionality
  const logout = () => {
    setUser(null);
    localStorage.removeItem('studiora_user');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        login, 
        register, 
        logout, 
        isAuthenticated: !!user 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
