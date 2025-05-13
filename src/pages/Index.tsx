import React, { useState, useEffect } from "react";
import { useLanguage, languages } from "@/contexts/LanguageContext";
import { blogPosts, Post } from "@/data/blogPosts";
import { FeaturedPost } from "@/components/FeaturedPost";
import { LanguageBadge } from "@/components/LanguageBadge";
import { Button } from "@/components/ui/button";
import { Globe, Search } from "lucide-react";

const Index = () => {
  const { currentLanguage } = useLanguage();
  const [filter, setFilter] = useState<string | null>(null);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  
  // Apply filters when language or filter changes
  useEffect(() => {
    let posts = [...blogPosts];
    
    // Apply language filter if not showing all
    if (filter) {
      posts = posts.filter(post => post.language === filter);
    }
    
    // Sort by date (newest first)
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    setFilteredPosts(posts);
  }, [filter, currentLanguage]);
  
  // Translations for the homepage
  const translations = {
    hero: {
      title: {
        en: "Diverse Perspectives, Global Voices",
        es: "Perspectivas Diversas, Voces Globales",
        fr: "Perspectives Diverses, Voix Globales",
        de: "Vielfältige Perspektiven, Globale Stimmen",
        zh: "多元视角，全球声音",
        ja: "多様な視点、グローバルな声",
        ar: "وجهات نظر متنوعة، أصوات عالمية"
      },
      subtitle: {
        en: "Discover stories, ideas, and insights from writers around the world",
        es: "Descubre historias, ideas y perspectivas de escritores de todo el mundo",
        fr: "Découvrez des histoires, des idées et des perspectives d'écrivains du monde entier",
        de: "Entdecke Geschichten, Ideen und Einsichten von Autoren aus aller Welt",
        zh: "发现来自世界各地作者的故事、想法和见解",
        ja: "世界中の作家によるストーリー、アイデア、洞察を発見する",
        ar: "اكتشف القصص والأفكار والرؤى من الكتاب حول العالم"
      }
    },
    featuredPosts: {
      en: "Featured Posts",
      es: "Artículos Destacados",
      fr: "Articles en Vedette",
      de: "Ausgewählte Beiträge",
      zh: "精选文章",
      ja: "おすすめの投稿",
      ar: "المنشورات المميزة"
    },
    allLanguages: {
      en: "All Languages",
      es: "Todos los Idiomas",
      fr: "Toutes les Langues",
      de: "Alle Sprachen",
      zh: "所有语言",
      ja: "すべての言語",
      ar: "كل اللغات"
    },
    browseByLanguage: {
      en: "Browse by Language",
      es: "Explorar por Idioma",
      fr: "Parcourir par Langue",
      de: "Nach Sprache durchsuchen",
      zh: "按语言浏览",
      ja: "言語で閲覧",
      ar: "تصفح حسب اللغة"
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blog-lavender to-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-playfair mb-6">
            {translations.hero.title[currentLanguage.code as keyof typeof translations.hero.title] || 
             translations.hero.title.en}
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-10">
            {translations.hero.subtitle[currentLanguage.code as keyof typeof translations.hero.subtitle] || 
             translations.hero.subtitle.en}
          </p>
          
          {/* Language Selector */}
          <div className="flex flex-wrap justify-center gap-3">
            <LanguageBadge
              language={{ code: "", name: translations.allLanguages[currentLanguage.code as keyof typeof translations.allLanguages] || translations.allLanguages.en, flag: "🌐" }}
              size="lg"
            />
            {languages.map((language) => (
              <LanguageBadge
                key={language.code}
                language={language}
                size="lg"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold font-playfair">
              {translations.featuredPosts[currentLanguage.code as keyof typeof translations.featuredPosts] || 
               translations.featuredPosts.en}
            </h2>
            
            <div className="flex items-center">
              <Globe className="h-5 w-5 text-blog-indigo mr-2" />
              <span className="text-sm font-medium text-gray-500">
                {translations.browseByLanguage[currentLanguage.code as keyof typeof translations.browseByLanguage] || 
                 translations.browseByLanguage.en}
              </span>
            </div>
          </div>
          
          {/* Grid of posts */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* First post is larger */}
              {filteredPosts.length > 0 && (
                <FeaturedPost post={filteredPosts[0]} isLarge={true} />
              )}
              
              {/* Rest of the posts */}
              {filteredPosts.slice(1, 6).map((post) => (
                <FeaturedPost key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No posts available in this language yet.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => setFilter(null)}
              >
                Show all posts
              </Button>
            </div>
          )}
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 bg-blog-lavender/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold font-playfair mb-4">Stay Updated</h2>
            <p className="text-gray-700 mb-8">
              Subscribe to our newsletter to receive the latest posts and updates directly in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blog-indigo"
              />
              <Button className="bg-blog-indigo hover:bg-blog-indigo/90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
