
import { useEffect } from 'react';

// Helper to check if IntersectionObserver is available
const hasIntersectionObserver = typeof window !== 'undefined' && 'IntersectionObserver' in window;

// Fade in elements as they appear in the viewport
export const useFadeInAnimation = (options = {}) => {
  useEffect(() => {
    if (!hasIntersectionObserver) return;

    const elements = document.querySelectorAll('.fade-in-element');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { 
      threshold: 0.1,
      ...options 
    });
    
    elements.forEach((element) => observer.observe(element));
    
    return () => {
      elements.forEach((element) => observer.unobserve(element));
    };
  }, [options]);
};

// Observer for staggered animations
export const useStaggeredAnimation = (containerSelector: string, itemSelector: string, delayStep = 0.1) => {
  useEffect(() => {
    if (!hasIntersectionObserver) return;
    
    const containers = document.querySelectorAll(containerSelector);
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const container = entry.target;
          const items = container.querySelectorAll(itemSelector);
          
          items.forEach((item, index) => {
            const element = item as HTMLElement;
            element.style.opacity = '0';
            element.style.transform = 'translateY(10px)';
            element.style.transition = `opacity 0.5s ease, transform 0.5s ease`;
            element.style.transitionDelay = `${index * delayStep}s`;
            
            setTimeout(() => {
              element.style.opacity = '1';
              element.style.transform = 'translateY(0)';
            }, 50); // Small delay to ensure styles are applied before animation starts
          });
          
          observer.unobserve(container);
        }
      });
    }, { threshold: 0.1 });
    
    containers.forEach((container) => observer.observe(container));
    
    return () => {
      containers.forEach((container) => observer.unobserve(container));
    };
  }, [containerSelector, itemSelector, delayStep]);
};

// Progress bar for articles
export const useScrollProgress = () => {
  useEffect(() => {
    const progressBar = document.getElementById('reading-progress');
    if (!progressBar) return;

    const updateProgress = () => {
      const scrollPosition = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = (scrollPosition / scrollHeight) * 100;
      progressBar.style.width = `${scrollPercentage}%`;
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);
};

// Page transition effect
export const usePageTransition = () => {
  useEffect(() => {
    const main = document.querySelector('main');
    if (!main) return;

    main.classList.add('animate-fade-in');
    
    return () => {
      main.classList.remove('animate-fade-in');
    };
  }, []);
};
