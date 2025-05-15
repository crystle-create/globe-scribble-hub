
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { getPostById, createPost, updatePost } from "@/lib/supabaseDatabase";
import { RichTextEditor } from "@/components/editor/RichTextEditor";
import { Image, Save, Upload } from "lucide-react";

export default function PostEditor() {
  const { id } = useParams();
  const isEditing = !!id;
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [post, setPost] = useState({
    title: "",
    content: "",
    coverImage: "",
    published: false
  });
  
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

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

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPost(prev => ({ ...prev, title: e.target.value }));
  };

  const handleContentChange = (content: string) => {
    setPost(prev => ({ ...prev, content }));
  };

  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadingImage(true);
      
      // In a real implementation, you'd upload to Supabase Storage here
      // For now we'll simulate uploading by creating a data URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPost(prev => ({ ...prev, coverImage: reader.result as string }));
        setUploadingImage(false);
      };
      reader.readAsDataURL(file);
    }
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
        <div className="space-x-2">
          <Button 
            variant="outline" 
            onClick={() => savePost(false)} 
            disabled={saving}
            className="bg-gray-50 border-gray-200 hover:bg-gray-100"
          >
            <Save className="mr-2 h-4 w-4" />
            Save as Draft
          </Button>
          <Button 
            onClick={() => savePost(true)} 
            disabled={saving}
            className="bg-blue-500 hover:bg-blue-600"
          >
            {saving ? "Saving..." : "Publish"}
          </Button>
        </div>
      </div>
      
      <Card className="p-6 mb-6">
        <div className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title*
            </label>
            <Input
              id="title"
              name="title"
              value={post.title}
              onChange={handleTitleChange}
              placeholder="Post title"
              className="w-full"
            />
          </div>
          
          <div>
            <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 mb-1">
              Cover Image
            </label>
            <div className="flex flex-col space-y-2">
              <label 
                htmlFor="coverImageInput" 
                className={`
                  flex items-center justify-center border-2 border-dashed rounded-md p-4 
                  ${uploadingImage ? 'bg-gray-100 cursor-wait' : 'hover:bg-gray-50 cursor-pointer'}
                `}
              >
                <input
                  id="coverImageInput"
                  type="file"
                  accept="image/*"
                  onChange={handleCoverImageChange}
                  className="sr-only"
                  disabled={uploadingImage}
                />
                <div className="flex flex-col items-center">
                  <Upload className="h-8 w-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">
                    {uploadingImage ? "Uploading..." : "Click to upload cover image"}
                  </span>
                </div>
              </label>
              
              {post.coverImage && (
                <div className="relative mt-2">
                  <img 
                    src={post.coverImage} 
                    alt="Cover" 
                    className="w-full h-48 object-cover rounded-md"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => setPost(prev => ({ ...prev, coverImage: "" }))}
                  >
                    Remove
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <RichTextEditor 
              content={post.content}
              onChange={handleContentChange}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
