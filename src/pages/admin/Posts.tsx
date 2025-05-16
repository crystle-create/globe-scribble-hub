
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

export default function AdminPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const postsData = await getPosts();
      setPosts(postsData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      toast({
        title: "Error",
        description: "Failed to load posts",
        variant: "destructive",
      });
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
        <div className="flex justify-center py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-52"></div>
            <div className="h-4 bg-gray-200 rounded w-72"></div>
            <div className="h-4 bg-gray-200 rounded w-64"></div>
          </div>
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
