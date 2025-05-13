
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export function AdminOnlyAlert() {
  return (
    <Alert className="border-blog-indigo/40 bg-blog-indigo/10">
      <AlertCircle className="h-4 w-4 text-blog-indigo" />
      <AlertTitle className="text-blog-indigo">Admin Only Feature</AlertTitle>
      <AlertDescription className="text-gray-600">
        <p className="mb-2">Blog posting is restricted to admin users only. Regular users can read and comment on posts.</p>
        <div className="flex flex-wrap gap-2 mt-2">
          <Link to="/login">
            <Button variant="outline" size="sm">
              Login
            </Button>
          </Link>
          <Link to="/signup">
            <Button variant="outline" size="sm">
              Sign Up
            </Button>
          </Link>
        </div>
      </AlertDescription>
    </Alert>
  );
}
