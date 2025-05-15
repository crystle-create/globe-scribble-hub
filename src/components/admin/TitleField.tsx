
import { Input } from "@/components/ui/input";

interface TitleFieldProps {
  title: string;
  onChange: (title: string) => void;
}

export function TitleField({ title, onChange }: TitleFieldProps) {
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
        Title*
      </label>
      <Input
        id="title"
        name="title"
        value={title}
        onChange={handleTitleChange}
        placeholder="Post title"
        className="w-full"
      />
    </div>
  );
}
