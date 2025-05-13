
import { Button } from "@/components/ui/button";
import { Cloud, Sun, Search } from "lucide-react";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { SearchDialog } from "./SearchDialog";
import { AuthButtons } from "./auth/AuthButtons";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openSearch = () => {
    setIsSearchOpen(true);
  };

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="relative">
            <Sun className="h-5 w-5 text-yellow-300 absolute top-0 left-0" />
            <Cloud className="h-8 w-8 text-blue-400" />
          </div>
          <span className="text-2xl font-bold font-playfair text-gray-800">CloudiBlog</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-600 hover:text-blue-500 font-medium">
            Home
          </Link>
          <Link to="/categories" className="text-gray-600 hover:text-blue-500 font-medium">
            Categories
          </Link>
          <Link to="/about" className="text-gray-600 hover:text-blue-500 font-medium">
            About
          </Link>
          
          {/* Search Button */}
          <Button variant="ghost" size="icon" className="text-gray-600" onClick={openSearch}>
            <Search className="h-5 w-5" />
          </Button>
        </nav>

        <div className="hidden md:block">
          <AuthButtons />
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon"
            className="text-gray-600"
            onClick={openSearch}
          >
            <Search className="h-5 w-5" />
          </Button>

          <div className="md:hidden">
            <AuthButtons />
          </div>
          
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
          </div>
        </div>
      )}

      {/* Search Dialog */}
      <SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </header>
  );
}
