import React from 'react';

interface ContentOptimizationProps {
  children: React.ReactNode;
  contentType?: 'hero' | 'feature' | 'cta' | 'testimonial' | 'faq';
  keywords?: string[];
}

export const ContentOptimization: React.FC<ContentOptimizationProps> = ({ 
  children, 
  contentType = 'feature',
  keywords = []
}) => {
  const getOptimizedContent = () => {
    switch (contentType) {
      case 'hero':
        return (
          <div className="content-optimization-hero">
            {children}
            {/* Hidden semantic content for SEO */}
            <div className="sr-only" aria-hidden="true">
              Do Stuff is the premier online exam platform and quiz builder for educators and institutions. 
              Our platform enables teachers to create professional exams with multiple question types including 
              multiple choice, fill in the blank, translation, true/false, matching, and reading comprehension. 
              With timer control, custom styling, easy sharing, and comprehensive analytics, Do Stuff provides 
              everything needed for modern educational assessment.
            </div>
          </div>
        );
      
      case 'feature':
        return (
          <div className="content-optimization-feature">
            {children}
            {/* Schema.org microdata for features */}
            <div 
              itemProp="hasOfferCatalog" 
              itemScope 
              itemType="https://schema.org/OfferCatalog"
              className="sr-only"
            >
              <div itemProp="itemListElement" itemScope itemType="https://schema.org/OfferCatalog">
                <span itemProp="name">Multiple Choice Questions</span>
                <span itemProp="description">Classic choose-the-correct-answer format with up to 6 options</span>
              </div>
              <div itemProp="itemListElement" itemScope itemType="https://schema.org/OfferCatalog">
                <span itemProp="name">Fill in the Blank</span>
                <span itemProp="description">Type the missing word or phrase with auto-grading support</span>
              </div>
              <div itemProp="itemListElement" itemScope itemType="https://schema.org/OfferCatalog">
                <span itemProp="name">Translation Exercises</span>
                <span itemProp="description">Arabic ↔ English translation exercises with bidirectional support</span>
              </div>
            </div>
          </div>
        );
      
      case 'cta':
        return (
          <div className="content-optimization-cta">
            {children}
            {/* Hidden CTA content for SEO */}
            <div className="sr-only" aria-hidden="true">
              Ready to create your first exam? Join thousands of educators using Do Stuff to create 
              engaging assessments. Sign up for free and start making tests today. Perfect for teachers, 
              schools, and educational institutions looking for professional exam software.
            </div>
          </div>
        );
      
      case 'testimonial':
        return (
          <div className="content-optimization-testimonial">
            {children}
            {/* Hidden testimonial content for SEO */}
            <div className="sr-only" aria-hidden="true">
              Trusted by educators worldwide. Do Stuff has helped thousands of teachers create better 
              assessments and improve student learning outcomes. Our platform is designed specifically 
              for educational use with features that support modern teaching methodologies.
            </div>
          </div>
        );
      
      case 'faq':
        return (
          <div className="content-optimization-faq">
            {children}
            {/* Hidden FAQ content for SEO */}
            <div className="sr-only" aria-hidden="true">
              Frequently asked questions about Do Stuff online exam platform. Learn how to create exams, 
              use different question types, share assessments with students, and track performance metrics. 
              Our comprehensive FAQ covers all aspects of using our quiz builder and exam software.
            </div>
          </div>
        );
      
      default:
        return <div className="content-optimization-default">{children}</div>;
    }
  };

  return (
    <div className={`content-optimization-${contentType}`}>
      {getOptimizedContent()}
      
      {/* Keyword density optimization */}
      {keywords.length > 0 && (
        <div className="sr-only" aria-hidden="true">
          {keywords.join(' ')}
        </div>
      )}
      
      {/* Breadcrumb schema for content pages */}
      <nav aria-label="Breadcrumb" className="sr-only">
        <ol itemScope itemType="https://schema.org/BreadcrumbList">
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <a itemProp="item" href="https://dostuff.com/">
              <span itemProp="name">Home</span>
            </a>
            <meta itemProp="position" content="1" />
          </li>
          <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <a itemProp="item" href="https://dostuff.com/features">
              <span itemProp="name">Features</span>
            </a>
            <meta itemProp="position" content="2" />
          </li>
        </ol>
      </nav>
    </div>
  );
};

// Keyword optimization helper
export const optimizeKeywords = (content: string, keywords: string[]) => {
  const keywordDensity = keywords.reduce((acc, keyword) => {
    const regex = new RegExp(keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    const matches = content.match(regex);
    const count = matches ? matches.length : 0;
    return { ...acc, [keyword]: count };
  }, {} as Record<string, number>);
  
  return {
    content,
    keywordDensity,
    totalWords: content.split(/\s+/).length,
    keywordPercentage: Object.values(keywordDensity).reduce((a, b) => a + b, 0) / content.split(/\s+/).length * 100
  };
};

// Content readability analysis
export const analyzeReadability = (content: string) => {
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const words = content.split(/\s+/).filter(w => w.length > 0);
  const syllables = words.reduce((acc, word) => {
    const wordSyllables = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')
      .replace(/^y/, '')
      .match(/[aeiouy]{1,2}/g);
    return acc + (wordSyllables ? wordSyllables.length : 0);
  }, 0);
  
  const avgSentenceLength = words.length / sentences.length;
  const avgSyllablesPerWord = syllables / words.length;
  
  // Flesch Reading Ease Score
  const fleschScore = 206.835 - 1.015 * avgSentenceLength - 84.6 * avgSyllablesPerWord;
  
  return {
    sentences: sentences.length,
    words: words.length,
    syllables,
    avgSentenceLength: Math.round(avgSentenceLength * 10) / 10,
    avgSyllablesPerWord: Math.round(avgSyllablesPerWord * 10) / 10,
    fleschScore: Math.round(fleschScore),
    readability: fleschScore >= 90 ? 'Very Easy' : 
                 fleschScore >= 80 ? 'Easy' : 
                 fleschScore >= 70 ? 'Fairly Easy' : 
                 fleschScore >= 60 ? 'Standard' : 
                 fleschScore >= 50 ? 'Fairly Difficult' : 
                 fleschScore >= 30 ? 'Difficult' : 'Very Confusing'
  };
};