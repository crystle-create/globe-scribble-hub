
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    recentPost: ""
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const postsRef = collection(db, "posts");
        const postsSnapshot = await getDocs(postsRef);
        const totalPosts = postsSnapshot.size;
        
        const publishedQuery = query(postsRef, where("published", "==", true));
        const publishedSnapshot = await getDocs(publishedQuery);
        const publishedPosts = publishedSnapshot.size;
        
        const draftPosts = totalPosts - publishedPosts;
        
        const recentPostQuery = query(postsRef, orderBy("updatedAt", "desc"));
        const recentPostSnapshot = await getDocs(recentPostQuery);
        const recentPost = recentPostSnapshot.docs[0]?.data().title || "No posts yet";
        
        setStats({
          totalPosts,
          publishedPosts,
          draftPosts,
          recentPost
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
      
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Quick Summary</CardTitle>
          <CardDescription>At a glance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p><span className="font-medium">Most Recent Post:</span> {stats.recentPost}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
