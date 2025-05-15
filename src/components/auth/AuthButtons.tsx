
import { useState } from "react";
import { useAuth } from "@/hooks/useAdmin";
import { Button } from "@/components/ui/button";
import { AuthModals } from "@/components/auth/AuthModals";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";

export function AuthButtons() {
  const { user, signOut } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"login" | "signup">("login");

  const openLoginModal = () => {
    setModalMode("login");
    setAuthModalOpen(true);
  };

  const openSignupModal = () => {
    setModalMode("signup");
    setAuthModalOpen(true);
  };

  if (user) {
    return (
      <div className="flex items-center space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="text-gray-600 flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden md:inline truncate max-w-[150px]">
                {user.email.split('@')[0]}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white shadow-md border border-gray-100">
            {user.isAdmin && (
              <DropdownMenuItem
                className="text-blue-600 hover:text-blue-700 cursor-pointer"
                asChild
              >
                <a href="/admin/dashboard">Dashboard</a>
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              className="text-gray-700 hover:text-gray-900 cursor-pointer"
              onClick={signOut}
            >
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return (
    <>
      <div className="hidden md:flex items-center space-x-4">
        <Button 
          variant="ghost" 
          onClick={openLoginModal} 
          className="text-gray-600 hover:text-blue-500 hover:bg-blue-50"
        >
          Log In
        </Button>
        <Button 
          variant="default" 
          onClick={openSignupModal}
          className="bg-blue-400 hover:bg-blue-500 text-white"
        >
          Join Us
        </Button>
      </div>
      
      <div className="md:hidden">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={openLoginModal}
          className="text-gray-600"
        >
          <User className="h-5 w-5" />
        </Button>
      </div>

      <AuthModals 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        initialMode={modalMode}
      />
    </>
  );
}
