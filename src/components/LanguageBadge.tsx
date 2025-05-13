
import { Language } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface LanguageBadgeProps {
  language: Language;
  size?: "sm" | "md" | "lg";
}

// Simplified to be just a display component, no more selection functionality
export function LanguageBadge({ 
  language,
  size = "md"
}: LanguageBadgeProps) {
  return (
    <Badge
      variant="default"
      className={cn(
        "flex items-center gap-1.5",
        "bg-blog-indigo",
        size === "sm" && "px-2 py-0.5 text-xs",
        size === "md" && "px-3 py-1",
        size === "lg" && "px-4 py-1.5 text-base"
      )}
    >
      <span>{language.flag}</span>
      <span>{language.name}</span>
    </Badge>
  );
}
