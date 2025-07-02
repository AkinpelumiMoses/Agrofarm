
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, AuthResponse, LoginRequest, SignupRequest, StaffRequest } from '@/types/auth';
import { authApi } from '@/services/api';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  signup: (userData: SignupRequest) => Promise<void>;
   newstaff: (userData: StaffRequest) => Promise<void>;
  logout: () => void;
  isAdmin: boolean;
  isStaff: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';
  const isStaff = user?.role === 'staff';

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      authApi.getProfile()
        .then(setUser)
        .catch(() => {
          localStorage.removeItem('authToken');
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (credentials: LoginRequest) => {
    const response: AuthResponse = await authApi.login(credentials);
    localStorage.setItem('authToken', response.token);
    setUser(response.user);
  };

  const signup = async (userData: SignupRequest) => {
    const response: AuthResponse = await authApi.signup(userData);
    // localStorage.setItem('authToken', response.token);
    // setUser(response.user);
  };

  
  const newstaff = async (userData: StaffRequest) => {
    const response: AuthResponse = await authApi.newstaff(userData);
    // localStorage.setItem('authToken', response.token);
    // setUser(response.user);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    authApi.logout().catch(console.error);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      isAuthenticated,
      login,
      signup,
      logout,
      newstaff,
      isAdmin,
      isStaff,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
