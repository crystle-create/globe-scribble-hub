
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { blogPosts, Post } from "@/data/blogPosts";
import { useLanguage, languages } from "@/contexts/LanguageContext";
import { LanguageBadge } from "@/components/LanguageBadge";
import { Button } from "@/components/ui/button";
import { FeaturedPost } from "@/components/FeaturedPost";
import { ArrowLeft, Share2 } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import { useScrollProgress, useFadeInAnimation } from "@/lib/animation";

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const { currentLanguage } = useLanguage();
  
  // Apply animations
  useFadeInAnimation();
  useScrollProgress();
  
  useEffect(() => {
    // Find the current post
    const foundPost = blogPosts.find(p => p.id === id);
    setPost(foundPost || null);
    
    if (foundPost) {
      // Find related posts (same language or category)
      const related = blogPosts
        .filter(p => p.id !== foundPost.id)
        .filter(p => p.language === foundPost.language || p.category === foundPost.category)
        .slice(0, 3);
      setRelatedPosts(related);
    }
    
    // Scroll to top when post changes
    window.scrollTo(0, 0);
  }, [id]);
  
  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16 text-center animate-fade-in">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <Link to="/" className="text-blog-indigo hover:underline transition-colors duration-300">
          Return to homepage
        </Link>
      </div>
    );
  }
  
  const postLanguage = languages.find(l => l.code === post.language);
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };
  
  const translations = {
    by: {
      en: "by",
      es: "por",
      fr: "par",
      de: "von",
      zh: "作者",
      ja: "著者",
      ar: "بواسطة"
    },
    from: {
      en: "from",
      es: "de",
      fr: "de",
      de: "aus",
      zh: "来自",
      ja: "から",
      ar: "من"
    },
    readMore: {
      en: "Read more",
      es: "Leer más",
      fr: "Lire plus",
      de: "Weiterlesen",
      zh: "阅读更多",
      ja: "続きを読む",
      ar: "اقرأ أكثر"
    },
    publishedIn: {
      en: "Published in",
      es: "Publicado en",
      fr: "Publié en",
      de: "Veröffentlicht in",
      zh: "发表于",
      ja: "掲載",
      ar: "نشرت في"
    },
    minRead: {
      en: "min read",
      es: "min de lectura",
      fr: "min de lecture",
      de: "min Lesezeit",
      zh: "分钟阅读",
      ja: "分で読めます",
      ar: "دقائق للقراءة"
    },
    share: {
      en: "Share",
      es: "Compartir",
      fr: "Partager",
      de: "Teilen",
      zh: "分享",
      ja: "共有する",
      ar: "مشاركة"
    },
    backToHome: {
      en: "Back to Home",
      es: "Volver al Inicio",
      fr: "Retour à l'Accueil",
      de: "Zurück zur Startseite",
      zh: "返回首页",
      ja: "ホームに戻る",
      ar: "العودة إلى الصفحة الرئيسية"
    },
    relatedPosts: {
      en: "Related Posts",
      es: "Artículos Relacionados",
      fr: "Articles Connexes",
      de: "Verwandte Beiträge",
      zh: "相关文章",
      ja: "関連記事",
      ar: "منشورات ذات صلة"
    }
  };

  return (
    <>
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
        <div id="reading-progress" className="h-full bg-blog-indigo w-0 transition-all duration-200" />
      </div>
    
      <div className="container mx-auto px-4 py-8 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Link 
            to="/" 
            className="inline-flex items-center text-gray-500 hover:text-blog-indigo mb-8 transition-colors duration-300 fade-in-element"
          >
            <ArrowLeft className="h-4 w-4 mr-2 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>
              {translations.backToHome[currentLanguage.code as keyof typeof translations.backToHome] || 
               translations.backToHome.en}
            </span>
          </Link>
          
          {/* Post header */}
          <header className="mb-8 fade-in-element">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <LanguageBadge 
                language={postLanguage || { code: post.language, name: post.language, flag: "🌐" }}
              />
              <span className="text-gray-500">•</span>
              <span className="text-gray-500 text-sm">
                {translations.publishedIn[currentLanguage.code as keyof typeof translations.publishedIn] || 
                  translations.publishedIn.en} {post.category}
              </span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-500 text-sm">{post.date}</span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-500 text-sm">
                {post.readTime} {translations.minRead[currentLanguage.code as keyof typeof translations.minRead] || 
                  translations.minRead.en}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-playfair mb-6">
              {post.title}
            </h1>
            
            <p className="text-xl text-gray-700 mb-6">{post.excerpt}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-200">
                  <img 
                    src={post.author.avatar} 
                    alt={post.author.name} 
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium">{post.author.name}</div>
                  <div className="text-sm text-gray-500">
                    {translations.from[currentLanguage.code as keyof typeof translations.from] || 
                     translations.from.en} {post.author.country}
                  </div>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2 transition-all duration-300 hover:bg-blog-indigo/10"
                onClick={handleShare}
              >
                <Share2 className="h-4 w-4" />
                <span>
                  {translations.share[currentLanguage.code as keyof typeof translations.share] || 
                   translations.share.en}
                </span>
              </Button>
            </div>
          </header>
          
          {/* Featured image */}
          <div className="w-full h-[400px] rounded-lg overflow-hidden mb-10 bg-gray-100 fade-in-element" style={{ transitionDelay: '0.2s' }}>
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Post content */}
          <div className="blog-content prose lg:prose-xl max-w-none mb-16 fade-in-element" style={{ transitionDelay: '0.3s' }}>
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-16 fade-in-element" style={{ transitionDelay: '0.4s' }}>
            {post.tags.map(tag => (
              <span 
                key={tag} 
                className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full text-sm text-gray-600 transition-colors duration-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
        
        {/* Related posts */}
        {relatedPosts.length > 0 && (
          <div className="max-w-6xl mx-auto mt-16 fade-in-element" style={{ transitionDelay: '0.5s' }}>
            <h2 className="text-2xl font-bold font-playfair mb-8">
              {translations.relatedPosts[currentLanguage.code as keyof typeof translations.relatedPosts] || 
               translations.relatedPosts.en}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 posts-grid">
              {relatedPosts.map((relatedPost, index) => (
                <div key={relatedPost.id} className="featured-post" style={{ transitionDelay: `${0.1 * index}s` }}>
                  <FeaturedPost post={relatedPost} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BlogPost;
