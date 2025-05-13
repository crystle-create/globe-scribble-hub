
import { useState, useEffect, createContext, useContext } from 'react';
import { useToast } from "@/hooks/use-toast";

type User = {
  id: string;
  email: string;
  isAdmin: boolean;
} | null;

type AuthContextType = {
  user: User;
  isLoading: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Simulate checking for stored user on page load
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('cloudiblog-user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } catch (error) {
          console.error("Failed to parse stored user", error);
          localStorage.removeItem('cloudiblog-user');
        }
      }
      setIsLoading(false);
    };

    // Short timeout to simulate network request
    const timer = setTimeout(checkAuth, 500);
    return () => clearTimeout(timer);
  }, []);

  const signIn = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    try {
      // In a real app, this would call an authentication API
      // For demo, we simulate a successful login after a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simple validation (in real app, this would be done securely on the backend)
      if (password.length < 6) {
        throw new Error("Invalid credentials");
      }
      
      const newUser = {
        id: `user_${Date.now()}`,
        email,
        isAdmin: email.includes('admin'),  // Simple demo rule: emails with "admin" are admins
      };

      setUser(newUser);
      localStorage.setItem('cloudiblog-user', JSON.stringify(newUser));
      
      toast({
        title: "Welcome back!",
        description: `You've successfully signed in as ${email}`,
      });
    } catch (error) {
      toast({
        title: "Authentication failed",
        description: error instanceof Error ? error.message : "Please check your credentials and try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    try {
      // In a real app, this would call an API to create a user
      // For demo, we simulate a successful signup after a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }
      
      const newUser = {
        id: `user_${Date.now()}`,
        email,
        isAdmin: false,  // New users are never admins by default
      };

      setUser(newUser);
      localStorage.setItem('cloudiblog-user', JSON.stringify(newUser));
      
      toast({
        title: "Account created!",
        description: `Welcome to CloudiBlog, ${email}`,
      });
    } catch (error) {
      toast({
        title: "Sign up failed",
        description: error instanceof Error ? error.message : "Please try again with different credentials",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    localStorage.removeItem('cloudiblog-user');
    setUser(null);
    toast({
      title: "Signed out",
      description: "You've been successfully signed out",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAdmin: !!user?.isAdmin,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Legacy useAdmin hook for compatibility
export const useAdmin = () => {
  const { isAdmin, isLoading } = useAuth();
  return { isAdmin, isLoading };
};
