
import { Cloud, CloudSun } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export function Footer() {
  const { currentLanguage } = useLanguage();
  
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="relative">
                <Cloud className="h-6 w-6 text-blog-indigo" />
                <CloudSun className="h-3 w-3 text-blog-amber absolute -top-1 -right-1" />
              </div>
              <span className="text-xl font-bold font-playfair text-blog-dark">CloudiBlog</span>
            </Link>
            <p className="text-gray-500 text-sm">
              Sharing perspectives from across the globe. Read, write, and connect with voices from around the world.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-500 hover:text-blog-indigo text-sm">Home</Link></li>
              <li><Link to="/categories" className="text-gray-500 hover:text-blog-indigo text-sm">Categories</Link></li>
              <li><Link to="/about" className="text-gray-500 hover:text-blog-indigo text-sm">About</Link></li>
              <li><Link to="/contact" className="text-gray-500 hover:text-blog-indigo text-sm">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/category/technology" className="text-gray-500 hover:text-blog-indigo text-sm">Technology</Link></li>
              <li><Link to="/category/culture" className="text-gray-500 hover:text-blog-indigo text-sm">Culture</Link></li>
              <li><Link to="/category/travel" className="text-gray-500 hover:text-blog-indigo text-sm">Travel</Link></li>
              <li><Link to="/category/food" className="text-gray-500 hover:text-blog-indigo text-sm">Food</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Connect</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-500 hover:text-blog-indigo text-sm">Twitter</a></li>
              <li><a href="#" className="text-gray-500 hover:text-blog-indigo text-sm">Instagram</a></li>
              <li><a href="#" className="text-gray-500 hover:text-blog-indigo text-sm">Facebook</a></li>
              <li><a href="#" className="text-gray-500 hover:text-blog-indigo text-sm">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {year} CloudiBlog. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <p className="text-gray-500 text-sm">
              Current language: {currentLanguage.name} {currentLanguage.flag}
            </p>
            <a href="#" className="text-gray-500 hover:text-blog-indigo text-sm">Privacy</a>
            <a href="#" className="text-gray-500 hover:text-blog-indigo text-sm">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
