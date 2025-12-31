import React, { useState, useEffect, useRef } from 'react';
import { Layers, Command, Aperture, Hexagon, Component } from 'lucide-react';

// Hook for detecting when element is in viewport
function useOnScreen(options: IntersectionObserverInit) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { threshold, root, rootMargin } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, { threshold, root, rootMargin });

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, root, rootMargin]);

  return [ref, isVisible] as const;
}

export const PartnerLogos: React.FC = () => {
  const logos = [
    { name: 'Dreamure', icon: Layers },
    { name: 'SWITCH.WIN', icon: Command },
    { name: 'sphere', icon: Aperture },
    { name: 'PinSpace', icon: Hexagon },
    { name: 'Visionix', icon: Component },
  ];

  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });

  return (
    <section 
        ref={ref}
        className={`w-full py-20 border-y border-white/5 bg-black/40 backdrop-blur-sm overflow-hidden transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        
        {/* Premium Title */}
        <h2 className="text-2xl md:text-3xl font-semibold tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-white/40 mb-14 text-center">
          Trusted by industry leaders
        </h2>
        
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
          {/* Marquee Container */}
          <div className="flex w-max gap-8 animate-scroll hover:[animation-play-state:paused] py-4">
            
            {/* Loop 3 times to ensure smooth infinite scrolling on large screens */}
            {[0, 1, 2].map((iteration) => (
              <React.Fragment key={iteration}>
                {logos.map((logo, index) => (
                  <div 
                    key={`${iteration}-${index}`} 
                    className="group relative flex items-center justify-center cursor-pointer"
                  >
                    <div className="relative flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-500 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 backdrop-blur-md">
                      {/* Icon */}
                      <logo.icon className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors duration-300 relative z-10" />
                      
                      {/* Text Label - Always Visible */}
                      <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-300 whitespace-nowrap relative z-10">
                        {logo.name}
                      </span>

                      {/* Glow Effect */}
                      <div className="absolute inset-0 bg-brand-purple/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    </div>
                  </div>
                ))}
              </React.Fragment>
            ))}
            
          </div>
        </div>
      </div>
    </section>
  );
};