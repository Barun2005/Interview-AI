import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useInterview } from '../context/InterviewContext';

export const DashboardPage = () => {
  const { currentUser } = useAuth();
  const { completedInterviews, scheduledInterviews } = useInterview();

  const totalInterviews = completedInterviews.length;
  const avgScore = totalInterviews > 0 
    ? Math.round(completedInterviews.reduce((acc, curr) => acc + curr.score, 0) / totalInterviews)
    : 85;

  const nextInterview = scheduledInterviews[0] || {
    title: 'Senior Frontend Engineer',
    company: 'GlobalTech Systems',
    round: 'Round 3 (Technical Bar Raiser)',
    dateTime: 'Tomorrow, Oct 12 • 10:00 AM',
    platform: 'InterviewPro Voice Room'
  };

  return (
    <main className="max-w-[1280px] mx-auto px-6 py-8 md:py-12 space-y-8 pb-24">
      
      {/* Welcome Header */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
            Hello, {currentUser?.name || 'Alex Rivers'} 👋
          </h1>
          <p className="font-sans text-slate-700 dark:text-slate-300 text-sm sm:text-base font-medium">
            You have <span className="font-bold text-teal-700 dark:text-teal-400">{scheduledInterviews.length + 1} interviews</span> scheduled for this week. You're doing great!
          </p>
        </div>

        <Link
          to="/profile"
          className="px-4 py-2 rounded-xl text-xs font-bold text-slate-900 dark:text-white bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition flex items-center gap-1.5 shadow-sm shrink-0"
        >
          <span className="material-symbols-outlined text-sm text-teal-600 dark:text-teal-400">edit</span>
          Edit Profile
        </Link>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* 1. Hero Card: Next Up Interview (Bento Large 8 Cols) */}
        <section className="md:col-span-8 bento-cell relative overflow-hidden flex flex-col justify-between min-h-[320px] bg-white dark:bg-[#111827] border border-slate-300 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:border-teal-600 transition-all">
          <div className="relative z-10 space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <span className="flex h-3 w-3 rounded-full bg-teal-600 dark:bg-teal-400 animate-ping"></span>
              <span className="font-mono text-xs text-teal-700 dark:text-teal-400 uppercase tracking-wider font-extrabold">Next Up Session</span>
            </div>
            <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">{nextInterview.title}</h2>
            <p className="font-sans text-base text-slate-700 dark:text-slate-300 font-medium">
              At <span className="font-bold text-slate-900 dark:text-white">{nextInterview.company || 'GlobalTech'}</span> • {nextInterview.round || 'Technical Round'}
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-end justify-between gap-6 mt-8">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 text-sm font-mono font-medium">
                <span className="material-symbols-outlined text-teal-600 dark:text-teal-400">calendar_month</span>
                <span>{nextInterview.dateTime || 'Tomorrow • 10:00 AM'}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 text-sm font-mono font-medium">
                <span className="material-symbols-outlined text-teal-600 dark:text-teal-400">video_chat</span>
                <span>{nextInterview.platform || 'InterviewPro Live AI Room'}</span>
              </div>
            </div>

            <Link
              to="/mock-interview"
              className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl font-heading text-sm font-extrabold shadow-md transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">play_arrow</span>
              Prepare Now in Room
            </Link>
          </div>
        </section>

        {/* 2. Quick Pro Tip Box (Bento Side 4 Cols) */}
        <section className="md:col-span-4 bento-cell flex flex-col justify-center items-center text-center bg-teal-500/10 dark:bg-teal-950/40 border border-teal-500/30 rounded-2xl p-6 shadow-sm">
          <span className="material-symbols-outlined text-5xl text-teal-700 dark:text-teal-300 mb-2" style={{ fontVariationSettings: "'FILL' 1" }}>
            lightbulb
          </span>
          <h3 className="font-heading text-xl font-extrabold text-teal-900 dark:text-teal-200 mb-2">Pro Tip</h3>
          <p className="font-sans text-xs text-slate-800 dark:text-slate-200 leading-relaxed font-medium px-2 mb-4">
            Review the "S.T.A.R" method for behavioral questions. Technical lead interviewers highly value detailed execution stories with quantitative metrics.
          </p>
          <Link
            to="/hr-coach"
            className="font-bold text-teal-800 dark:text-teal-300 border-b-2 border-teal-600 pb-1 hover:opacity-75 transition-opacity text-xs font-mono"
          >
            Practice STAR Method with AI HR Coach
          </Link>
        </section>

        {/* 3. Application Status List (Bento 7 Cols) */}
        <section className="md:col-span-7 bento-cell bg-white dark:bg-[#111827] border border-slate-300 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading text-xl font-extrabold text-slate-900 dark:text-white">Application & Mock Status</h3>
            <Link to="/company-library" className="text-teal-700 dark:text-teal-400 font-mono text-xs font-bold hover:underline">
              View All Jobs
            </Link>
          </div>

          <div className="space-y-3">
            
            {/* Status Row 1 */}
            <div className="flex items-center justify-between p-3.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 rounded-xl flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined">domain</span>
                </div>
                <div>
                  <p className="font-sans font-bold text-sm text-slate-900 dark:text-white">Starlight Ventures</p>
                  <p className="font-sans text-xs text-slate-600 dark:text-slate-400">Senior Product Architect</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-teal-100 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 rounded-full font-mono text-[11px] font-extrabold border border-teal-500/30">
                Interviewing
              </span>
            </div>

            {/* Status Row 2 */}
            <div className="flex items-center justify-between p-3.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 rounded-xl flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined">rocket_launch</span>
                </div>
                <div>
                  <p className="font-sans font-bold text-sm text-slate-900 dark:text-white">Nebula Cloud Systems</p>
                  <p className="font-sans text-xs text-slate-600 dark:text-slate-400">Backend Software Engineer</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300 rounded-full font-mono text-[11px] font-extrabold border border-indigo-500/30">
                Reviewing
              </span>
            </div>

            {/* Status Row 3 */}
            <div className="flex items-center justify-between p-3.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 rounded-xl flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined">database</span>
                </div>
                <div>
                  <p className="font-sans font-bold text-sm text-slate-900 dark:text-white">DataFlow Inc.</p>
                  <p className="font-sans text-xs text-slate-600 dark:text-slate-400">Full Stack Developer</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 rounded-full font-mono text-[11px] font-extrabold border border-rose-500/30">
                Completed
              </span>
            </div>

          </div>
        </section>

        {/* 4. Readiness Score Ring (Bento 5 Cols) */}
        <section className="md:col-span-5 bento-cell bg-white dark:bg-[#111827] border border-slate-300 dark:border-slate-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <h3 className="font-heading text-xl font-extrabold text-slate-900 dark:text-white mb-4">Readiness Score</h3>
          <div className="flex-grow flex flex-col justify-center items-center">
            <div className="relative w-36 h-36 flex items-center justify-center mb-4">
              <svg className="w-full h-full transform -rotate-90">
                <circle className="text-slate-200 dark:text-slate-800" cx="72" cy="72" fill="transparent" r="60" stroke="currentColor" strokeWidth="12"></circle>
                <circle
                  className="text-teal-600 dark:text-teal-400 transition-all duration-1000"
                  cx="72"
                  cy="72"
                  fill="transparent"
                  r="60"
                  stroke="currentColor"
                  strokeDasharray="377"
                  strokeDashoffset={377 * (1 - avgScore / 100)}
                  strokeLinecap="round"
                  strokeWidth="12"
                ></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-heading text-3xl font-extrabold text-slate-900 dark:text-white leading-none">{avgScore}</span>
                <span className="font-mono text-[10px] text-slate-600 dark:text-slate-400 uppercase tracking-wider font-extrabold">Percent</span>
              </div>
            </div>
            <p className="font-sans text-xs text-center text-slate-700 dark:text-slate-300 font-medium">
              Calculated based on AI mock interview performance, code complexity evaluation, and profile completeness.
            </p>
          </div>
        </section>

        {/* 5. Learning & Practice Path (Bento Bottom 12 Cols) */}
        <section className="md:col-span-12 bento-cell bg-white dark:bg-[#111827] border border-slate-300 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading text-xl font-extrabold text-slate-900 dark:text-white">Recommended Preparation</h3>
              <p className="font-sans text-xs text-slate-600 dark:text-slate-400 font-medium">Curated tasks to boost your interview readiness score.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <Link to="/coding-interview" className="p-4 rounded-xl border border-slate-300 dark:border-slate-800 hover:border-teal-600 transition-all group bg-slate-50 dark:bg-slate-900/60">
              <span className="material-symbols-outlined text-teal-600 dark:text-teal-400 mb-2 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>code</span>
              <h4 className="font-heading font-bold text-sm text-slate-900 dark:text-white group-hover:text-teal-600 mb-1">System Design & Code</h4>
              <p className="font-sans text-xs text-slate-600 dark:text-slate-400">Master microservices and algorithms in Python / JS.</p>
            </Link>

            <Link to="/mock-interview" className="p-4 rounded-xl border border-slate-300 dark:border-slate-800 hover:border-teal-600 transition-all group bg-slate-50 dark:bg-slate-900/60">
              <span className="material-symbols-outlined text-teal-600 dark:text-teal-400 mb-2 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>forum</span>
              <h4 className="font-heading font-bold text-sm text-slate-900 dark:text-white group-hover:text-teal-600 mb-1">Mock Voice Room</h4>
              <p className="font-sans text-xs text-slate-600 dark:text-slate-400">30-min AI session focused on leadership STAR stories.</p>
            </Link>

            <Link to="/resume-analyzer" className="p-4 rounded-xl border border-slate-300 dark:border-slate-800 hover:border-teal-600 transition-all group bg-slate-50 dark:bg-slate-900/60">
              <span className="material-symbols-outlined text-teal-600 dark:text-teal-400 mb-2 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>description</span>
              <h4 className="font-heading font-bold text-sm text-slate-900 dark:text-white group-hover:text-teal-600 mb-1">Resume ATS Review</h4>
              <p className="font-sans text-xs text-slate-600 dark:text-slate-400">Audit CV keywords & extract impact metrics.</p>
            </Link>

            <Link to="/hr-coach" className="p-4 rounded-xl border border-slate-300 dark:border-slate-800 hover:border-teal-600 transition-all group bg-slate-50 dark:bg-slate-900/60">
              <span className="material-symbols-outlined text-teal-600 dark:text-teal-400 mb-2 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
              <h4 className="font-heading font-bold text-sm text-slate-900 dark:text-white group-hover:text-teal-600 mb-1">Salary Negotiation</h4>
              <p className="font-sans text-xs text-slate-600 dark:text-slate-400">Learn scripts to advocate for top-tier compensation.</p>
            </Link>

          </div>
        </section>

      </div>

    </main>
  );
};
