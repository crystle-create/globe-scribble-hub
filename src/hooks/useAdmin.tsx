
import { useState, useEffect, createContext, useContext } from 'react';
import { useToast } from "@/hooks/use-toast";
import { auth, isAdminEmail } from "@/lib/firebase";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser
} from "firebase/auth";
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
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const userData = {
          id: firebaseUser.uid,
          email: firebaseUser.email,
          isAdmin: isAdminEmail(firebaseUser.email)
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
    });

    return () => unsubscribe();
  }, [navigate]);

  const signIn = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const isAdmin = isAdminEmail(userCredential.user.email);
      
      toast({
        title: "Welcome back!",
        description: `You've successfully signed in${isAdmin ? " as admin" : ""}`,
      });
      
    } catch (error) {
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
      await createUserWithEmailAndPassword(auth, email, password);
      
      toast({
        title: "Account created!",
        description: `Welcome to CloudiBlog`,
      });
    } catch (error) {
      toast({
        title: "Sign up failed",
        description: "Please try again with different credentials",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    firebaseSignOut(auth).then(() => {
      setUser(null);
      toast({
        title: "Signed out",
        description: "You've been successfully signed out",
      });
      navigate("/");
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

export const useAdmin = () => {
  const { isAdmin, isLoading } = useAuth();
  return { isAdmin, isLoading };
};
