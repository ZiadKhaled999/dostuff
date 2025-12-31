import React, { useEffect, useState } from 'react';

interface PerformanceOptimizationProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
}

export const LazyLoad: React.FC<PerformanceOptimizationProps> = ({ 
  children, 
  className = '', 
  threshold = 0.1, 
  rootMargin = '50px' 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setHasBeenVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return (
    <div 
      ref={ref} 
      className={`${className} ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
      style={{ 
        transition: 'opacity 0.6s ease-out',
        opacity: isVisible ? 1 : 0
      }}
    >
      {hasBeenVisible || isVisible ? children : null}
    </div>
  );
};

export const PerformanceOptimization: React.FC = () => {
  return (
    <>
      {/* Preload critical fonts */}
      <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" as="style" onLoad={(e) => {
        (e.target as HTMLLinkElement).rel = 'stylesheet';
      }} />
      
      {/* Preconnect to external resources */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://cdn.tailwindcss.com" />
      
      {/* DNS Prefetch for performance */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//cdn.tailwindcss.com" />
      
      {/* Critical CSS inlined for above-the-fold content */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        /* Critical CSS for hero section */
        .hero-critical {
          background: linear-gradient(135deg, #0B0B15 0%, #1a1a2e 100%);
        }
        
        /* Performance optimizations */
        img {
          max-width: 100%;
          height: auto;
          loading: lazy;
        }
        
        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </>
  );
};