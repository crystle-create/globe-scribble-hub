
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { getPostById, createPost, updatePost } from "@/lib/supabaseDatabase";

export default function PostEditor() {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [post, setPost] = useState({
    title: "",
    excerpt: "",
    content: "",
    published: false
  });
  
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEditing) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      if (!id) return;
      
      const postData = await getPostById(id);
      
      if (postData) {
        setPost({
          title: postData.title,
          excerpt: postData.excerpt,
          content: postData.content,
          published: postData.published
        });
      } else {
        toast({
          title: "Error",
          description: "Post not found",
          variant: "destructive",
        });
        navigate("/admin/posts");
      }
    } catch (error) {
      console.error("Error fetching post:", error);
      toast({
        title: "Error",
        description: "Failed to load post",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPost(prev => ({ ...prev, [name]: value }));
  };

  const savePost = async (published: boolean) => {
    if (!post.title.trim()) {
      toast({
        title: "Error",
        description: "Post title is required",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    
    try {
      const postData = {
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        published,
      };
      
      if (isEditing && id) {
        await updatePost(id, postData);
      } else {
        await createPost(postData);
      }
      
      toast({
        title: "Success",
        description: `Post ${isEditing ? "updated" : "created"} successfully`,
      });
      
      navigate("/admin/posts");
    } catch (error) {
      console.error("Error saving post:", error);
      toast({
        title: "Error",
        description: `Failed to ${isEditing ? "update" : "create"} post`,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-52"></div>
          <div className="h-4 bg-gray-200 rounded w-72"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold font-playfair">
          {isEditing ? "Edit Post" : "New Post"}
        </h1>
        <div className="space-x-2">
          <Button 
            variant="outline" 
            onClick={() => savePost(false)} 
            disabled={saving}
          >
            Save as Draft
          </Button>
          <Button 
            onClick={() => savePost(true)} 
            disabled={saving}
          >
            {saving ? "Saving..." : "Publish"}
          </Button>
        </div>
      </div>
      
      <Card className="p-6">
        <div className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <Input
              id="title"
              name="title"
              value={post.title}
              onChange={handleChange}
              placeholder="Post title"
              className="w-full"
            />
          </div>
          
          <div>
            <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
              Excerpt
            </label>
            <Textarea
              id="excerpt"
              name="excerpt"
              value={post.excerpt}
              onChange={handleChange}
              placeholder="Brief description of your post"
              className="w-full"
              rows={3}
            />
          </div>
          
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <Textarea
              id="content"
              name="content"
              value={post.content}
              onChange={handleChange}
              placeholder="Write your post content here..."
              className="w-full min-h-[400px]"
              rows={15}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
