
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PRESET_CATEGORIES = [
  "Technology",
  "Design",
  "Business",
  "Marketing",
  "Development",
  "Tutorial",
  "News",
  "Other"
];

interface CategoryFieldProps {
  category: string;
  onChange: (category: string) => void;
}

export function CategoryField({ category, onChange }: CategoryFieldProps) {
  const handleCategoryChange = (value: string) => {
    onChange(value);
  };

  return (
    <div>
      <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
        Category
      </label>
      <Select value={category} onValueChange={handleCategoryChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          {PRESET_CATEGORIES.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
          <SelectItem value="custom">Custom</SelectItem>
        </SelectContent>
      </Select>
      
      {category === "custom" && (
        <Input
          className="mt-2"
          placeholder="Enter custom category"
          onChange={(e) => onChange(e.target.value)}
          value={category === "custom" ? "" : category}
        />
      )}
    </div>
  );
}
