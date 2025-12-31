import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  UserPlus, 
  PenTool, 
  Settings, 
  Share2, 
  BarChart3, 
  LogIn, 
  Play, 
  CheckSquare, 
  Clock, 
  Trophy,
  CheckCircle2,
  Users,
  UserCog,
  Type, 
  Globe, 
  ToggleRight, 
  GitMerge, 
  BookOpen,
  MousePointer2,
  Smartphone
} from 'lucide-react';
import { Button } from './ui/Button';
import { Helmet } from 'react-helmet-async';

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

const AnimatedSection = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
    const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
    return (
        <div 
            ref={ref} 
            className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

interface TimelineStepProps { 
    step: number;
    data: any;
    index: number;
    isLast: boolean;
}

const TimelineStep: React.FC<TimelineStepProps> = ({ 
    step, 
    data, 
    index, 
    isLast 
}) => {
    const [ref, isVisible] = useOnScreen({ threshold: 0.2, rootMargin: '-10% 0px -10% 0px' });
    
    return (
        <div ref={ref} className="relative flex gap-4 md:gap-12 group">
            {/* Timeline Line */}
            <div className="flex flex-col items-center shrink-0">
                <div className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center shrink-0 border transition-all duration-700 z-10 animate-float ${
                    isVisible 
                    ? 'bg-brand-purple border-brand-glow shadow-[0_0_30px_rgba(139,92,246,0.4)] scale-110' 
                    : 'bg-black/50 border-white/10 text-gray-500 scale-100'
                }`} style={{ animationDelay: `${index * 0.5}s` }}>
                    <span className="text-lg md:text-2xl font-bold text-white">{step}</span>
                </div>
                {!isLast && (
                    <div className="flex-1 w-0.5 bg-white/10 my-4 relative overflow-hidden">
                        <div className={`absolute top-0 left-0 w-full bg-brand-glow/50 transition-all duration-1000 ${isVisible ? 'h-full' : 'h-0'}`} />
                    </div>
                )}
            </div>

            {/* Content Card */}
            <div className={`flex-1 pb-10 md:pb-16 transition-all duration-700 min-w-0 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}>
                <div className="bg-white/5 border border-white/5 rounded-3xl p-5 md:p-8 hover:bg-white/10 hover:border-white/10 transition-colors group relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                         <div className="w-24 h-24 bg-brand-purple/50 rounded-full blur-2xl" />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4 mb-4 justify-between relative z-10">
                        <h3 className="text-xl md:text-2xl font-bold">{data.title}</h3>
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 text-xs md:text-sm text-brand-glow font-medium w-fit">
                            <Clock className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            {data.duration}
                        </div>
                    </div>
                    
                    <p className="text-gray-400 text-base md:text-lg mb-6 leading-relaxed relative z-10">
                        {data.description}
                    </p>

                    <ul className="space-y-3 relative z-10">
                        {data.points.map((point: string, idx: number) => (
                            <li key={idx} className="flex items-start md:items-center gap-3 text-sm md:text-base text-gray-300">
                                <div className={`w-1.5 h-1.5 rounded-full mt-1.5 md:mt-0 shrink-0 ${isVisible ? 'bg-brand-purple' : 'bg-gray-600'}`} />
                                {point}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

const FeatureItem = ({ label, isTeacher }: { label: string, isTeacher?: boolean }) => (
    <div className={`flex items-center gap-4 p-4 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] ${
        isTeacher 
        ? 'bg-brand-purple/5 border-brand-purple/10 hover:bg-brand-purple/10 hover:border-brand-purple/30' 
        : 'bg-brand-blue/5 border-brand-blue/10 hover:bg-brand-blue/10 hover:border-brand-blue/30'
    }`}>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isTeacher ? 'bg-brand-purple/20' : 'bg-brand-blue/20'}`}>
            {isTeacher ? <CheckCircle2 className="w-5 h-5 text-brand-glow" /> : <CheckCircle2 className="w-5 h-5 text-brand-blue" />}
        </div>
        <span className="text-gray-200 font-medium text-sm md:text-base">{label}</span>
    </div>
);

const QuestionTypeCard = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
    <div className="p-6 rounded-2xl bg-black/40 border border-white/10 flex flex-col items-center text-center hover:bg-white/5 transition-colors group cursor-default h-full">
        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 text-brand-glow group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
            <Icon className="w-6 h-6" />
        </div>
        <h4 className="font-bold text-white mb-2">{title}</h4>
        <p className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors">{desc}</p>
    </div>
);

export const HowItWorks = ({ onBack, onNavigate }: { onBack: () => void, onNavigate: (id: string) => void }) => {
  const [activeTab, setActiveTab] = useState<'teacher' | 'student'>('teacher');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
  }, []);

  const teacherSteps = [
      {
          title: "Sign Up & Verify",
          duration: "2 minutes",
          description: "Create your teacher account with OTP verification for security. Set up your profile and institution details.",
          points: [
              "Enter your email", 
              "Receive OTP verification code", 
              "Complete your profile setup", 
              "Choose your institution"
          ]
      },
      {
          title: "Create Your Exam",
          duration: "10-15 minutes",
          description: "Build engaging exams with multiple question types. Customize appearance, set timers, and configure settings.",
          points: [
              "Choose from 10+ question types", 
              "Add questions", 
              "Set time limits and attempts", 
              "Customize exam appearance"
          ]
      },
      {
          title: "Configure Settings",
          duration: "5 minutes",
          description: "Fine-tune your exam with advanced settings like randomization, scoring rules, and accessibility options.",
          points: [
              "Enable question timer", 
              "Set passing scores", 
              "Configure auto-submission", 
              "Add exam instructions"
          ]
      },
      {
          title: "Share & Monitor",
          duration: "1 minute",
          description: "Generate shareable links and monitor student progress in real-time with detailed analytics dashboard.",
          points: [
              "Copy shareable exam link", 
              "Send to students", 
              "Monitor live exam progress", 
              "Track completion rates"
          ]
      },
      {
          title: "Review Results",
          duration: "5-10 minutes",
          description: "Analyze student performance with comprehensive analytics, export reports, and provide detailed feedback.",
          points: [
              "View detailed score breakdowns", 
              "Identify common mistakes", 
              "Generate performance reports"
          ]
      }
  ];

  const studentSteps = [
      {
          title: "Join Exam",
          duration: "30 seconds",
          description: "Click the exam link shared by your teacher or enter the exam code to join instantly.",
          points: [
              "Click exam link or enter code", 
              "Enter your name and details", 
              "No complex registration required", 
              "Get started immediately"
          ]
      },
      {
          title: "Start Assessment",
          duration: "Variable",
          description: "Begin your exam with clear instructions and timer. Navigate through questions at your own pace.",
          points: [
              "Review exam instructions", 
              "Start when ready", 
              "Navigate freely between questions", 
              "Auto-save your progress"
          ]
      },
      {
          title: "Answer Questions",
          duration: "Exam duration",
          description: "Tackle various question types including multiple choice, fill-in-the-blank, translations, and more.",
          points: [
              "Multiple choice questions", 
              "Fill in the blank responses", 
              "Translation exercises", 
              "True/false statements"
          ]
      },
      {
          title: "Time Management",
          duration: "Continuous",
          description: "Keep track of remaining time with visual countdown. Submit automatically or manually when finished.",
          points: [
              "See countdown timer", 
              "Get time warnings", 
              "Auto-submit at deadline", 
              "Submit early if ready"
          ]
      },
      {
          title: "Get Results",
          duration: "Immediate",
          description: "Receive instant feedback with detailed results, explanations, and performance insights.",
          points: [
              "Instant score display", 
              "Detailed answer review", 
              "Performance analytics", 
              "Track improvement over time"
          ]
      }
  ];

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-20 px-4 md:px-6 relative overflow-hidden bg-[#050505] w-full">
         <Helmet>
            <title>How to Make an Online Quiz - Online Examination Software</title>
            <meta name="description" content="Learn how to make an online quiz in minutes. Our online examination software is the easiest way to make a test and track results." />
            <meta name="keywords" content="making a quiz online, make an online quiz, online examination software, how to do online examination, online test system, online examination tool" />
            <link rel="canonical" href="https://dostuff.com/how-it-works" />
         </Helmet>

         {/* Background Elements */}
         <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-brand-purple/5 rounded-full blur-[120px] pointer-events-none animate-pulse" />
         <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none" />
         
         <div className={`max-w-5xl mx-auto relative z-10 transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
            <button 
                onClick={onBack}
                className="mb-8 flex items-center gap-2 text-gray-400 hover:text-white transition-colors group px-4 py-2 rounded-full hover:bg-white/5"
            >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Back to Home</span>
            </button>

            {/* Header */}
            <div className="text-center mb-12 md:mb-16">
                <span className="text-brand-glow font-bold tracking-widest uppercase text-xs md:text-sm mb-4 block animate-float">Complete Platform Guide</span>
                
                {/* SEO H1 */}
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">How to Make an Online Quiz</h1>
                
                <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 px-2">
                    A complete guide for teachers and students. Learn how to <strong>make an online quiz</strong>, take exams, and analyze results with our easy-to-use <strong>online examination software</strong>.
                </p>

                {/* Role Toggles */}
                <div className="inline-flex flex-wrap justify-center p-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl relative shadow-2xl max-w-full">
                    {/* Sliding Background */}
                    <div 
                        className={`absolute top-1.5 bottom-1.5 rounded-full bg-brand-purple shadow-lg transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] z-0 ${
                            activeTab === 'teacher' ? 'left-1.5 w-[calc(50%-6px)]' : 'left-[calc(50%+3px)] w-[calc(50%-4.5px)]'
                        }`} 
                    />
                    
                    <button 
                        onClick={() => setActiveTab('teacher')}
                        className={`relative z-10 px-5 py-2.5 md:px-8 md:py-3 rounded-full text-sm md:text-base font-bold transition-colors duration-300 flex items-center gap-2 flex-1 justify-center ${activeTab === 'teacher' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                    >
                        <UserCog className="w-4 h-4" />
                        <span className="whitespace-nowrap">Start as Teacher</span>
                    </button>
                    <button 
                        onClick={() => setActiveTab('student')}
                        className={`relative z-10 px-5 py-2.5 md:px-8 md:py-3 rounded-full text-sm md:text-base font-bold transition-colors duration-300 flex items-center gap-2 flex-1 justify-center ${activeTab === 'student' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                    >
                        <Users className="w-4 h-4" />
                        <span className="whitespace-nowrap">Join as Student</span>
                    </button>
                </div>
            </div>

            {/* Hero Role Description */}
            <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20 min-h-[160px] md:min-h-[160px]">
                <div className={`transition-all duration-500 transform ${activeTab === 'teacher' ? 'opacity-100 translate-y-0 relative' : 'opacity-0 translate-y-4 absolute top-0 left-0 right-0 pointer-events-none'}`}>
                    <h2 className="text-2xl font-bold mb-3 text-white">Teacher Workflow</h2>
                    <p className="text-gray-400 mb-6">From creating your account to analyzing results - here's everything you need to know about using Do Stuff as a teacher.</p>
                    <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                        <span className="px-3 py-1 bg-brand-purple/10 text-brand-glow text-[10px] md:text-xs font-bold uppercase tracking-wider rounded border border-brand-purple/20">10+ Question Types</span>
                        <span className="px-3 py-1 bg-brand-purple/10 text-brand-glow text-[10px] md:text-xs font-bold uppercase tracking-wider rounded border border-brand-purple/20">Real-time Analytics</span>
                        <span className="px-3 py-1 bg-brand-purple/10 text-brand-glow text-[10px] md:text-xs font-bold uppercase tracking-wider rounded border border-brand-purple/20">Custom Branding</span>
                        <span className="px-3 py-1 bg-brand-purple/10 text-brand-glow text-[10px] md:text-xs font-bold uppercase tracking-wider rounded border border-brand-purple/20">Easy Sharing</span>
                    </div>
                </div>
                <div className={`transition-all duration-500 transform ${activeTab === 'student' ? 'opacity-100 translate-y-0 relative' : 'opacity-0 translate-y-4 absolute top-0 left-0 right-0 pointer-events-none'}`}>
                    <h2 className="text-2xl font-bold mb-3 text-white">Student Experience</h2>
                    <p className="text-gray-400 mb-6">Taking exams has never been easier. Learn how to join, take, and get results from your exams.</p>
                     <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                        <span className="px-3 py-1 bg-brand-blue/10 text-brand-blue text-[10px] md:text-xs font-bold uppercase tracking-wider rounded border border-brand-blue/20">Instant Results</span>
                        <span className="px-3 py-1 bg-brand-blue/10 text-brand-blue text-[10px] md:text-xs font-bold uppercase tracking-wider rounded border border-brand-blue/20">Interactive Questions</span>
                        <span className="px-3 py-1 bg-brand-blue/10 text-brand-blue text-[10px] md:text-xs font-bold uppercase tracking-wider rounded border border-brand-blue/20">Progress Tracking</span>
                        <span className="px-3 py-1 bg-brand-blue/10 text-brand-blue text-[10px] md:text-xs font-bold uppercase tracking-wider rounded border border-brand-blue/20">No Registration</span>
                    </div>
                </div>
            </div>

            {/* Timeline */}
            <div className="max-w-4xl mx-auto mb-20 md:mb-32 relative">
                 {/* Timeline Line Background */}
                 <div className="absolute left-[23px] md:left-[31px] top-0 bottom-0 w-0.5 bg-white/5 z-0" />

                 <div className={activeTab === 'teacher' ? 'block' : 'hidden'}>
                     {teacherSteps.map((step, idx) => (
                         <TimelineStep key={`teacher-${idx}`} index={idx} step={idx + 1} data={step} isLast={idx === teacherSteps.length - 1} />
                     ))}
                 </div>

                 <div className={activeTab === 'student' ? 'block' : 'hidden'}>
                     {studentSteps.map((step, idx) => (
                         <TimelineStep key={`student-${idx}`} index={idx} step={idx + 1} data={step} isLast={idx === studentSteps.length - 1} />
                     ))}
                 </div>
            </div>

            {/* Question Types Grid */}
            <div className="mb-20 md:mb-32">
                 <AnimatedSection className="text-center mb-10 md:mb-12">
                     <h2 className="text-2xl md:text-3xl font-bold mb-4">Question Types</h2>
                     <p className="text-gray-400 px-4">Support for diverse question formats to create engaging and comprehensive assessments.</p>
                 </AnimatedSection>
                 <AnimatedSection delay={200}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                        <QuestionTypeCard icon={MousePointer2} title="Multiple Choice" desc="Select the correct answer from options" />
                        <QuestionTypeCard icon={PenTool} title="Fill in the Blank" desc="Type the missing word or phrase" />
                        <QuestionTypeCard icon={Globe} title="Translation" desc="Translate between Arabic and English" />
                        <QuestionTypeCard icon={ToggleRight} title="True or False" desc="Choose right or wrong statements" />
                        <QuestionTypeCard icon={GitMerge} title="Matching" desc="Connect related items" />
                        <QuestionTypeCard icon={BookOpen} title="Reading Comp." desc="Answer questions about passages" />
                    </div>
                 </AnimatedSection>
            </div>

            {/* Platform Features Comparison */}
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-24">
                <AnimatedSection className="bg-white/5 rounded-3xl p-6 md:p-8 border border-white/10 hover:border-brand-purple/30 transition-colors h-full">
                    <h3 className="text-xl md:text-2xl font-bold mb-8 text-white flex items-center gap-3">
                        <UserCog className="w-6 h-6 md:w-8 md:h-8 text-brand-glow" />
                        Teacher Features
                    </h3>
                    <div className="flex flex-col gap-4">
                        <FeatureItem isTeacher label="Create exams with 10+ question types" />
                        <FeatureItem isTeacher label="Customize exam appearance and branding" />
                        <FeatureItem isTeacher label="Set time limits and attempt restrictions" />
                        <FeatureItem isTeacher label="Real-time monitoring during exams" />
                        <FeatureItem isTeacher label="Detailed analytics and reporting" />
                        <FeatureItem isTeacher label="One-click exam sharing" />
                        <FeatureItem isTeacher label="Custom scoring rules" />
                    </div>
                </AnimatedSection>
                
                <AnimatedSection delay={200} className="bg-white/5 rounded-3xl p-6 md:p-8 border border-white/10 hover:border-brand-blue/30 transition-colors h-full">
                    <h3 className="text-xl md:text-2xl font-bold mb-8 text-white flex items-center gap-3">
                        <Users className="w-6 h-6 md:w-8 md:h-8 text-brand-blue" />
                        Student Benefits
                    </h3>
                    <div className="flex flex-col gap-4">
                        <FeatureItem label="Join exams easily" />
                        <FeatureItem label="Clean, distraction-free interface" />
                        <FeatureItem label="Progress saving automatically" />
                        <FeatureItem label="Multiple device compatibility" />
                        <FeatureItem label="Accessible on mobile and desktop" />
                        <FeatureItem label="Detailed performance tracking" />
                        <FeatureItem label="Exam history and statistics" />
                        <FeatureItem label="Learn from explanations" />
                    </div>
                </AnimatedSection>
            </div>

            {/* CTA */}
            <AnimatedSection>
                <div className="text-center bg-gradient-to-br from-brand-purple/20 to-black rounded-3xl p-8 md:p-12 border border-white/10 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                    <div className="relative z-10">
                        <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to Get Started?</h2>
                        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
                            Join thousands of teachers and students who are already using Do Stuff to create better learning experiences.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button 
                                variant="primary" 
                                glow 
                                className="!py-3 !px-8 text-lg w-full sm:w-auto" 
                                onClick={() => onNavigate('pricing')}
                            >
                                Start Creating Exams
                            </Button>
                            <Button 
                                variant="secondary" 
                                className="!py-3 !px-8 text-lg w-full sm:w-auto" 
                                onClick={() => onNavigate('download')}
                            >
                                Join Your First Exam
                            </Button>
                        </div>
                    </div>
                </div>
            </AnimatedSection>
         </div>
    </div>
  );
};