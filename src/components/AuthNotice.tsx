
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "./ui/button";
import { AuthModals } from "./auth/AuthModals";
import { useState } from "react";

export function AdminOnlyAlert() {
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

  return (
    <Alert className="border-blue-300/40 bg-blue-100/20">
      <AlertCircle className="h-4 w-4 text-blue-500" />
      <AlertTitle className="text-blue-600">Admin Only Feature</AlertTitle>
      <AlertDescription className="text-gray-600">
        <p className="mb-2">Blog posting is restricted to admin users only. Regular users can read and comment on posts.</p>
        <div className="flex flex-wrap gap-2 mt-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={openLoginModal}
            className="border-blue-200 hover:border-blue-300 hover:bg-blue-50"
          >
            Login
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={openSignupModal}
            className="border-blue-200 hover:border-blue-300 hover:bg-blue-50"
          >
            Sign Up
          </Button>
        </div>
      </AlertDescription>
      
      <AuthModals 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        initialMode={modalMode} 
      />
    </Alert>
  );
}
