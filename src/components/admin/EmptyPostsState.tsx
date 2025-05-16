
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function EmptyPostsState() {
  return (
    <div className="text-center py-16 glass-card">
      <h2 className="text-xl font-medium text-gray-600 mb-4">No posts yet</h2>
      <p className="text-gray-500 mb-6">Start creating your first blog post</p>
      <Button asChild>
        <Link to="/admin/posts/new">
          <Plus className="mr-2 h-4 w-4" /> Create Your First Post
        </Link>
      </Button>
    </div>
  );
}
