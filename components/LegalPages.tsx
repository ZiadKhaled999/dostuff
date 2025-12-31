import React, { useState, useEffect } from 'react';
import { ArrowLeft, Mail, MessageCircle, FileText, Shield, Search, BookOpen, ArrowRight, Zap, Check, Lock, Globe, Scale } from 'lucide-react';
import { Button } from './ui/Button';
import { Helmet } from 'react-helmet-async';

interface LegalLayoutProps {
    title: string;
    icon: any;
    children?: React.ReactNode;
    onBack: () => void;
    lastUpdated?: string;
}

const LegalLayout = ({ title, icon: Icon, children, onBack, lastUpdated }: LegalLayoutProps) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setLoaded(true), 50);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 max-w-4xl mx-auto">
            <button 
                onClick={onBack}
                className="mb-12 flex items-center gap-2 text-gray-400 hover:text-white transition-colors group px-4 py-2 rounded-full hover:bg-white/5"
            >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Back to Home</span>
            </button>

            <div className={`transition-all duration-1000 transform ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="flex flex-col md:flex-row md:items-center gap-6 mb-12 border-b border-white/10 pb-8">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white shadow-[0_0_40px_rgba(255,255,255,0.05)]">
                        <Icon className="w-8 h-8" />
                    </div>
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">{title}</h1>
                        {lastUpdated && (
                            <p className="text-gray-400 text-sm flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                Last Updated: {lastUpdated}
                            </p>
                        )}
                    </div>
                </div>
                
                <div className="space-y-8">
                    {children}
                </div>
            </div>
        </div>
    );
};

const SectionCard = ({ title, children, index }: { title: string, children?: React.ReactNode, index: number }) => {
    const [loaded, setLoaded] = useState(false);
    
    useEffect(() => {
        const timer = setTimeout(() => setLoaded(true), 150 + (index * 100));
        return () => clearTimeout(timer);
    }, [index]);

    return (
        <div className={`p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-purple/20 text-brand-glow text-xs font-bold border border-brand-purple/20">{index + 1}</span>
                {title}
            </h3>
            <div className="text-gray-400 leading-relaxed text-base space-y-4">
                {children}
            </div>
        </div>
    );
}

export const PrivacyPolicy = ({ onBack }: { onBack: () => void }) => (
    <LegalLayout title="Privacy Policy" icon={Shield} onBack={onBack} lastUpdated="October 24, 2024">
        <Helmet>
            <title>Privacy Policy - Do Stuff | Data Protection & Security</title>
            <meta name="description" content="Read our Privacy Policy to understand how Do Stuff collects, uses, and protects your personal data and exam information." />
            <link rel="canonical" href="https://dostuff.com/privacy" />
        </Helmet>
        <p className="text-xl text-gray-300 leading-relaxed mb-8">
            This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
        </p>
        
        <SectionCard index={0} title="Interpretation and Definitions">
             <p>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
             <div className="mt-4 bg-black/20 p-4 rounded-xl border border-white/5 space-y-2 text-sm">
                 <p><strong>"Company"</strong> (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to Oryno.</p>
                 <p><strong>"Service"</strong> refers to the Website.</p>
                 <p><strong>"You"</strong> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</p>
             </div>
        </SectionCard>

        <SectionCard index={1} title="Collecting and Using Your Personal Data">
            <h4 className="text-white font-bold mb-2">Types of Data Collected</h4>
            <div className="space-y-4">
                <div>
                    <strong className="text-white block mb-1">Personal Data</strong>
                    <p>While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to: Email address, First name and last name, Usage Data.</p>
                </div>
                <div>
                    <strong className="text-white block mb-1">Usage Data</strong>
                    <p>Usage Data is collected automatically when using the Service. It may include information such as Your Device's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</p>
                </div>
            </div>
        </SectionCard>
        
        <SectionCard index={2} title="Retention of Your Personal Data">
            <p>The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies.</p>
        </SectionCard>

        <SectionCard index={3} title="Transfer of Your Personal Data">
            <p>Your information, including Personal Data, is processed at the Company's operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to — and maintained on — computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from Your jurisdiction.</p>
        </SectionCard>

         <SectionCard index={4} title="Security of Your Personal Data">
            <div className="flex items-start gap-4">
                <Lock className="w-10 h-10 text-brand-glow shrink-0" />
                <p>The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.</p>
            </div>
        </SectionCard>
        
        <SectionCard index={5} title="Links to Other Websites">
            <p>Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party's site. We strongly advise You to review the Privacy Policy of every site You visit.</p>
            <p className="mt-2">We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.</p>
        </SectionCard>
    </LegalLayout>
);

export const TermsOfService = ({ onBack }: { onBack: () => void }) => (
    <LegalLayout title="Terms of Service" icon={Scale} onBack={onBack} lastUpdated="October 24, 2024">
         <Helmet>
            <title>Terms of Service - Do Stuff | User Agreement</title>
            <meta name="description" content="Review the Terms of Service for using the Do Stuff online exam platform. Understand your rights, obligations, and usage rules." />
            <link rel="canonical" href="https://dostuff.com/terms" />
        </Helmet>
         <p className="text-xl text-gray-300 leading-relaxed mb-8">
             Please read these terms and conditions carefully before using Our Service.
         </p>

         <SectionCard index={0} title="Interpretation and Definitions">
             <p>The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>
             <div className="mt-4 bg-black/20 p-4 rounded-xl border border-white/5 space-y-2 text-sm">
                <p><strong>"Affiliate"</strong> means an entity that controls, is controlled by or is under common control with a party.</p>
                <p><strong>"Service"</strong> refers to the Website.</p>
                <p><strong>"Terms and Conditions"</strong> (also referred as "Terms") mean these Terms and Conditions that form the entire agreement between You and the Company regarding the use of the Service.</p>
             </div>
         </SectionCard>
         
         <SectionCard index={1} title="Acknowledgment">
             <p>These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.</p>
             <p className="mt-4">Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service.</p>
         </SectionCard>

         <SectionCard index={2} title="Links to Other Websites">
             <p>Our Service may contain links to third-party web sites or services that are not owned or controlled by the Company.</p>
             <p className="mt-2">The Company has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods or services available on or through any such web sites or services.</p>
         </SectionCard>
         
         <SectionCard index={3} title="Termination">
             <p>We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions. Upon termination, Your right to use the Service will cease immediately.</p>
         </SectionCard>

         <SectionCard index={4} title="Limitation of Liability">
             <p>Notwithstanding any damages that You might incur, the entire liability of the Company and any of its suppliers under any provision of this Terms and Your exclusive remedy for all of the foregoing shall be limited to the amount actually paid by You through the Service or 100 USD if You haven't purchased anything through the Service.</p>
             <p className="mt-2 text-sm text-gray-500">To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, loss of data or other information, for business interruption, for personal injury, loss of privacy arising out of or in any way related to the use of or inability to use the Service).</p>
         </SectionCard>

         <SectionCard index={5} title="Governing Law">
             <p>The laws of the Country, excluding its conflicts of law rules, shall govern this Terms and Your use of the Service. Your use of the Application may also be subject to other local, state, national, or international laws.</p>
         </SectionCard>
         
         <SectionCard index={6} title="Changes to These Terms">
             <p>We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material We will make reasonable efforts to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at Our sole discretion.</p>
         </SectionCard>
    </LegalLayout>
);

export const Support = ({ onBack }: { onBack: () => void }) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        // Trigger entrance animation
        const timer = setTimeout(() => setLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <LegalLayout title="Support Center" icon={MessageCircle} onBack={onBack}>
            <Helmet>
                <title>Support Center - Do Stuff | Help & Documentation</title>
                <meta name="description" content="Get help with Do Stuff exam platform. Access our knowledge base, tutorials, and support resources for teachers and students." />
                <link rel="canonical" href="https://dostuff.com/support" />
            </Helmet>
            <div className={`transition-all duration-1000 transform ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                <p className="text-xl text-gray-400 mb-12 max-w-2xl leading-relaxed">
                    Welcome to our support hub. Access our extensive knowledge base to master the platform, troubleshoot issues, and discover advanced features.
                </p>
                
                {/* Knowledge Base Card */}
                <div className="not-prose group relative w-full overflow-hidden rounded-[2.5rem] bg-gradient-to-b from-[#1a1a1a] to-black border border-white/10 hover:border-brand-purple/50 transition-all duration-500 hover:shadow-[0_0_80px_rgba(139,92,246,0.15)]">
                    {/* Background Glows */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-purple/20 blur-[120px] rounded-full pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay" />
                    
                    {/* Coming Soon Badge */}
                    <div className="absolute top-6 right-6 z-20">
                        <div className="px-4 py-1.5 rounded-full bg-white/10 border border-white/10 backdrop-blur-md text-xs font-bold text-white uppercase tracking-wider shadow-lg">
                            Coming Soon
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 p-8 md:p-12 relative z-10 items-center">
                        {/* Content */}
                        <div className="flex flex-col gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-glow shadow-[0_0_30px_rgba(139,92,246,0.2)] group-hover:scale-110 transition-transform duration-500">
                                <BookOpen className="w-8 h-8" />
                            </div>
                            
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Knowledge Base</h2>
                                <p className="text-gray-400 text-lg leading-relaxed">
                                    Step-by-step guides, video tutorials, and best practices to help you get the most out of Do Stuff.
                                </p>
                            </div>

                            <div className="flex flex-col gap-3 mt-4">
                                {['Getting Started Guide', 'Teacher Resources', 'Student FAQs', 'Video Tutorials'].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 text-gray-500 cursor-not-allowed">
                                        <div className="w-1.5 h-1.5 rounded-full bg-gray-700" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>

                            <Button variant="secondary" className="mt-6 w-fit opacity-50 cursor-not-allowed border-white/5 hover:bg-transparent" disabled>
                                Visit Knowledge Base
                            </Button>
                        </div>

                        {/* Visual Thumbnail */}
                        <div className="relative h-[400px] w-full perspective-1000 hidden md:block opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700">
                            {/* Floating Mockup */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm aspect-[4/5] bg-[#0A0A0A] rounded-2xl border border-white/10 shadow-2xl transform rotate-y-[-12deg] rotate-x-[5deg] translate-x-4 transition-all duration-700 ease-out overflow-hidden flex flex-col">
                                {/* Header */}
                                <div className="h-12 border-b border-white/5 bg-white/5 flex items-center px-4 gap-2">
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
                                    </div>
                                    <div className="flex-1 flex justify-center">
                                        <div className="h-6 w-48 bg-black/40 rounded-md flex items-center justify-center gap-2 text-[10px] text-gray-500 border border-white/5">
                                            <Search className="w-3 h-3" />
                                            <span>Search docs...</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="flex-1 p-5 flex gap-4">
                                    {/* Sidebar */}
                                    <div className="w-1/4 space-y-2.5 hidden sm:block pt-2">
                                        <div className="h-1.5 w-12 bg-gray-700 rounded-full mb-3" />
                                        {[1,2,3,4,5].map(i => (
                                            <div key={i} className={`h-1.5 w-full rounded-full ${i === 2 ? 'bg-brand-purple/50' : 'bg-white/5'}`} />
                                        ))}
                                    </div>
                                    
                                    {/* Main Content */}
                                    <div className="flex-1 space-y-4">
                                        <div className="space-y-2">
                                            <div className="h-20 w-full bg-gradient-to-br from-brand-purple/20 to-brand-blue/5 rounded-lg border border-white/5 flex flex-col justify-end p-3">
                                                <div className="h-2 w-16 bg-white/20 rounded-full" />
                                            </div>
                                            <div className="flex gap-2">
                                                <div className="h-2 w-full bg-white/10 rounded-full" />
                                                <div className="h-2 w-2/3 bg-white/10 rounded-full" />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="aspect-square rounded-lg bg-white/5 border border-white/5 p-2 flex flex-col justify-between">
                                                <div className="w-6 h-6 rounded bg-brand-blue/20" />
                                                <div className="h-1.5 w-10 bg-white/10 rounded-full" />
                                            </div>
                                            <div className="aspect-square rounded-lg bg-white/5 border border-white/5 p-2 flex flex-col justify-between">
                                                <div className="w-6 h-6 rounded bg-brand-glow/20" />
                                                <div className="h-1.5 w-10 bg-white/10 rounded-full" />
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-1.5 pt-2">
                                            <div className="h-1.5 w-full bg-white/5 rounded-full" />
                                            <div className="h-1.5 w-full bg-white/5 rounded-full" />
                                            <div className="h-1.5 w-3/4 bg-white/5 rounded-full" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Floating Elements */}
                            <div className="absolute bottom-8 -left-4 p-3 rounded-xl bg-[#111] border border-white/10 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] flex items-center gap-3 transform group-hover:-translate-y-4 transition-transform duration-700 delay-100 z-20">
                                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                                    <Zap className="w-4 h-4" />
                                </div>
                                <div className="pr-2">
                                    <div className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">System</div>
                                    <div className="text-xs font-bold text-white">Operational</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </LegalLayout>
    );
};

export const ContactUs = ({ onBack }: { onBack: () => void }) => (
    <LegalLayout title="Contact Us" icon={Mail} onBack={onBack}>
        <Helmet>
            <title>Contact Us - Do Stuff | Get in Touch</title>
            <meta name="description" content="Contact the Do Stuff team for inquiries, support, or feedback. We're here to help you with your online assessment needs." />
            <link rel="canonical" href="https://dostuff.com/contact" />
        </Helmet>
        <p className="text-xl">We'd love to hear from you. Fill out the form below or send us an email.</p>
        
        <form className="space-y-6 not-prose max-w-lg mt-8">
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-brand-purple focus:outline-none focus:ring-1 focus:ring-brand-purple" placeholder="Your name" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input type="email" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-brand-purple focus:outline-none focus:ring-1 focus:ring-brand-purple" placeholder="your@email.com" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                <textarea rows={4} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-brand-purple focus:outline-none focus:ring-1 focus:ring-brand-purple" placeholder="How can we help?" />
            </div>
            <Button variant="primary" glow className="w-full !py-3">Send Message</Button>
        </form>
        
        <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-sm">
                <strong>Email:</strong> support@dostuff.com<br/>
                <strong>Address:</strong> 123 Innovation Dr, Tech City, TC 90210
            </p>
        </div>
    </LegalLayout>
);