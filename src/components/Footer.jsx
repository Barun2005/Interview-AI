import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Shield, Terminal, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-[#070a12] text-slate-400 py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Column 1: Brand Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-lg font-bold text-white font-heading">InterviewAI</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            The next-generation AI mock interview & preparation platform. Practice technical, HR, coding, and system design interviews with voice synthesis and real-time analytics.
          </p>
          <div className="flex items-center gap-3 text-xs text-slate-500 font-mono">
            <span className="flex items-center gap-1"><Shield className="w-3.5 h-3.5 text-emerald-400" /> Enterprise Encrypted</span>
            <span className="flex items-center gap-1"><Terminal className="w-3.5 h-3.5 text-indigo-400" /> API v2.4</span>
          </div>
        </div>

        {/* Column 2: Core Platform Modules */}
        <div>
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono mb-3">Platform Modules</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/mock-interview" className="hover:text-indigo-400 transition">AI Voice Interview Room</Link></li>
            <li><Link to="/coding-interview" className="hover:text-indigo-400 transition">Interactive Coding Lab</Link></li>
            <li><Link to="/resume-analyzer" className="hover:text-indigo-400 transition">ATS Resume Analyzer</Link></li>
            <li><Link to="/hr-coach" className="hover:text-indigo-400 transition">AI HR & Career Coach</Link></li>
            <li><Link to="/company-library" className="hover:text-indigo-400 transition">Company Question Library</Link></li>
          </ul>
        </div>

        {/* Column 3: Top Companies Prep */}
        <div>
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono mb-3">Target Companies</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/company-library" className="hover:text-indigo-400 transition">Google Technical Interview</Link></li>
            <li><Link to="/company-library" className="hover:text-indigo-400 transition">Amazon Leadership Principles</Link></li>
            <li><Link to="/company-library" className="hover:text-indigo-400 transition">Meta System Design Practice</Link></li>
            <li><Link to="/company-library" className="hover:text-indigo-400 transition">Apple Frontend Architecture</Link></li>
            <li><Link to="/company-library" className="hover:text-indigo-400 transition">Microsoft Coding Assessment</Link></li>
          </ul>
        </div>

        {/* Column 4: Newsletter & Support */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">Stay Updated</h4>
          <p className="text-xs text-slate-400">Get weekly AI interview prompts & system design breakdowns.</p>
          <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="glass-input px-3 py-1.5 rounded-lg text-xs w-full"
            />
            <button className="gradient-button text-xs font-medium px-3 py-1.5 rounded-lg text-white shrink-0">
              Join
            </button>
          </form>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-800/60 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
        <p>© {new Date().getFullYear()} InterviewAI Inc. All rights reserved.</p>
        <p className="flex items-center gap-1 mt-2 sm:mt-0">
          Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for engineers & job seekers worldwide.
        </p>
      </div>
    </footer>
  );
};
