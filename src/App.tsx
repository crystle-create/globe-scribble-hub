
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./hooks/useAdmin";
import Index from "./pages/Index";
import BlogPost from "./pages/BlogPost";
import Categories from "./pages/Categories";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Admin pages
import AdminLayout from "./pages/admin/AdminLayout";
import AdminPosts from "./pages/admin/Posts";
import PostEditor from "./pages/admin/PostEditor";
import AdminSettings from "./pages/admin/Settings";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <LanguageProvider>
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <Routes>
                {/* Main site routes */}
                <Route element={<Layout />}>
                  <Route path="/" element={<Index />} />
                  <Route path="/post/:id" element={<BlogPost />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                </Route>
                
                {/* Admin routes - protected and require admin */}
                <Route element={<ProtectedRoute requireAdmin />}>
                  <Route element={<AdminLayout />}>
                    <Route path="/admin" element={<Navigate to="/admin/posts" replace />} />
                    <Route path="/admin/posts" element={<AdminPosts />} />
                    <Route path="/admin/posts/new" element={<PostEditor />} />
                    <Route path="/admin/posts/edit/:id" element={<PostEditor />} />
                    <Route path="/admin/settings" element={<AdminSettings />} />
                  </Route>
                </Route>
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </TooltipProvider>
          </AuthProvider>
        </LanguageProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
