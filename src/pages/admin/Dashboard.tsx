
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, FileText, Settings, PlusCircle, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { getPosts } from "@/lib/supabaseDatabase";
import { useToast } from "@/hooks/use-toast";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    recentPosts: 0  // posts created in the last 7 days
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const posts = await getPosts();
        const now = new Date();
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(now.getDate() - 7);

        const totalPosts = posts.length;
        const publishedPosts = posts.filter(post => post.published).length;
        const draftPosts = totalPosts - publishedPosts;
        const recentPosts = posts.filter(post => {
          const postDate = new Date(post.created_at || "");
          return postDate > oneWeekAgo;
        }).length;
        
        setStats({ totalPosts, publishedPosts, draftPosts, recentPosts });
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              <Card className="transition-all duration-300 hover:shadow-md hover:border-green-200">
                <CardHeader className="pb-2">
                  <CardDescription>Published</CardDescription>
                  <CardTitle className="text-3xl">{stats.publishedPosts}</CardTitle>
                </CardHeader>
                <CardContent>
                  <TrendingUp className="text-green-500 h-6 w-6" />
                </CardContent>
                <CardFooter className="pt-1">
                  <p className="text-sm text-gray-500">Live on your site</p>
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
            
            <Link to="/admin/posts" className="block">
              <Card className="transition-all duration-300 hover:shadow-md hover:border-purple-200">
                <CardHeader className="pb-2">
                  <CardDescription>Recent Posts</CardDescription>
                  <CardTitle className="text-3xl">{stats.recentPosts}</CardTitle>
                </CardHeader>
                <CardContent>
                  <BarChart3 className="text-purple-500 h-6 w-6" />
                </CardContent>
                <CardFooter className="pt-1">
                  <p className="text-sm text-gray-500">Added in the last week</p>
                </CardFooter>
              </Card>
            </Link>
          </div>
          
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            
            <Card>
              <CardHeader>
                <CardTitle>Site Settings</CardTitle>
                <CardDescription>Manage your blog configuration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link to="/admin/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Site Settings
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
