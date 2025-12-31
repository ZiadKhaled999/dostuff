import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckSquare, 
  Type, 
  Languages, 
  ToggleRight, 
  GitMerge, 
  BookOpen, 
  Timer, 
  FileCheck 
} from 'lucide-react';

const OrbitRing = ({ 
  radius, 
  duration, 
  reverse = false, 
  opacity = 0.2,
  children 
}: { 
  radius: number; 
  duration: string; 
  reverse?: boolean; 
  opacity?: number;
  children?: React.ReactNode; 
}) => {
  return (
    <div 
      className="absolute top-1/2 left-1/2 rounded-full border border-white/30 shadow-[0_0_20px_rgba(139,92,246,0.1)]"
      style={{
        width: radius * 2,
        height: radius * 2,
        marginLeft: -radius,
        marginTop: -radius,
        opacity: opacity,
      }}
    >
        {/* Rotating Container */}
        <div 
            className={`w-full h-full absolute top-0 left-0 ${reverse ? 'animate-spin-reverse-slow' : 'animate-spin-slow'}`}
            style={{ animationDuration: duration }}
        >
            {children}
        </div>
    </div>
  );
};

const ItemWrapper = ({ 
    angle, 
    children, 
    reverseRotation, 
    rotationDuration 
}: { 
    angle: number; 
    children?: React.ReactNode;
    reverseRotation: boolean;
    rotationDuration: string;
}) => {
    return (
        <div 
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            style={{ transform: `rotate(${angle}deg)` }}
        >
            <div className="absolute top-[-24px] left-1/2 -ml-[24px] pointer-events-auto">
                <div 
                    className={`${reverseRotation ? 'animate-spin-slow' : 'animate-spin-reverse-slow'}`}
                    style={{ animationDuration: rotationDuration }}
                >
                    {children}
                </div>
            </div>
        </div>
    )
}

const FeatureIcon = ({ icon: Icon, colorClass = "text-white" }: { icon: any, colorClass?: string }) => (
  <div className="w-12 h-12 rounded-xl bg-gray-900/80 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:scale-110 transition-transform duration-300 group">
    <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
    <Icon className={`w-6 h-6 ${colorClass}`} />
  </div>
);

const NumberCounter = ({ startDelay = 0 }: { startDelay: number }) => {
    const [displayNumber, setDisplayNumber] = useState(0);
    const [prevNumber, setPrevNumber] = useState<number | null>(null);
    const [isComplete, setIsComplete] = useState(false);
    const [startCounting, setStartCounting] = useState(false);

    useEffect(() => {
        // Initial delay before counting starts
        const timer = setTimeout(() => {
            setStartCounting(true);
        }, startDelay);
        return () => clearTimeout(timer);
    }, [startDelay]);

    useEffect(() => {
        if (!startCounting) return;

        let current = 0;
        // Slower interval to allow for the transition animation to be seen
        const interval = setInterval(() => {
            if (current < 10) {
                setPrevNumber(current);
                current += 1;
                setDisplayNumber(current);
            } else {
                clearInterval(interval);
                // Small delay before showing the plus to separate it from the last number increment
                setTimeout(() => setIsComplete(true), 300);
            }
        }, 250); // 250ms per number

        return () => clearInterval(interval);
    }, [startCounting]);

    return (
        <div className="relative flex items-center justify-center">
             <style>
                {`
                    @keyframes slideOutDown {
                        0% { opacity: 1; transform: translateY(0); }
                        100% { opacity: 0; transform: translateY(20px); }
                    }
                    @keyframes slideInDown {
                        0% { opacity: 0; transform: translateY(-20px); }
                        100% { opacity: 1; transform: translateY(0); }
                    }
                    .num-exit {
                        animation: slideOutDown 0.2s ease-in forwards;
                    }
                    .num-enter {
                        animation: slideInDown 0.2s ease-out forwards;
                    }
                `}
            </style>
            
            <h3 className="text-6xl font-bold text-white tracking-wide flex items-center h-20 overflow-hidden relative">
                
                {/* Number Container */}
                <div className="relative w-[1.5ch] h-full flex items-center justify-center">
                    {/* Previous Number (Exiting) */}
                    {prevNumber !== null && prevNumber !== displayNumber && (
                        <span key={`prev-${prevNumber}`} className="absolute inset-0 flex items-center justify-center num-exit tabular-nums">
                            {prevNumber}
                        </span>
                    )}
                    
                    {/* Current Number (Entering) */}
                    <span key={`curr-${displayNumber}`} className={`absolute inset-0 flex items-center justify-center tabular-nums ${prevNumber !== null ? 'num-enter' : ''}`}>
                        {displayNumber}
                    </span>
                </div>

                {/* Plus Sign */}
                <span className={`ml-1 bg-gradient-to-tr from-brand-glow to-brand-purple bg-clip-text text-transparent transform transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isComplete ? 'opacity-100 scale-100 translate-y-0 rotate-0' : 'opacity-0 scale-0 translate-y-4 -rotate-180'}`}>+</span>
            </h3>
        </div>
    );
};

export const OrbitalVisual: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        // We do not disconnect immediately to allow re-checking if needed, 
        // but for this animation we latch `isVisible` once true.
      }
    }, { threshold: 0.2 });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[600px] flex items-center justify-center overflow-visible">
        
        {/* Glow Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-purple/20 blur-[100px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-brand-blue/10 blur-[80px] rounded-full" />

        {/* Center Text */}
        <div className={`absolute z-10 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            {isVisible && <NumberCounter startDelay={800} />}
            <p className={`text-sm text-brand-glow font-bold uppercase tracking-[0.3em] mt-2 transition-opacity duration-1000 delay-[2000ms] ${isVisible ? 'opacity-100' : 'opacity-0'}`}>Format Types</p>
        </div>

        {/* Inner Ring */}
        <OrbitRing radius={180} duration="25s" opacity={0.6}>
            <ItemWrapper angle={0} reverseRotation={false} rotationDuration="25s">
                <FeatureIcon icon={CheckSquare} colorClass="text-emerald-400" />
            </ItemWrapper>
            <ItemWrapper angle={120} reverseRotation={false} rotationDuration="25s">
                <FeatureIcon icon={Type} colorClass="text-blue-400" />
            </ItemWrapper>
             <ItemWrapper angle={240} reverseRotation={false} rotationDuration="25s">
                <FeatureIcon icon={Languages} colorClass="text-pink-400" />
            </ItemWrapper>
        </OrbitRing>

        {/* Middle Ring */}
        <OrbitRing radius={280} duration="35s" reverse opacity={0.4}>
            <ItemWrapper angle={45} reverseRotation={true} rotationDuration="35s">
                 <FeatureIcon icon={ToggleRight} colorClass="text-amber-400" />
            </ItemWrapper>
            <ItemWrapper angle={160} reverseRotation={true} rotationDuration="35s">
                 <FeatureIcon icon={GitMerge} colorClass="text-purple-400" />
            </ItemWrapper>
             <ItemWrapper angle={280} reverseRotation={true} rotationDuration="35s">
                <FeatureIcon icon={BookOpen} colorClass="text-cyan-400" />
            </ItemWrapper>
        </OrbitRing>

        {/* Outer Ring */}
        <OrbitRing radius={400} duration="45s" opacity={0.25}>
            <ItemWrapper angle={90} reverseRotation={false} rotationDuration="45s">
                <FeatureIcon icon={Timer} colorClass="text-red-400" />
            </ItemWrapper>
             <ItemWrapper angle={210} reverseRotation={false} rotationDuration="45s">
                 <FeatureIcon icon={FileCheck} colorClass="text-lime-400" />
            </ItemWrapper>
        </OrbitRing>
        
    </div>
  );
};