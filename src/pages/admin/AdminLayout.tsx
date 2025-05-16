
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAdmin";
import { LogOut, Home, LayoutDashboard, FileText, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function AdminLayout() {
  const { signOut } = useAuth();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col fixed inset-y-0">
        <div className="flex flex-col flex-grow pt-5 bg-white border-r border-gray-100 overflow-y-auto">
          <div className="px-4 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="relative">
                <div className="h-8 w-8 bg-blue-400 rounded-full flex items-center justify-center">
                  <div className="h-5 w-5 bg-yellow-300 rounded-full absolute -right-1 top-0"></div>
                </div>
              </div>
              <span className="text-xl font-bold font-playfair text-gray-800">CloudiBlog</span>
            </Link>
          </div>
          
          <nav className="mt-12 flex-1 px-2 space-y-1">
            <Link to="/admin/dashboard">
              <Button 
                variant={isActive("/admin/dashboard") ? "default" : "ghost"} 
                className="w-full justify-start"
              >
                <LayoutDashboard className="mr-3 h-5 w-5" />
                Dashboard
              </Button>
            </Link>
            <Link to="/admin/posts">
              <Button 
                variant={isActive("/admin/posts") ? "default" : "ghost"} 
                className="w-full justify-start"
              >
                <FileText className="mr-3 h-5 w-5" />
                Posts
              </Button>
            </Link>
            <Link to="/admin/settings">
              <Button 
                variant={isActive("/admin/settings") ? "default" : "ghost"} 
                className="w-full justify-start"
              >
                <Settings className="mr-3 h-5 w-5" />
                Settings
              </Button>
            </Link>
            
            {/* View Site Button - Clearly labeled and prominent */}
            <Link to="/">
              <Button 
                variant="outline"
                className="w-full justify-start text-blue-500 hover:text-blue-600 hover:bg-blue-50"
              >
                <Home className="mr-3 h-5 w-5" />
                View Site
              </Button>
            </Link>
          </nav>
          
          <div className="p-4">
            <Button variant="ghost" className="w-full justify-start text-red-500" onClick={signOut}>
              <LogOut className="mr-3 h-5 w-5" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile sidebar */}
      <div className="md:hidden bg-white border-b border-gray-100">
        <div className="flex items-center justify-between p-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="relative">
              <div className="h-8 w-8 bg-blue-400 rounded-full flex items-center justify-center">
                <div className="h-5 w-5 bg-yellow-300 rounded-full absolute -right-1 top-0"></div>
              </div>
            </div>
            <span className="text-xl font-bold font-playfair text-gray-800">CloudiBlog</span>
          </Link>
          
          <div className="flex space-x-2">
            <Link to="/">
              <Button variant="outline" size="sm" className="text-blue-500">
                <Home className="h-5 w-5" />
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <div className="flex justify-around border-t">
          <Link to="/admin/dashboard" className="flex-1 text-center py-3">
            <LayoutDashboard className={`mx-auto h-5 w-5 ${isActive("/admin/dashboard") ? "text-blue-500" : "text-gray-500"}`} />
            <span className="text-xs block mt-1">Dashboard</span>
          </Link>
          <Link to="/admin/posts" className="flex-1 text-center py-3">
            <FileText className={`mx-auto h-5 w-5 ${isActive("/admin/posts") ? "text-blue-500" : "text-gray-500"}`} />
            <span className="text-xs block mt-1">Posts</span>
          </Link>
          <Link to="/admin/settings" className="flex-1 text-center py-3">
            <Settings className={`mx-auto h-5 w-5 ${isActive("/admin/settings") ? "text-blue-500" : "text-gray-500"}`} />
            <span className="text-xs block mt-1">Settings</span>
          </Link>
        </div>
      </div>
      
      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        <main className="flex-1 px-4 py-8 md:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
