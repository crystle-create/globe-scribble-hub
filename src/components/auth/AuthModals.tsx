
import { useState } from "react";
import { useAuth } from "@/hooks/useAdmin";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type AuthMode = "login" | "signup";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: AuthMode;
}

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const signupSchema = loginSchema.extend({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

export function AuthModals({ isOpen, onClose, initialMode = "login" }: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, signUp, isLoading } = useAuth();

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleLoginSubmit = async (data: LoginFormValues) => {
    await signIn(data.email, data.password);
    onClose();
  };

  const handleSignupSubmit = async (data: SignupFormValues) => {
    await signUp(data.email, data.password);
    onClose();
  };

  const toggleMode = () => {
    setMode(mode === "login" ? "signup" : "login");
    loginForm.reset();
    signupForm.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md rounded-lg border-none bg-gradient-to-br from-sky-50 to-blue-100 p-6 shadow-lg animate-slide-up">
        <DialogHeader className="relative">
          <DialogTitle className="text-center font-playfair text-2xl text-gray-800">
            {mode === "login" ? "Welcome Back" : "Join CloudiBlog"}
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            {mode === "login" 
              ? "Sign in to continue to your account" 
              : "Create an account to get started"}
          </DialogDescription>
        </DialogHeader>

        <div className={`transition-all duration-300 ${mode === 'login' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[-30px] hidden'}`}>
          {mode === "login" && (
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(handleLoginSubmit)} className="space-y-4">
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="your.email@example.com" 
                          {...field} 
                          className="bg-white/70 border-blue-200 focus-visible:ring-blue-300 transition-all duration-300 focus:translate-y-[-2px]" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            {...field}
                            className="bg-white/70 border-blue-200 focus-visible:ring-blue-300 pr-10 transition-all duration-300 focus:translate-y-[-2px]"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 text-gray-500 transition-colors duration-300 hover:text-gray-800"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button
                  type="submit"
                  className="w-full bg-blue-400 hover:bg-blue-500 text-white font-medium transition-all duration-300 hover:shadow-md"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Log In"}
                </Button>
              </form>
            </Form>
          )}
        </div>

        <div className={`transition-all duration-300 ${mode === 'signup' ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-[30px] hidden'}`}>
          {mode === "signup" && (
            <Form {...signupForm}>
              <form onSubmit={signupForm.handleSubmit(handleSignupSubmit)} className="space-y-4">
                <FormField
                  control={signupForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Full Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="John Doe" 
                          {...field} 
                          className="bg-white/70 border-blue-200 focus-visible:ring-blue-300 transition-all duration-300 focus:translate-y-[-2px]" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={signupForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="your.email@example.com" 
                          {...field} 
                          className="bg-white/70 border-blue-200 focus-visible:ring-blue-300 transition-all duration-300 focus:translate-y-[-2px]" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={signupForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            {...field}
                            className="bg-white/70 border-blue-200 focus-visible:ring-blue-300 pr-10 transition-all duration-300 focus:translate-y-[-2px]"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute right-0 top-0 h-full px-3 text-gray-500 transition-colors duration-300 hover:text-gray-800"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button
                  type="submit"
                  className="w-full bg-blue-400 hover:bg-blue-500 text-white font-medium transition-all duration-300 hover:shadow-md"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Sign Up"}
                </Button>
              </form>
            </Form>
          )}
        </div>
        
        <div className="mt-4 text-center text-sm">
          <p className="text-gray-600">
            {mode === "login" ? "Don't have an account?" : "Already have an account?"}
            <Button 
              variant="link" 
              className="text-blue-500 font-medium p-0 h-auto ml-1 transition-all duration-300 hover:text-blue-700" 
              onClick={toggleMode}
            >
              {mode === "login" ? "Sign up" : "Log in"}
            </Button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
