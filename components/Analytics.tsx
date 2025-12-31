import React, { useEffect } from 'react';

interface AnalyticsProps {
  gaMeasurementId?: string;
  gtmId?: string;
}

export const Analytics: React.FC<AnalyticsProps> = ({ 
  gaMeasurementId = 'G-XXXXXXXXXX', 
  gtmId = 'GTM-XXXXXXX' 
}) => {
  useEffect(() => {
    // Google Analytics 4
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaMeasurementId}', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname,
        custom_map: {
          'custom_parameter_1': 'user_type',
          'custom_parameter_2': 'exam_type'
        }
      });
    `;
    document.head.appendChild(script2);

    // Google Tag Manager
    const script3 = document.createElement('script');
    script3.innerHTML = `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${gtmId}');
    `;
    document.head.appendChild(script3);

    // Meta Pixel (Facebook)
    const script4 = document.createElement('script');
    script4.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', 'YOUR_PIXEL_ID');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(script4);

    // LinkedIn Insight Tag
    const script5 = document.createElement('script');
    script5.innerHTML = `
      _linkedin_data_partner_id = "YOUR_LINKEDIN_PARTNER_ID";
      (function(){var s = document.getElementsByTagName("script")[0];
      var b = document.createElement("script");
      b.type = "text/javascript";b.async = true;
      b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
      s.parentNode.insertBefore(b, s);})();
    `;
    document.head.appendChild(script5);

    // Microsoft Clarity
    const script6 = document.createElement('script');
    script6.innerHTML = `
      (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "YOUR_CLARITY_PROJECT_ID");
    `;
    document.head.appendChild(script6);

    return () => {
      // Cleanup scripts if needed
      document.head.removeChild(script1);
      document.head.removeChild(script2);
      document.head.removeChild(script3);
      document.head.removeChild(script4);
      document.head.removeChild(script5);
      document.head.removeChild(script6);
    };
  }, [gaMeasurementId, gtmId]);

  return (
    <>
      {/* Google Tag Manager noscript fallback */}
      <noscript>
        <iframe 
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0" 
          width="0" 
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
      
      {/* Meta Pixel noscript fallback */}
      <noscript>
        <img 
          height="1" 
          width="1" 
          style={{ display: 'none' }}
          src="https://www.facebook.com/tr?id=YOUR_PIXEL_ID&ev=PageView&noscript=1"
          alt=""
        />
      </noscript>
    </>
  );
};

// Event tracking functions
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, parameters);
  }
};

export const trackPageView = (pagePath: string, pageTitle?: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', 'GA_MEASUREMENT_ID', {
      page_path: pagePath,
      page_title: pageTitle || document.title
    });
  }
};

export const trackConversion = (conversionId: string, value?: number, currency?: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'conversion', {
      send_to: conversionId,
      value: value,
      currency: currency || 'USD'
    });
  }
};