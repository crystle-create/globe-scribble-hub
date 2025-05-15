
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getPosts } from "@/lib/supabaseDatabase";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const posts = await getPosts();
        const totalPosts = posts.length;
        const publishedPosts = posts.filter(post => post.published).length;
        const draftPosts = totalPosts - publishedPosts;
        
        setStats({
          totalPosts,
          publishedPosts,
          draftPosts,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold font-playfair mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Posts</CardTitle>
            <CardDescription>All blog posts</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.totalPosts}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Published</CardTitle>
            <CardDescription>Visible to readers</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.publishedPosts}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Drafts</CardTitle>
            <CardDescription>Work in progress</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stats.draftPosts}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
