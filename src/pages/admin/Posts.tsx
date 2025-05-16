
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getPosts } from "@/lib/supabaseDatabase";
import type { BlogPost } from "@/lib/supabaseDatabase";
import { PostsStats } from "@/components/admin/PostsStats";
import { PostsTable } from "@/components/admin/PostsTable";
import { EmptyPostsState } from "@/components/admin/EmptyPostsState";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const postsData = await getPosts();
      setPosts(postsData);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Failed to load posts. Please try again later.");
      toast({
        title: "Error",
        description: "Failed to load posts",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePostUpdate = (updatedPost: BlogPost) => {
    setPosts(posts.map(post => 
      post.id === updatedPost.id ? updatedPost : post
    ));
  };

  const handlePostDelete = (id: string) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  // Stats calculations
  const totalPosts = posts.length;
  const publishedPosts = posts.filter(post => post.published).length;
  const draftPosts = posts.filter(post => !post.published).length;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold font-playfair">Blog Posts</h1>
        <Button asChild>
          <Link to="/admin/posts/new">
            <Plus className="mr-2 h-4 w-4" /> New Post
          </Link>
        </Button>
      </div>
      
      {/* Stats Cards */}
      <PostsStats 
        totalPosts={totalPosts} 
        publishedPosts={publishedPosts} 
        draftPosts={draftPosts} 
      />
      
      {loading ? (
        <div className="rounded-md border p-8">
          <div className="space-y-4">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      ) : error ? (
        <div className="text-center py-16 glass-card bg-red-50 border border-red-100 rounded-md">
          <h2 className="text-xl font-medium text-red-600 mb-4">Failed to load posts</h2>
          <p className="text-gray-500 mb-6">There was an error loading your posts</p>
          <Button onClick={fetchPosts} variant="outline">
            Try Again
          </Button>
        </div>
      ) : posts.length === 0 ? (
        <EmptyPostsState />
      ) : (
        <PostsTable 
          posts={posts} 
          onPostUpdate={handlePostUpdate}
          onPostDelete={handlePostDelete}
        />
      )}
    </div>
  );
}
