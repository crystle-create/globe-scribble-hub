
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface ImageUploaderProps {
  initialImage?: string;
  onImageChange: (imageUrl: string) => void;
}

export function ImageUploader({ initialImage, onImageChange }: ImageUploaderProps) {
  const [image, setImage] = useState(initialImage || "");
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploading(true);
      
      // In a real implementation, you'd upload to Supabase Storage here
      // For now we'll simulate uploading by creating a data URL
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setImage(imageUrl);
        onImageChange(imageUrl);
        setUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage("");
    onImageChange("");
  };

  return (
    <div>
      <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 mb-1">
        Cover Image
      </label>
      <div className="flex flex-col space-y-2">
        <label 
          htmlFor="coverImageInput" 
          className={`
            flex items-center justify-center border-2 border-dashed rounded-md p-4 
            ${uploading ? 'bg-gray-100 cursor-wait' : 'hover:bg-gray-50 cursor-pointer'}
          `}
        >
          <input
            id="coverImageInput"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="sr-only"
            disabled={uploading}
          />
          <div className="flex flex-col items-center">
            <Upload className="h-8 w-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-500">
              {uploading ? "Uploading..." : "Click to upload cover image"}
            </span>
          </div>
        </label>
        
        {image && (
          <div className="relative mt-2">
            <img 
              src={image} 
              alt="Cover" 
              className="w-full h-48 object-cover rounded-md"
            />
            <Button
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2"
              onClick={handleRemoveImage}
            >
              Remove
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
