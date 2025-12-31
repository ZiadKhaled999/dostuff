import React, { useEffect, useState } from 'react';

interface SEOValidatorProps {
  enabled?: boolean;
  reportLevel?: 'error' | 'warning' | 'info';
}

interface SEOResult {
  type: 'error' | 'warning' | 'info';
  message: string;
  category: string;
  fix?: string;
}

export const SEOValidator: React.FC<SEOValidatorProps> = ({ 
  enabled = process.env.NODE_ENV === 'development',
  reportLevel = 'warning'
}) => {
  const [results, setResults] = useState<SEOResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const validateSEO = () => {
    const newResults: SEOResult[] = [];
    
    // 1. Meta Tags Validation
    const title = document.querySelector('title')?.textContent;
    const description = document.querySelector('meta[name="description"]')?.getAttribute('content');
    const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href');
    
    if (!title || title.length < 10 || title.length > 60) {
      newResults.push({
        type: 'error',
        message: 'Page title should be between 10-60 characters',
        category: 'Meta Tags',
        fix: 'Update title tag in Helmet component'
      });
    }
    
    if (!description || description.length < 50 || description.length > 160) {
      newResults.push({
        type: 'warning',
        message: 'Meta description should be between 50-160 characters',
        category: 'Meta Tags',
        fix: 'Update meta description in Helmet component'
      });
    }
    
    if (!canonical) {
      newResults.push({
        type: 'warning',
        message: 'Canonical URL is missing',
        category: 'Meta Tags',
        fix: 'Add canonical link in Helmet component'
      });
    }

    // 2. Heading Structure Validation
    const h1 = document.querySelector('h1');
    const h2s = document.querySelectorAll('h2');
    
    if (!h1) {
      newResults.push({
        type: 'error',
        message: 'No H1 heading found',
        category: 'Heading Structure',
        fix: 'Add H1 heading to main content'
      });
    }
    
    if (h2s.length === 0) {
      newResults.push({
        type: 'warning',
        message: 'No H2 headings found',
        category: 'Heading Structure',
        fix: 'Add H2 headings to organize content'
      });
    }

    // 3. Image Optimization Validation
    const images = document.querySelectorAll('img');
    images.forEach((img, index) => {
      if (!img.alt) {
        newResults.push({
          type: 'error',
          message: `Image ${index + 1} is missing alt text`,
          category: 'Image Optimization',
          fix: 'Add descriptive alt text to all images'
        });
      }
      
      if (img.src && img.src.includes('http')) {
        // Check if image is optimized
        const src = img.src.toLowerCase();
        if (!src.includes('.webp') && !src.includes('.avif')) {
          newResults.push({
            type: 'info',
            message: `Image ${index + 1} could be optimized with WebP format`,
            category: 'Image Optimization',
            fix: 'Convert images to WebP format for better performance'
          });
        }
      }
    });

    // 4. Link Validation
    const links = document.querySelectorAll('a');
    links.forEach((link, index) => {
      if (!link.href) {
        newResults.push({
          type: 'warning',
          message: `Link ${index + 1} has no href attribute`,
          category: 'Links',
          fix: 'Add href attribute to all links'
        });
      }
      
      if (link.textContent && link.textContent.trim() === '') {
        newResults.push({
          type: 'warning',
          message: `Link ${index + 1} has no text content`,
          category: 'Links',
          fix: 'Add descriptive text to all links'
        });
      }
    });

    // 5. Performance Validation
    if (typeof window !== 'undefined') {
      // Check for large images
      const largeImages = Array.from(images).filter(img => {
        // This is a basic check - in production you'd want to check actual file sizes
        return img.naturalWidth > 1920 || img.naturalHeight > 1080;
      });
      
      if (largeImages.length > 0) {
        newResults.push({
          type: 'warning',
          message: `${largeImages.length} large images detected`,
          category: 'Performance',
          fix: 'Optimize images for web display'
        });
      }
    }

    // 6. Accessibility Validation
    const buttons = document.querySelectorAll('button');
    buttons.forEach((button, index) => {
      if (!button.textContent || button.textContent.trim() === '') {
        newResults.push({
          type: 'error',
          message: `Button ${index + 1} has no text content`,
          category: 'Accessibility',
          fix: 'Add descriptive text to all buttons'
        });
      }
    });

    // 7. Structured Data Validation
    const structuredData = document.querySelectorAll('script[type="application/ld+json"]');
    if (structuredData.length === 0) {
      newResults.push({
        type: 'warning',
        message: 'No structured data found',
        category: 'Structured Data',
        fix: 'Add JSON-LD structured data for better SEO'
      });
    }

    setResults(newResults);
    setIsRunning(false);
  };

  useEffect(() => {
    if (enabled) {
      setIsRunning(true);
      // Run validation after DOM is ready
      setTimeout(validateSEO, 100);
      
      // Re-run validation on route changes (for SPA)
      const observer = new MutationObserver(() => {
        setTimeout(validateSEO, 100);
      });
      
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });

      return () => observer.disconnect();
    }
  }, [enabled]);

  const getSeverityColor = (type: string) => {
    switch (type) {
      case 'error': return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'warning': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'info': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
    }
  };

  const getSeverityIcon = (type: string) => {
    switch (type) {
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '•';
    }
  };

  if (!enabled || results.length === 0) {
    return null;
  }

  const filteredResults = results.filter(result => {
    switch (reportLevel) {
      case 'error': return result.type === 'error';
      case 'warning': return result.type === 'error' || result.type === 'warning';
      case 'info': return true;
      default: return true;
    }
  });

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md space-y-2">
      <div className="bg-black/90 backdrop-blur-lg border border-white/10 rounded-lg p-4 shadow-xl">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-white">SEO Validation</h3>
          <div className="text-sm text-gray-400">
            {filteredResults.length} issue{filteredResults.length !== 1 ? 's' : ''}
          </div>
        </div>
        
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {filteredResults.map((result, index) => (
            <div
              key={index}
              className={`p-3 rounded border ${getSeverityColor(result.type)} transition-all hover:scale-[1.02]`}
            >
              <div className="flex items-start gap-2">
                <span className="text-lg" aria-hidden="true">
                  {getSeverityIcon(result.type)}
                </span>
                <div className="flex-1">
                  <div className="font-medium text-white">{result.message}</div>
                  <div className="text-xs text-gray-400 mt-1">{result.category}</div>
                  {result.fix && (
                    <div className="text-xs text-gray-300 mt-1 italic">
                      Fix: {result.fix}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-3 pt-3 border-t border-white/10 text-xs text-gray-400">
          Tip: Run this validator in development to catch SEO issues early
        </div>
      </div>
    </div>
  );
};

// SEO Score Calculator
export const calculateSEOScore = (results: SEOResult[]): number => {
  const totalIssues = results.length;
  const errors = results.filter(r => r.type === 'error').length;
  const warnings = results.filter(r => r.type === 'warning').length;
  const info = results.filter(r => r.type === 'info').length;
  
  // Base score of 100
  let score = 100;
  
  // Deduct points for issues
  score -= errors * 10;  // 10 points per error
  score -= warnings * 5; // 5 points per warning
  score -= info * 1;     // 1 point per info
  
  return Math.max(0, Math.min(100, score));
};

// Performance metrics collector
export const collectPerformanceMetrics = async (): Promise<any> => {
  if (typeof window === 'undefined') return null;
  
  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  const paint = performance.getEntriesByType('paint');
  
  return {
    loadTime: navigation.loadEventEnd - (navigation as any).navigationStart,
    domContentLoaded: navigation.domContentLoadedEventEnd - (navigation as any).navigationStart,
    firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
    firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
    largestContentfulPaint: performance.getEntriesByType('largest-contentful-paint')[0]?.startTime || 0,
    cumulativeLayoutShift: 0, // Would need Layout Instability API
    firstInputDelay: 0 // Would need Event Timing API
  };
};