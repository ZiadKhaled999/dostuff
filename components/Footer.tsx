import React from 'react';
import { Logo } from './Logo';

export const Footer: React.FC<{ onNavigate: (id: string) => void }> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-white/10 bg-black py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            
            <div className="flex flex-col items-center md:items-start gap-4">
                <Logo />
                <p className="text-gray-500 text-sm max-w-xs text-center md:text-left">
                    The ultimate exam platform for teachers and students. Create engaging assessments and track progress with ease.
                </p>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-400">
                <button onClick={() => onNavigate('support')} className="hover:text-white transition-colors">Support</button>
                <a href="https://oryno-co.pages.dev/contact" className="hover:text-white transition-colors">Contact Us</a>
                <button onClick={() => onNavigate('privacy')} className="hover:text-white transition-colors">Privacy Policy</button>
                <button onClick={() => onNavigate('terms')} className="hover:text-white transition-colors">Terms of Service</button>
            </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center text-xs text-gray-600">
            © 2025 Do Stuff. All rights reserved.
        </div>
    </footer>
  );
};