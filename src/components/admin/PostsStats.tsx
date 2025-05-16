
import { FileBarChart, FileText, FileMinus } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

interface PostsStatsProps {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
}

export function PostsStats({ totalPosts, publishedPosts, draftPosts }: PostsStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <FileBarChart className="mr-2 h-5 w-5 text-blue-500" />
            Total Posts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{totalPosts}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <FileText className="mr-2 h-5 w-5 text-green-500" />
            Published
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{publishedPosts}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center">
            <FileMinus className="mr-2 h-5 w-5 text-amber-500" />
            Drafts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{draftPosts}</p>
        </CardContent>
      </Card>
    </div>
  );
}
