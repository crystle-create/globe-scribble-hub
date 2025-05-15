
import { RichTextEditor } from "@/components/editor/RichTextEditor";

interface ContentEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export function ContentEditor({ content, onChange }: ContentEditorProps) {
  return (
    <div>
      <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
        Content
      </label>
      <RichTextEditor 
        content={content}
        onChange={onChange}
      />
    </div>
  );
}
