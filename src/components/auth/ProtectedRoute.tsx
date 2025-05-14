
import { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAdmin';

type ProtectedRouteProps = {
  requireAdmin?: boolean;
  redirectPath?: string;
};

export default function ProtectedRoute({
  requireAdmin = false,
  redirectPath = '/login',
}: ProtectedRouteProps) {
  const { user, isAdmin, isLoading } = useAuth();
  const location = useLocation();

  // If loading, we can show a loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-blue-200"></div>
          <div className="h-4 w-48 bg-blue-200 rounded"></div>
        </div>
      </div>
    );
  }
  
  // Check if user is authenticated
  if (!user) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }
  
  // If admin is required but user is not admin
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // If all conditions pass, render the child routes
  return <Outlet />;
}
