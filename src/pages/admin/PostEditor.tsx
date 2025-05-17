
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { getPostById, createPost, updatePost } from "@/lib/supabaseDatabase";
import { TitleField } from "@/components/admin/TitleField";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { ContentEditor } from "@/components/admin/ContentEditor";
import { PublishControls } from "@/components/admin/PublishControls";
import { CategoryField } from "@/components/admin/CategoryField";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PostEditor() {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [post, setPost] = useState({
    title: "",
    content: "",
    coverImage: "",
    category: "",
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
          content: postData.content || "",
          coverImage: postData.coverImage || "",
          category: postData.category || "",
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

  const handleTitleChange = (title: string) => {
    setPost(prev => ({ ...prev, title }));
  };

  const handleContentChange = (content: string) => {
    setPost(prev => ({ ...prev, content }));
  };

  const handleCoverImageChange = (coverImage: string) => {
    setPost(prev => ({ ...prev, coverImage }));
  };

  const handleCategoryChange = (category: string) => {
    setPost(prev => ({ ...prev, category }));
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
        content: post.content,
        coverImage: post.coverImage,
        category: post.category,
        published,
      };
      
      if (isEditing && id) {
        await updatePost(id, postData);
        toast({
          title: "Success",
          description: `Post ${published ? "published" : "saved as draft"} successfully`,
        });
      } else {
        await createPost(postData);
        toast({
          title: "Success",
          description: `Post ${published ? "published" : "created as draft"} successfully`,
        });
      }
      
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
        <PublishControls 
          isEditing={isEditing} 
          onSave={savePost} 
          isSaving={saving} 
        />
      </div>
      
      <Card className="p-6 mb-6">
        <div className="space-y-6">
          <TitleField 
            title={post.title} 
            onChange={handleTitleChange} 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ImageUploader 
              initialImage={post.coverImage} 
              onImageChange={handleCoverImageChange} 
            />
            
            <CategoryField
              category={post.category}
              onChange={handleCategoryChange}
            />
          </div>
          
          <ContentEditor 
            content={post.content} 
            onChange={handleContentChange} 
          />
        </div>
      </Card>
    </div>
  );
}
