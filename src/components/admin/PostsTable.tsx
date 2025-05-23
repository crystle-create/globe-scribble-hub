
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Edit, Eye, Trash } from "lucide-react";
import { format } from "date-fns";
import { updatePost, deletePost } from "@/lib/supabaseDatabase";
import type { BlogPost } from "@/lib/supabaseDatabase";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface PostsTableProps {
  posts: BlogPost[];
  onPostUpdate: (updatedPost: BlogPost) => void;
  onPostDelete: (id: string) => void;
}

export function PostsTable({ posts, onPostUpdate, onPostDelete }: PostsTableProps) {
  const { toast } = useToast();

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    try {
      return format(new Date(dateString), "MMM d, yyyy");
    } catch (error) {
      console.error("Invalid date format:", dateString);
      return '';
    }
  };

  const togglePublishStatus = async (id: string, currentStatus: boolean) => {
    try {
      const updatedPost = await updatePost(id, { published: !currentStatus });
      onPostUpdate({
        ...updatedPost,
        published: !currentStatus,
      });
      
      toast({
        title: "Success",
        description: `Post ${!currentStatus ? "published" : "unpublished"} successfully`,
      });
    } catch (error) {
      console.error("Error updating post:", error);
      toast({
        title: "Error",
        description: "Failed to update post status",
        variant: "destructive",
      });
    }
  };

  const handleDeletePost = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(id);
        onPostDelete(id);
        toast({
          title: "Success",
          description: "Post deleted successfully",
        });
      } catch (error) {
        console.error("Error deleting post:", error);
        toast({
          title: "Error",
          description: "Failed to delete post",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden md:table-cell">Category</TableHead>
            <TableHead className="hidden md:table-cell">Updated</TableHead>
            <TableHead className="hidden md:table-cell">Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell className="font-medium">{post.title}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => togglePublishStatus(post.id, post.published)}
                  className={`px-2.5 py-0.5 text-xs font-medium ${
                    post.published 
                      ? "bg-green-100 text-green-800 hover:bg-green-200" 
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {post.published ? "Published" : "Draft"}
                </Button>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {post.category ? (
                  <Badge variant="outline" className="bg-blue-50">
                    {post.category}
                  </Badge>
                ) : (
                  <span className="text-gray-400 text-xs">Uncategorized</span>
                )}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {formatDate(post.updated_at)}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {formatDate(post.created_at)}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button variant="ghost" size="icon" asChild>
                    <Link to={`/post/${post.id}`} target="_blank">
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="icon" asChild>
                    <Link to={`/admin/posts/edit/${post.id}`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleDeletePost(post.id)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
