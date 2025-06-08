
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { getPosts } from "@/lib/supabaseDatabase";
import { useToast } from "@/hooks/use-toast";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalPosts: 0,
    draftPosts: 0
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const posts = await getPosts();
        
        const totalPosts = posts.length;
        const draftPosts = posts.filter(post => !post.published).length;
        
        setStats({ totalPosts, draftPosts });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast({
          title: "Error",
          description: "Failed to load dashboard data",
          variant: "destructive",
        });
        setLoading(false);
      }
    };
    
    fetchStats();
  }, [toast]);

  return (
    <div>
      <h1 className="text-3xl font-bold font-playfair mb-6">Dashboard</h1>
      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-16"></div>
              </CardHeader>
              <CardContent className="h-12"></CardContent>
              <CardFooter className="pt-1">
                <div className="h-4 bg-gray-200 rounded w-32"></div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link to="/admin/posts" className="block">
              <Card className="transition-all duration-300 hover:shadow-md hover:border-blue-200">
                <CardHeader className="pb-2">
                  <CardDescription>Total Posts</CardDescription>
                  <CardTitle className="text-3xl">{stats.totalPosts}</CardTitle>
                </CardHeader>
                <CardContent>
                  <FileText className="text-blue-500 h-6 w-6" />
                </CardContent>
                <CardFooter className="pt-1">
                  <p className="text-sm text-gray-500">Manage all your posts</p>
                </CardFooter>
              </Card>
            </Link>
            
            <Link to="/admin/posts" className="block">
              <Card className="transition-all duration-300 hover:shadow-md hover:border-amber-200">
                <CardHeader className="pb-2">
                  <CardDescription>Drafts</CardDescription>
                  <CardTitle className="text-3xl">{stats.draftPosts}</CardTitle>
                </CardHeader>
                <CardContent>
                  <FileText className="text-amber-500 h-6 w-6" />
                </CardContent>
                <CardFooter className="pt-1">
                  <p className="text-sm text-gray-500">Ready to publish</p>
                </CardFooter>
              </Card>
            </Link>
          </div>
          
          {/* Quick Actions */}
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Create New Content</CardTitle>
                <CardDescription>Add new posts to your blog</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button asChild className="w-full justify-start">
                  <Link to="/admin/posts/new">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Write New Post
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
