
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

interface PublishControlsProps {
  isEditing: boolean;
  onSave: (published: boolean) => void;
  isSaving: boolean;
}

export function PublishControls({ isEditing, onSave, isSaving }: PublishControlsProps) {
  return (
    <div className="space-x-2">
      <Button 
        variant="outline" 
        onClick={() => onSave(false)} 
        disabled={isSaving}
        className="bg-gray-50 border-gray-200 hover:bg-gray-100"
      >
        <Save className="mr-2 h-4 w-4" />
        Save as Draft
      </Button>
      <Button 
        onClick={() => onSave(true)} 
        disabled={isSaving}
        className="bg-blue-500 hover:bg-blue-600"
      >
        {isSaving ? "Saving..." : "Publish"}
      </Button>
    </div>
  );
}
