
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getPosts, getDraftPosts } from "@/lib/supabaseDatabase";
import type { BlogPost } from "@/lib/supabaseDatabase";
import { PostsStats } from "@/components/admin/PostsStats";
import { PostsTable } from "@/components/admin/PostsTable";
import { EmptyPostsState } from "@/components/admin/EmptyPostsState";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [draftPosts, setDraftPosts] = useState<BlogPost[]>([]);
  const [publishedPosts, setPublishedPosts] = useState<BlogPost[]>([]);
  const [activeTab, setActiveTab] = useState("all");
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
      
      // Fetch all posts
      const allPosts = await getPosts();
      setPosts(allPosts);
      
      // Fetch draft posts
      const drafts = allPosts.filter(post => !post.published);
      setDraftPosts(drafts);
      
      // Set published posts
      const published = allPosts.filter(post => post.published);
      setPublishedPosts(published);
      
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
    // Update in all posts list
    setPosts(posts.map(post => 
      post.id === updatedPost.id ? updatedPost : post
    ));
    
    // Update in drafts list if applicable
    if (!updatedPost.published) {
      setDraftPosts(prev => {
        const exists = prev.some(p => p.id === updatedPost.id);
        if (exists) {
          return prev.map(p => p.id === updatedPost.id ? updatedPost : p);
        } else {
          return [...prev, updatedPost];
        }
      });
      setPublishedPosts(prev => prev.filter(p => p.id !== updatedPost.id));
    } else {
      // Update in published list if applicable
      setPublishedPosts(prev => {
        const exists = prev.some(p => p.id === updatedPost.id);
        if (exists) {
          return prev.map(p => p.id === updatedPost.id ? updatedPost : p);
        } else {
          return [...prev, updatedPost];
        }
      });
      setDraftPosts(prev => prev.filter(p => p.id !== updatedPost.id));
    }
  };

  const handlePostDelete = (id: string) => {
    setPosts(posts.filter(post => post.id !== id));
    setDraftPosts(draftPosts.filter(post => post.id !== id));
    setPublishedPosts(publishedPosts.filter(post => post.id !== id));
  };

  // Stats calculations
  const totalPosts = posts.length;
  const publishedCount = publishedPosts.length;
  const draftCount = draftPosts.length;

  const renderContent = (postsList: BlogPost[]) => {
    if (loading) {
      return (
        <div className="rounded-md border p-8">
          <div className="space-y-4">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="text-center py-16 glass-card bg-red-50 border border-red-100 rounded-md">
          <h2 className="text-xl font-medium text-red-600 mb-4">Failed to load posts</h2>
          <p className="text-gray-500 mb-6">There was an error loading your posts</p>
          <Button onClick={fetchPosts} variant="outline">
            Try Again
          </Button>
        </div>
      );
    }
    
    if (postsList.length === 0) {
      return <EmptyPostsState />;
    }
    
    return (
      <PostsTable 
        posts={postsList} 
        onPostUpdate={handlePostUpdate}
        onPostDelete={handlePostDelete}
      />
    );
  };

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
        publishedPosts={publishedCount} 
        draftPosts={draftCount} 
      />
      
      {/* Tabs for different post views */}
      <Tabs 
        defaultValue="all" 
        className="mt-6"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Posts ({totalPosts})</TabsTrigger>
          <TabsTrigger value="published">Published ({publishedCount})</TabsTrigger>
          <TabsTrigger value="drafts">Drafts ({draftCount})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          {renderContent(posts)}
        </TabsContent>
        
        <TabsContent value="published">
          {renderContent(publishedPosts)}
        </TabsContent>
        
        <TabsContent value="drafts">
          {renderContent(draftPosts)}
        </TabsContent>
      </Tabs>
    </div>
  );
}
