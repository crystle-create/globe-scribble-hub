
import { Language } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface LanguageBadgeProps {
  language: Language;
  isActive?: boolean;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
}

export function LanguageBadge({ 
  language, 
  isActive = false, 
  onClick,
  size = "md"
}: LanguageBadgeProps) {
  return (
    <Badge
      variant={isActive ? "default" : "outline"}
      className={cn(
        "flex items-center gap-1.5 cursor-pointer transition-all",
        isActive 
          ? "bg-blog-indigo hover:bg-blog-indigo/80" 
          : "hover:bg-blog-lavender hover:text-blog-indigo",
        size === "sm" && "px-2 py-0.5 text-xs",
        size === "md" && "px-3 py-1",
        size === "lg" && "px-4 py-1.5 text-base"
      )}
      onClick={onClick}
    >
      <span>{language.flag}</span>
      <span>{language.name}</span>
    </Badge>
  );
}
