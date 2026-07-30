import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Video, 
  Code2, 
  FileText, 
  BrainCircuit, 
  CheckCircle2, 
  ArrowRight, 
  Star, 
  ShieldCheck, 
  Zap,
  Bot,
  BarChart3,
  Award,
  Globe
} from 'lucide-react';

export const LandingPage = () => {
  return (
    <div className="space-y-24 pb-20">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 lg:pt-20 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto space-y-8">
        
        {/* Glow pill badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold shadow-lg backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-indigo-400 animate-spin" style={{ animationDuration: '4s' }} />
          <span>Next-Gen AI Interviewer 2.0 Released</span>
          <span className="bg-indigo-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">NEW</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white font-heading leading-tight drop-shadow-sm">
          Ace Your Tech & HR Interviews with <br />
          <span className="gradient-text">Real-Time AI Voice Feedback</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-slate-700 dark:text-slate-200 max-w-3xl mx-auto leading-relaxed font-medium">
          Practice realistic 1-on-1 mock interviews powered by speech-to-text, live voice synthesis, automated code evaluation, and instant ATS resume optimization.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            to="/mock-interview"
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold text-white gradient-button flex items-center justify-center gap-2 shadow-2xl shadow-indigo-600/40 hover:scale-105 transition duration-300"
          >
            <Video className="w-5 h-5 text-indigo-200" />
            Start Free AI Interview
            <ArrowRight className="w-5 h-5" />
          </Link>
          
          <Link
            to="/coding-interview"
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold text-slate-200 glass-panel hover:bg-slate-800 flex items-center justify-center gap-2 transition duration-300"
          >
            <Code2 className="w-5 h-5 text-teal-400" />
            Try Coding Editor
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
          <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> No credit card required</span>
          <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-amber-400 fill-amber-400" /> 4.9/5 Rating by 25,000+ candidates</span>
          <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-indigo-400" /> Instant PDF performance reports</span>
        </div>

        {/* Hero Interactive Screen Preview Card */}
        <div className="pt-8 relative">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-400 opacity-30 blur-2xl"></div>
          <div className="relative glass-panel rounded-2xl p-4 sm:p-6 border border-slate-700/80 shadow-2xl text-left">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                <span className="text-xs text-slate-400 font-mono ml-2">InterviewAI Room // System Design Session</span>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono font-semibold">● LIVE AI SYNTHESIS</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left AI Video Feed */}
              <div className="bg-[#0b0f19] rounded-xl p-6 border border-slate-800 flex flex-col items-center justify-center text-center space-y-4">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/50 animate-pulse">
                    <Bot className="w-12 h-12 text-white" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-emerald-400 border-2 border-[#0b0f19]"></span>
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">Sophia (AI Lead Tech Interviewer)</h4>
                  <p className="text-xs text-slate-400">Asking: "How would you structure a Redis caching layer for 100k QPS?"</p>
                </div>
                {/* Soundwave animation */}
                <div className="flex items-center gap-1.5 h-8">
                  {[12, 24, 18, 30, 20, 28, 14, 22].map((h, i) => (
                    <span
                      key={i}
                      className="w-1.5 bg-indigo-400 rounded-full sound-wave-bar"
                      style={{ height: `${h}px`, animationDelay: `${i * 0.15}s` }}
                    ></span>
                  ))}
                </div>
              </div>

              {/* Right Real-time Feedback & Metrics */}
              <div className="space-y-3">
                <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Communication Clarity</span>
                    <span className="text-emerald-400 font-bold">92 / 100</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full w-[92%]"></div>
                  </div>
                </div>

                <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Technical Accuracy & Tradeoffs</span>
                    <span className="text-indigo-400 font-bold">88 / 100</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-indigo-400 h-full w-[88%]"></div>
                  </div>
                </div>

                <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Pacing & Confidence</span>
                    <span className="text-purple-400 font-bold">95 / 100</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-purple-400 h-full w-[95%]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TOP COMPANIES TICKER */}
      <section className="border-y border-slate-300 dark:border-slate-800/80 bg-slate-100/80 dark:bg-slate-950/40 py-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
          <p className="text-xs font-mono uppercase tracking-widest text-slate-800 dark:text-slate-300 font-bold">
            Practice company-specific interview question sets for
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 transition duration-300 text-slate-900 dark:text-slate-100 font-extrabold font-heading text-lg sm:text-xl">
            <span className="hover:text-indigo-600 dark:hover:text-indigo-400 transition cursor-pointer">Google</span>
            <span className="hover:text-indigo-600 dark:hover:text-indigo-400 transition cursor-pointer">Microsoft</span>
            <span className="hover:text-indigo-600 dark:hover:text-indigo-400 transition cursor-pointer">Amazon</span>
            <span className="hover:text-indigo-600 dark:hover:text-indigo-400 transition cursor-pointer">Meta</span>
            <span className="hover:text-indigo-600 dark:hover:text-indigo-400 transition cursor-pointer">Apple</span>
            <span className="hover:text-indigo-600 dark:hover:text-indigo-400 transition cursor-pointer">NVIDIA</span>
            <span className="hover:text-indigo-600 dark:hover:text-indigo-400 transition cursor-pointer">Adobe</span>
            <span className="hover:text-indigo-600 dark:hover:text-indigo-400 transition cursor-pointer">Deloitte</span>
          </div>
        </div>
      </section>

      {/* CORE FEATURES GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-heading">
            Everything You Need to Land Your <span className="gradient-text">Dream Job Offer</span>
          </h2>
          <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">
            Engineered with deep learning speech evaluation, automated code runners, ATS resume audit tools, and real-time performance score analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div className="glass-panel rounded-2xl p-6 space-y-4 glass-panel-hover border border-slate-300 dark:border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-indigo-600/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-500/30">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading">AI Voice Interviewer</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Experience dynamic voice-driven mock interviews with human-like Speech-to-Text and Speech Synthesis across HR, Behavioral, Technical, and System Design tracks.
            </p>
            <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> Speech-to-Text & Typed Input</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> Smart follow-up generation</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> Dynamic difficulty selection</li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="glass-panel rounded-2xl p-6 space-y-4 glass-panel-hover border border-slate-300 dark:border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-teal-600/20 text-teal-600 dark:text-teal-400 flex items-center justify-center border border-teal-500/30">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading">Coding Assessment Lab</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Write, compile, and submit algorithms in Java, C++, Python, or JavaScript with instant test case execution and AI time/space complexity review.
            </p>
            <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> Multi-language syntax editor</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> Visible & hidden test cases</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> O(N) complexity breakdown</li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="glass-panel rounded-2xl p-6 space-y-4 glass-panel-hover border border-slate-300 dark:border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-purple-600/20 text-purple-600 dark:text-purple-400 flex items-center justify-center border border-purple-500/30">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white font-heading">ATS Resume Analyzer</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              Upload your PDF resume to receive an immediate ATS compatibility score, missing keyword alert, weak bullet point fixes, and formatted resume preview.
            </p>
            <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> ATS Compatibility Score</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> Missing Industry Keywords</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> AI Bullet Point Enhancer</li>
            </ul>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white font-heading">
            How <span className="gradient-text">InterviewAI</span> Prepares You
          </h2>
          <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">Master every stage of the technical hiring funnel in 3 simple steps.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          <div className="glass-panel p-6 rounded-2xl space-y-3 relative text-center border border-slate-300 dark:border-slate-800">
            <div className="w-12 h-12 mx-auto rounded-full bg-indigo-600 text-white font-bold text-lg flex items-center justify-center shadow-lg shadow-indigo-600/40">1</div>
            <h4 className="font-bold text-slate-900 dark:text-white text-lg font-heading">Select Role & Company</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Choose your target company (Google, Meta, Amazon) and interview domain (Frontend, Backend, System Design, HR).</p>
          </div>

          <div className="glass-panel p-6 rounded-2xl space-y-3 relative text-center border border-slate-300 dark:border-slate-800">
            <div className="w-12 h-12 mx-auto rounded-full bg-purple-600 text-white font-bold text-lg flex items-center justify-center shadow-lg shadow-purple-600/40">2</div>
            <h4 className="font-bold text-slate-900 dark:text-white text-lg font-heading">Interactive Voice Session</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Speak or type your responses. AI asks follow-up questions, evaluates speech clarity, and monitors body language.</p>
          </div>

          <div className="glass-panel p-6 rounded-2xl space-y-3 relative text-center border border-slate-300 dark:border-slate-800">
            <div className="w-12 h-12 mx-auto rounded-full bg-teal-600 text-white font-bold text-lg flex items-center justify-center shadow-lg shadow-teal-600/40">3</div>
            <h4 className="font-bold text-slate-900 dark:text-white text-lg font-heading">Instant Score & PDF Report</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Receive detailed score cards across 10+ metrics, sample better answers, and downloadable PDF performance reports.</p>
          </div>

        </div>
      </section>

      {/* PRICING PLANS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-3">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white font-heading">
            Simple, Transparent <span className="gradient-text">Pricing Plans</span>
          </h2>
          <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">Invest in your career. Upgrade anytime as your interview schedule scales.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Free Starter Plan */}
          <div className="glass-panel rounded-2xl p-8 space-y-6 border border-slate-300 dark:border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Starter</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">For candidates testing the platform.</p>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-slate-900 dark:text-white font-heading">$0</span>
              <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">/ forever free</span>
            </div>
            <ul className="space-y-3 text-xs text-slate-700 dark:text-slate-300 font-medium">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> 3 AI Mock Interviews / mo</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> Basic Speech-to-Text</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> Limited Company Library</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> Community Support</li>
            </ul>
            <Link to="/signup" className="block text-center w-full py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 transition">
              Get Started Free
            </Link>
          </div>

          {/* Pro Tier Plan (Popular) */}
          <div className="glass-panel rounded-2xl p-8 space-y-6 border-2 border-indigo-500 relative bg-indigo-500/10 dark:bg-indigo-950/20 shadow-2xl shadow-indigo-600/20">
            <span className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-[10px] font-extrabold uppercase tracking-wider shadow">
              Most Popular
            </span>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Pro Candidate</h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 font-medium">For active tech job hunters.</p>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-slate-900 dark:text-white font-heading">$19</span>
              <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">/ month</span>
            </div>
            <ul className="space-y-3 text-xs text-slate-800 dark:text-slate-200 font-medium">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-500 dark:text-indigo-400" /> Unlimited AI Mock Interviews</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-500 dark:text-indigo-400" /> AI Voice Synthesis & STT</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-500 dark:text-indigo-400" /> Unlimited Code Lab Submissions</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Resume ATS Analyzer & Optimizer</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> Downloadable PDF Performance Reports</li>
            </ul>
            <Link to="/mock-interview" className="block text-center w-full py-3 rounded-xl gradient-button text-sm font-bold text-white shadow-lg shadow-indigo-600/40 hover:scale-105 transition">
              Upgrade to Pro
            </Link>
          </div>

          {/* Enterprise / Team Plan */}
          <div className="glass-panel rounded-2xl p-8 space-y-6 border border-slate-300 dark:border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Bootcamp / Enterprise</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 font-medium">For universities & training programs.</p>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-slate-900 dark:text-white font-heading">$49</span>
              <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">/ user / mo</span>
            </div>
            <ul className="space-y-3 text-xs text-slate-700 dark:text-slate-300 font-medium">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> Admin Analytics Portal</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> Custom Question Set Creator</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Peer Mock Scheduler</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Dedicated Account Manager</li>
            </ul>
            <Link to="/contact" className="block text-center w-full py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-sm font-bold text-slate-900 dark:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-800 transition">
              Contact Sales
            </Link>
          </div>

        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="relative glass-panel rounded-3xl p-8 sm:p-12 text-center space-y-6 overflow-hidden border border-indigo-500/30">
          <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-indigo-600/20 blur-3xl"></div>
          <div className="absolute -left-10 -top-10 w-64 h-64 rounded-full bg-purple-600/20 blur-3xl"></div>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white font-heading">
            Ready to Pass Your Next <span className="gradient-text">Technical Interview</span>?
          </h2>
          <p className="text-sm text-slate-700 dark:text-slate-300 max-w-xl mx-auto font-medium">
            Join thousands of software engineers who boosted their confidence and secured offers at Google, Meta, and top startups.
          </p>
          <div className="pt-2 flex justify-center">
            <Link
              to="/mock-interview"
              className="px-8 py-4 rounded-xl text-base font-bold text-white gradient-button flex items-center gap-2 shadow-2xl shadow-indigo-600/50 hover:scale-105 transition"
            >
              Start Free AI Mock Interview Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
