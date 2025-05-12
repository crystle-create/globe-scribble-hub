
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Link } from 'react-router-dom';

export function Header() {
  const { currentLanguage, setLanguage, languages } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <Globe className="h-6 w-6 text-blog-indigo" />
          <span className="text-2xl font-bold font-playfair text-blog-dark">WorldBlog</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-600 hover:text-blog-indigo font-medium">
            Home
          </Link>
          <Link to="/categories" className="text-gray-600 hover:text-blog-indigo font-medium">
            Categories
          </Link>
          <Link to="/about" className="text-gray-600 hover:text-blog-indigo font-medium">
            About
          </Link>
        </nav>

        {/* Language Selector */}
        <div className="hidden md:flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <span>{currentLanguage.flag}</span>
                <span>{currentLanguage.name}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white shadow-md">
              {languages.map((language) => (
                <DropdownMenuItem 
                  key={language.code}
                  onClick={() => setLanguage(language)}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <span>{language.flag}</span>
                  <span>{language.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button variant="default" className="bg-blog-indigo hover:bg-blog-indigo/90">
            Subscribe
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMenu} 
            aria-label="Toggle menu"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="w-6 h-6"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="px-4 py-2 border-t">
            <Link to="/" className="block py-2 text-gray-600" onClick={toggleMenu}>
              Home
            </Link>
            <Link to="/categories" className="block py-2 text-gray-600" onClick={toggleMenu}>
              Categories
            </Link>
            <Link to="/about" className="block py-2 text-gray-600" onClick={toggleMenu}>
              About
            </Link>
            <div className="py-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2 w-full justify-start">
                    <span>{currentLanguage.flag}</span>
                    <span>{currentLanguage.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="bg-white shadow-md">
                  {languages.map((language) => (
                    <DropdownMenuItem 
                      key={language.code}
                      onClick={() => setLanguage(language)}
                      className="flex items-center gap-2"
                    >
                      <span>{language.flag}</span>
                      <span>{language.name}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Button variant="default" className="w-full mt-2 bg-blog-indigo hover:bg-blog-indigo/90">
              Subscribe
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
