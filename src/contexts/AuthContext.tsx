// Updated AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  User, 
  UserCredential, 
  onAuthStateChanged, 
  signOut,
  getIdToken, 
  signInWithRedirect,
  
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

interface AuthContextType {
  currentUser: User | null;
  idToken: string | null;
  isWhitelisted: boolean;
  whitelistLoading: boolean;
  signInWithGoogle: () => Promise<UserCredential>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [idToken, setIdToken] = useState<string | null>(null);
  const [isWhitelisted, setIsWhitelisted] = useState(false);
  const [whitelistLoading, setWhitelistLoading] = useState(false);
  
  // Check if the user's email is whitelisted
  const checkWhitelisted = async (email: string) => {
    if (!email) return false;
    
    setWhitelistLoading(true);
    try {
      const response = await fetch(
        `https://simple-api-xi-beige.vercel.app/api/whitelist/check/${encodeURIComponent(email)}`
      );
      const data = await response.json();
      setIsWhitelisted(data.whitelisted);
      return data.whitelisted;
    } catch (error) {
      console.error('Error checking whitelist:', error);
      setIsWhitelisted(false);
      return false;
    } finally {
      setWhitelistLoading(false);
    }
  };
  
  // Get user token
  const refreshToken = async (user: User) => {
    try {
      const token = await getIdToken(user, true);
      setIdToken(token);
      return token;
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  };

  // Sign in with Google
  const signInWithGoogle = async (): Promise<UserCredential> => {
    try {
      await signInWithRedirect(auth, googleProvider);
      
      return {} as UserCredential;
    } catch (error) {
      console.error("Error during redirect:", error);
      throw error;
    }
  };
 

  // Sign out
  const logout = (): Promise<void> => {
    setIdToken(null);
    setIsWhitelisted(false);
    return signOut(auth);
  };

  // Set up auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        await refreshToken(user);
        if (user.email) {
          await checkWhitelisted(user.email);
        }
      } else {
        setIdToken(null);
        setIsWhitelisted(false);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Set up token refresh (tokens expire after 1 hour)
  useEffect(() => {
    let refreshInterval: NodeJS.Timeout | null = null;
    
    if (currentUser) {
      refreshInterval = setInterval(() => {
        refreshToken(currentUser);
      }, 55 * 60 * 1000); // Refresh every 55 minutes
    }
    
    return () => {
      if (refreshInterval) clearInterval(refreshInterval);
    };
  }, [currentUser]);

  const value: AuthContextType = {
    currentUser,
    idToken,
    isWhitelisted,
    whitelistLoading,
    signInWithGoogle,
    logout,
    isLoading: loading // Expose loading state to components
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}