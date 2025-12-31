import React from 'react';
import { Helmet } from 'react-helmet-async';

interface StructuredDataProps {
  pageType: 'homepage' | 'product' | 'about' | 'contact' | 'legal';
  title?: string;
  description?: string;
  url?: string;
}

export const StructuredData: React.FC<StructuredDataProps> = ({ 
  pageType, 
  title, 
  description, 
  url 
}) => {
  const baseUrl = 'https://dostuff.com';
  const currentUrl = url || baseUrl;
  
  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Do Stuff",
    "description": "The Ultimate Online Exam Platform & Quiz Builder for teachers and students",
    "url": baseUrl,
    "logo": `${baseUrl}/logo.png`,
    "sameAs": [
      "https://www.facebook.com/dostuff",
      "https://www.twitter.com/dostuff",
      "https://www.linkedin.com/company/dostuff"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Support",
      "email": "support@dostuff.com",
      "availableLanguage": ["English", "Arabic"]
    },
    "founder": {
      "@type": "Person",
      "name": "Do Stuff Team"
    },
    "foundingDate": "2025",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    }
  };

  // Website Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Do Stuff - Online Exam Platform",
    "url": baseUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${baseUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  // Product Schema (for the exam platform)
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Do Stuff Exam Platform",
    "description": "Professional online exam platform and quiz builder for teachers and students",
    "url": baseUrl,
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Any",
    "applicationSubCategory": ["Exam Software", "Quiz Builder", "Educational Technology"],
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "url": `${baseUrl}/pricing`
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150",
      "bestRating": "5",
      "worstRating": "1"
    },
    "featureList": [
      "Multiple Choice Questions",
      "Fill in the Blank",
      "Translation Exercises",
      "True or False",
      "Matching Questions",
      "Reading Comprehension",
      "Timer Control",
      "Custom Styling",
      "Easy Sharing",
      "Analytics Dashboard"
    ],
    "author": {
      "@type": "Organization",
      "name": "Do Stuff"
    },
    "datePublished": "2025-01-01",
    "keywords": "online exam platform, quiz builder, test maker, educational software, exam software"
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem", 
        "position": 2,
        "name": title || "Do Stuff",
        "item": currentUrl
      }
    ]
  };

  // FAQ Schema (for homepage)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I create an online exam?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Creating an online exam is simple with Do Stuff. Sign up, choose your question types, add your questions, and share the exam link with your students."
        }
      },
      {
        "@type": "Question",
        "name": "Can I make a test for free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Do Stuff offers a free plan that allows you to create and share exams with basic features. Premium features are available for advanced needs."
        }
      },
      {
        "@type": "Question",
        "name": "What question types are available?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We support multiple choice, fill in the blank, translation, true/false, matching, and reading comprehension question types."
        }
      },
      {
        "@type": "Question",
        "name": "Is Do Stuff suitable for schools?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! Do Stuff is designed for teachers, schools, and educational institutions. We offer features specifically for classroom use and student management."
        }
      }
    ]
  };

  // Review Schema
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Review",
    "name": "Excellent Exam Platform",
    "reviewBody": "Do Stuff has revolutionized how I create and administer exams. The interface is intuitive and the features are comprehensive.",
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "5",
      "bestRating": "5",
      "worstRating": "1"
    },
    "author": {
      "@type": "Person",
      "name": "Sarah Johnson"
    },
    "datePublished": "2025-12-01",
    "publisher": {
      "@type": "Organization",
      "name": "Do Stuff"
    }
  };

  return (
    <Helmet>
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(productSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
      
      {pageType === 'homepage' && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}
      
      <script type="application/ld+json">
        {JSON.stringify(reviewSchema)}
      </script>

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title || "Do Stuff - The Ultimate Online Exam Platform"} />
      <meta property="og:description" content={description || "Create engaging assessments with our professional quiz builder. Perfect for teachers to make a test or online assessment easily."} />
      <meta property="og:type" content={pageType === 'homepage' ? "website" : "product"} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={`${baseUrl}/logo.png`} />
      <meta property="og:image:alt" content="Do Stuff Logo" />
      <meta property="og:site_name" content="Do Stuff" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@dostuff" />
      <meta name="twitter:creator" content="@dostuff" />
      <meta name="twitter:title" content={title || "Do Stuff - The Ultimate Online Exam Platform"} />
      <meta name="twitter:description" content={description || "Create engaging assessments with our professional quiz builder. Perfect for teachers to make a test or online assessment easily."} />
      <meta name="twitter:image" content={`${baseUrl}/logo.png`} />
      <meta name="twitter:image:alt" content="Do Stuff Logo" />

      {/* Additional Meta Tags for SEO */}
      <meta name="theme-color" content="#0B0B15" />
      <meta name="msapplication-TileColor" content="#0B0B15" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="canonical" href={currentUrl} />
      
      {/* Performance and Security Headers */}
      <meta httpEquiv="X-Frame-Options" content="DENY" />
      <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
      <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
      
      {/* Preconnect for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://cdn.tailwindcss.com" />
    </Helmet>
  );
};