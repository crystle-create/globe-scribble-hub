
import { Link } from "react-router-dom";
import { Post } from "@/data/blogPosts";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface FeaturedPostProps {
  post: Post;
  isLarge?: boolean;
}

export function FeaturedPost({ post, isLarge = false }: FeaturedPostProps) {
  const { currentLanguage } = useLanguage();
  
  const translations = {
    readMore: {
      en: "Read More",
      es: "Leer Más",
      fr: "Lire Plus",
      de: "Weiterlesen",
      zh: "阅读更多",
      ja: "続きを読む",
      ar: "اقرأ أكثر"
    },
    by: {
      en: "by",
      es: "por",
      fr: "par",
      de: "von",
      zh: "作者",
      ja: "著者",
      ar: "بواسطة"
    },
    min: {
      en: "min read",
      es: "min de lectura",
      fr: "min de lecture", 
      de: "min Lesezeit",
      zh: "分钟阅读",
      ja: "分で読めます",
      ar: "دقائق للقراءة"
    }
  };

  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:-translate-y-1",
        isLarge ? "col-span-full lg:col-span-2" : ""
      )}
    >
      <Link to={`/post/${post.id}`} className="block h-full">
        <div className="relative w-full">
          {/* Language badge */}
          <div className="absolute top-4 right-4 z-10 bg-white/80 dark:bg-black/80 px-2 py-1 rounded font-medium text-xs uppercase">
            {post.language === currentLanguage.code ? 
              `${currentLanguage.flag} ${currentLanguage.name}` : 
              languages.find(l => l.code === post.language)?.flag || post.language}
          </div>
          
          {/* Image */}
          <div 
            className={cn(
              "w-full bg-muted overflow-hidden",
              isLarge ? "h-72" : "h-56"
            )}
          >
            <img
              src={post.image}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          
          {/* Content */}
          <div className="p-5 bg-white dark:bg-gray-800">
            <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
              <span className="font-medium uppercase text-blog-amber">{post.category}</span>
              <span>•</span>
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime} {translations.min[currentLanguage.code as keyof typeof translations.min] || translations.min.en}</span>
            </div>
            
            <h3 className={cn(
              "font-playfair font-bold line-clamp-2 mb-2 group-hover:text-blog-indigo",
              isLarge ? "text-2xl" : "text-xl"
            )}>
              {post.title}
            </h3>
            
            <p className="text-gray-600 dark:text-gray-300 line-clamp-2 mb-4">
              {post.excerpt}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-200">
                  <img 
                    src={post.author.avatar} 
                    alt={post.author.name} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <span className="text-sm">
                  <span className="text-muted-foreground">
                    {translations.by[currentLanguage.code as keyof typeof translations.by] || translations.by.en}
                  </span>{" "}
                  <span className="font-medium">{post.author.name}</span>
                </span>
              </div>
              
              <Button 
                variant="ghost" 
                className="text-blog-indigo hover:text-blog-indigo/80 font-medium p-0"
              >
                {translations.readMore[currentLanguage.code as keyof typeof translations.readMore] || translations.readMore.en}
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
