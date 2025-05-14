
import { useState, useEffect, createContext, useContext } from 'react';
import { useToast } from "@/hooks/use-toast";
import { supabase, isAdminEmail } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";

type User = {
  id: string;
  email: string | null;
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
  const navigate = useNavigate();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          const userData = {
            id: session.user.id,
            email: session.user.email,
            isAdmin: isAdminEmail(session.user.email)
          };
          setUser(userData);
          
          // Redirect admin to dashboard
          if (userData.isAdmin) {
            navigate("/admin/dashboard");
          }
        } else {
          setUser(null);
        }
        setIsLoading(false);
      }
    );

    // Initial session check
    const initializeAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const userData = {
          id: session.user.id,
          email: session.user.email,
          isAdmin: isAdminEmail(session.user.email)
        };
        setUser(userData);
        
        // Redirect admin to dashboard
        if (userData.isAdmin) {
          navigate("/admin/dashboard");
        }
      }
      setIsLoading(false);
    };

    initializeAuth();

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [navigate]);

  const signIn = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      const isAdmin = isAdminEmail(data.user.email);
      
      toast({
        title: "Welcome back!",
        description: `You've successfully signed in${isAdmin ? " as admin" : ""}`,
      });
      
    } catch (error: any) {
      console.error('Error signing in:', error.message);
      toast({
        title: "Authentication failed",
        description: "Please check your credentials and try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/login`
        }
      });
      
      if (error) throw error;
      
      toast({
        title: "Account created!",
        description: "Please check your email for verification instructions",
      });
    } catch (error: any) {
      console.error('Error signing up:', error.message);
      toast({
        title: "Sign up failed",
        description: error.message || "Please try again with different credentials",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('Error signing out:', error.message);
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
      return;
    }
    
    setUser(null);
    toast({
      title: "Signed out",
      description: "You've been successfully signed out",
    });
    navigate("/");
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

export const useAdmin = () => {
  const { isAdmin, isLoading } = useAuth();
  return { isAdmin, isLoading };
};
