import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Check, X, Zap, Crown, Sparkles, BarChart3, Users, FileText, PieChart } from 'lucide-react';
import { Button } from './ui/Button';
import { Helmet } from 'react-helmet-async';

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

// Professional visual for pricing cards (UI Mockups style)
const PricingVisual = ({ type }: { type: 'free' | 'pro' }) => {
    if (type === 'free') {
        return (
            <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none select-none opacity-20 mask-image-linear-gradient">
                {/* Abstract UI representation for Starter */}
                <div className="absolute -right-12 top-10 w-64 h-72 bg-[#1a1a1a] border border-white/10 rounded-xl transform rotate-[-12deg] p-4 flex flex-col gap-3 shadow-2xl">
                     {/* Fake Header */}
                     <div className="flex items-center gap-3 border-b border-white/5 pb-3">
                        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/5">
                            <FileText className="w-4 h-4 text-gray-400" />
                        </div>
                        <div className="flex-1 space-y-1.5">
                            <div className="w-16 h-2 bg-white/20 rounded-full" />
                            <div className="w-10 h-1.5 bg-white/10 rounded-full" />
                        </div>
                     </div>
                     {/* List Items */}
                     <div className="space-y-2.5">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="h-10 bg-white/5 rounded-lg flex items-center px-3 gap-3 border border-white/5">
                                <div className="w-2 h-2 rounded-full bg-white/20" />
                                <div className="flex-1 space-y-1">
                                    <div className="w-full h-1.5 bg-white/10 rounded-full" />
                                    <div className="w-2/3 h-1.5 bg-white/5 rounded-full" />
                                </div>
                            </div>
                        ))}
                     </div>
                </div>
            </div>
        );
    }

    // Pro Visual - Richer Dashboard UI
    return (
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none select-none opacity-30">
             {/* Glow effect */}
             <div className="absolute top-[-20%] right-[-20%] w-[300px] h-[300px] bg-brand-purple/20 blur-[80px] rounded-full" />
             
             {/* Dashboard Card */}
             <div className="absolute -right-16 top-6 w-72 h-80 bg-[#151515] border border-brand-purple/30 rounded-xl transform rotate-[-8deg] p-5 flex flex-col gap-4 shadow-[0_0_50px_rgba(139,92,246,0.15)]">
                 {/* Header */}
                 <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-brand-purple/20 flex items-center justify-center border border-brand-purple/30">
                            <BarChart3 className="w-4 h-4 text-brand-glow" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-white">Analytics</span>
                            <span className="text-[8px] text-gray-500 uppercase tracking-wider">Pro Features</span>
                        </div>
                    </div>
                 </div>
                 
                 {/* Chart Area */}
                 <div className="flex-1 bg-gradient-to-b from-white/5 to-transparent rounded-lg border border-white/5 relative overflow-hidden flex items-end justify-between px-3 pb-0 pt-6 gap-2">
                    {[40, 70, 50, 90, 60, 85, 75].map((h, i) => (
                        <div key={i} className="w-full relative group">
                            <div className="absolute bottom-0 w-full bg-gradient-to-t from-brand-purple/40 to-brand-glow rounded-t-sm transition-all duration-1000" style={{ height: `${h}%` }} />
                        </div>
                    ))}
                 </div>

                 {/* Stats Row */}
                 <div className="grid grid-cols-2 gap-2">
                     <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                         <div className="text-[9px] text-gray-500 mb-1">Students</div>
                         <div className="text-xs font-bold text-white flex items-center gap-1">
                             <Users className="w-3 h-3 text-brand-glow" /> ∞
                         </div>
                     </div>
                     <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                         <div className="text-[9px] text-gray-500 mb-1">Exams</div>
                         <div className="text-xs font-bold text-white flex items-center gap-1">
                             <PieChart className="w-3 h-3 text-brand-blue" /> ∞
                         </div>
                     </div>
                 </div>
             </div>
        </div>
    );
};

const PricingCard = ({ 
    title, 
    price, 
    originalPrice,
    features, 
    isPopular, 
    type,
    delay,
    onBack 
}: { 
    title: string; 
    price: string; 
    originalPrice?: string;
    features: { name: string; included: boolean }[]; 
    isPopular?: boolean;
    type: 'free' | 'pro';
    delay: number;
    onBack: () => void;
}) => {
    const [ref, isVisible] = useOnScreen({ threshold: 0.1 });

    return (
        <div ref={ref} className={`relative flex flex-col h-full w-full transition-all duration-1000 ease-[cubic-bezier(0.17,0.55,0.55,1)] ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        } ${isPopular ? 'z-10 scale-100' : ''}`} style={{ transitionDelay: `${delay}ms` }}>
            
            {isPopular && (
                <div className="absolute top-0 right-0 left-0 flex justify-center -mt-4 z-30">
                    <div className="flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-brand-purple to-brand-blue text-white text-xs font-bold uppercase tracking-widest rounded-full shadow-[0_4px_20px_rgba(139,92,246,0.4)] border border-white/20 transform translate-y-0">
                        <Crown className="w-3 h-3 fill-white" />
                        Most Popular
                    </div>
                </div>
            )}

            <div className={`relative p-8 md:p-10 rounded-[2.5rem] border flex flex-col h-full w-full overflow-hidden group hover:shadow-2xl transition-all duration-300 ${isPopular 
                ? 'bg-[#0f0f11] border-brand-purple/40 shadow-[0_0_60px_-15px_rgba(139,92,246,0.15)] ring-1 ring-white/5' 
                : 'bg-black/40 border-white/5 hover:border-white/10'
            }`}>
                {/* Background Visual Thumbnail */}
                <PricingVisual type={type} />

                <div className="relative z-10 flex flex-col h-full">
                    <h3 className={`text-lg font-medium mb-4 ${isPopular ? 'text-brand-glow' : 'text-gray-400'}`}>{title}</h3>
                    
                    <div className="flex items-end gap-3 mb-8">
                        <div className="flex flex-col">
                            {originalPrice && (
                                <span className="text-lg text-gray-500 line-through font-medium mb-1 decoration-white/20 decoration-2">{originalPrice}</span>
                            )}
                            <div className="flex items-baseline gap-1">
                                <span className="text-5xl md:text-6xl font-bold text-white tracking-tight">{price}</span>
                                {price !== 'Free' && <span className="text-gray-500 font-medium">/mo</span>}
                            </div>
                        </div>
                        {originalPrice && (
                            <div className="mb-2 px-2.5 py-1 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wide">
                                Save 37%
                            </div>
                        )}
                    </div>

                    <div className="space-y-5 mb-10 flex-1">
                        {features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-4 group/item">
                                <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 border transition-colors ${
                                    feature.included 
                                    ? (isPopular ? 'bg-brand-purple text-white border-brand-purple' : 'bg-white/10 text-gray-300 border-white/10') 
                                    : 'bg-transparent border-white/5 text-gray-700'
                                }`}>
                                    {feature.included ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                                </div>
                                <span className={`text-sm md:text-base transition-colors ${feature.included ? 'text-gray-300 group-hover/item:text-white' : 'text-gray-700 line-through'}`}>
                                    {feature.name}
                                </span>
                            </div>
                        ))}
                    </div>

                    <Button 
                        variant={isPopular ? 'primary' : 'secondary'} 
                        glow={isPopular} 
                        className={`w-full !py-4 !text-base !rounded-2xl ${isPopular ? 'hover:scale-[1.02]' : ''}`}
                        onClick={onBack}
                    >
                        {price === 'Free' ? 'Get Started' : 'Get Pro Teacher'}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export const PricingPage = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4 md:px-6 relative overflow-hidden flex flex-col items-center w-full">
        <Helmet>
            <title>Pricing - Free Online Quiz Maker & Test Generator</title>
            <meta name="description" content="Flexible pricing for our online quiz maker. Start for free. Affordable plans for professional exam software and test generators." />
            <meta name="keywords" content="quiz maker free online, test maker free, online exam software pricing, free online exam maker, quiz maker online free, test generator free" />
            <link rel="canonical" href="https://dostuff.com/pricing" />
        </Helmet>

        {/* Background Lights */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-purple/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-5xl w-full relative z-10">
             <button 
                onClick={onBack}
                className="mb-12 flex items-center gap-2 text-gray-400 hover:text-white transition-colors group px-4 py-2 rounded-full hover:bg-white/5"
            >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Back to Home</span>
            </button>

            <div className="text-center mb-16 animate-fade-in px-4">
                {/* SEO H1 */}
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                    Plans for our <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">Online Quiz Maker</span>
                </h1>
                
                <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                    Start with our <strong>quiz maker free online</strong> plan, then upgrade when you need more power. <br className="hidden md:block" />
                    All plans include core <strong>online exam</strong> features.
                </p>
            </div>

            {/* Changed grid to max 2 columns centered */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto px-2">
                <PricingCard 
                    title="Starter"
                    price="Free"
                    type="free"
                    delay={100}
                    onBack={onBack}
                    features={[
                        { name: "Up to 3 Exams", included: true },
                        { name: "50 Students per exam", included: true },
                        { name: "Basic Question Types", included: true },
                        { name: "Real-time Analytics", included: false },
                        { name: "Custom Branding", included: false },
                        { name: "Priority Support", included: false },
                    ]}
                />
                
                <PricingCard 
                    title="Pro Teacher"
                    originalPrice="$40"
                    price="$25"
                    isPopular
                    type="pro"
                    delay={300}
                    onBack={onBack}
                    features={[
                        { name: "Unlimited Exams", included: true },
                        { name: "Unlimited Students", included: true },
                        { name: "All 10+ Question Types", included: true },
                        { name: "Advanced Analytics & Exports", included: true },
                        { name: "Custom Branding & Themes", included: true },
                        { name: "Priority 24/7 Support", included: true },
                    ]}
                />
            </div>
        </div>
    </div>
  );
};