
import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { User as SupabaseUser } from '@supabase/supabase-js';

// Define user type
interface User {
  id: string;
  name: string | null;
  email: string | null;
}

// Auth context type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  resendEmailVerification: (email: string) => Promise<void>;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Check if user is logged in on mount and set up subscription
  useEffect(() => {
    // Initial session check
    const fetchUser = async () => {
      setLoading(true);
      
      // Get the current session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        const { id, email } = session.user;
        
        // Get additional user details from profiles table (if needed)
        const { data: profile } = await supabase
          .from('profiles')
          .select('name')
          .eq('id', id)
          .single();
          
        setUser({
          id,
          email,
          name: profile?.name || email?.split('@')[0] || null
        });
      }
      
      setLoading(false);
    };
    
    fetchUser();
    
    // Set up auth subscription
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const { id, email } = session.user;
          
          // Get additional user details from profiles table (if needed)
          const { data: profile } = await supabase
            .from('profiles')
            .select('name')
            .eq('id', id)
            .single();
            
          setUser({
            id,
            email,
            name: profile?.name || email?.split('@')[0] || null
          });
        } else {
          setUser(null);
        }
        
        setLoading(false);
      }
    );
    
    // Cleanup subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Resend email verification
  const resendEmailVerification = async (email: string): Promise<void> => {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email,
    });
    
    if (error) {
      console.error('Error resending verification email:', error.message);
      throw error;
    }
  };

  // Login functionality
  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      console.log('Attempting to login with:', email);
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        console.error('Login error:', error.message);
        return { success: false, error: error.code };
      }
      
      console.log('Login successful:', data);
      return { success: true };
    } catch (error) {
      console.error('Unexpected error during login:', error);
      return { success: false, error: 'unknown_error' };
    }
  };

  // Register functionality
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // First create the user in auth
      const { data: authData, error: signUpError } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: { name }
        }
      });
      
      if (signUpError) {
        console.error('Registration error:', signUpError.message);
        return false;
      }
      
      if (authData?.user) {
        // Create or update profile
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({ 
            id: authData.user.id, 
            name, 
            email,
            updated_at: new Date().toISOString()
          });
          
        if (profileError) {
          console.error('Profile creation error:', profileError.message);
        }
      }
      
      return true;
    } catch (error) {
      console.error('Unexpected error during registration:', error);
      return false;
    }
  };

  // Logout functionality
  const logout = async (): Promise<void> => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        loading, 
        login, 
        register, 
        logout, 
        isAuthenticated: !!user,
        resendEmailVerification,
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
