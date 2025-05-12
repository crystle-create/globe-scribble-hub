
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { blogPosts, Post } from "@/data/blogPosts";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FeaturedPost } from "@/components/FeaturedPost";

interface CategoryCount {
  name: string;
  count: number;
}

const Categories = () => {
  const { currentLanguage } = useLanguage();
  const [categories, setCategories] = useState<CategoryCount[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  
  useEffect(() => {
    // Get all unique categories and their counts
    const categoryMap = blogPosts.reduce((acc, post) => {
      const category = post.category;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category]++;
      return acc;
    }, {} as Record<string, number>);
    
    // Transform into array and sort by count
    const sortedCategories = Object.entries(categoryMap)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
    
    setCategories(sortedCategories);
    
    // Initialize with all posts
    filterPostsByCategory(selectedCategory);
  }, []);
  
  const filterPostsByCategory = (category: string) => {
    setSelectedCategory(category);
    
    const filtered = category === "all" 
      ? blogPosts 
      : blogPosts.filter(post => post.category === category);
    
    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    setFilteredPosts(filtered);
  };
  
  const translations = {
    categories: {
      en: "Categories",
      es: "Categorías",
      fr: "Catégories",
      de: "Kategorien",
      zh: "分类",
      ja: "カテゴリー",
      ar: "التصنيفات"
    },
    exploreByCategory: {
      en: "Explore posts by category",
      es: "Explorar artículos por categoría",
      fr: "Explorer les articles par catégorie",
      de: "Beiträge nach Kategorien erkunden",
      zh: "按分类浏览文章",
      ja: "カテゴリーで記事を探す",
      ar: "استكشف المنشورات حسب الفئة"
    },
    allCategories: {
      en: "All Categories",
      es: "Todas las Categorías",
      fr: "Toutes les Catégories",
      de: "Alle Kategorien",
      zh: "所有分类",
      ja: "すべてのカテゴリー",
      ar: "جميع الفئات"
    },
    posts: {
      en: "posts",
      es: "artículos",
      fr: "articles",
      de: "Beiträge",
      zh: "文章",
      ja: "記事",
      ar: "منشورات"
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto mb-10">
        <h1 className="text-4xl font-bold font-playfair mb-4">
          {translations.categories[currentLanguage.code as keyof typeof translations.categories] || 
           translations.categories.en}
        </h1>
        <p className="text-xl text-gray-600">
          {translations.exploreByCategory[currentLanguage.code as keyof typeof translations.exploreByCategory] || 
           translations.exploreByCategory.en}
        </p>
      </div>
      
      {/* Category selector */}
      <div className="max-w-6xl mx-auto mb-12">
        <Tabs defaultValue="all" value={selectedCategory} onValueChange={filterPostsByCategory}>
          <TabsList className="flex flex-wrap h-auto mb-4 bg-gray-100 p-1 rounded-lg">
            <TabsTrigger 
              value="all"
              className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
            >
              {translations.allCategories[currentLanguage.code as keyof typeof translations.allCategories] || 
               translations.allCategories.en} ({blogPosts.length})
            </TabsTrigger>
            
            {categories.map(category => (
              <TabsTrigger 
                key={category.name}
                value={category.name}
                className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                {category.name} ({category.count})
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value={selectedCategory} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map(post => (
                <FeaturedPost key={post.id} post={post} />
              ))}
            </div>
            
            {/* Empty state */}
            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No posts found in this category.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Categories;
