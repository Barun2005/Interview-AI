import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useInterview } from '../context/InterviewContext';

export const PostInterviewSummaryPage = () => {
  const { id } = useParams();
  const { completedInterviews } = useInterview();
  const [selectedRating, setSelectedRating] = useState('GREAT');

  const report = completedInterviews.find(i => i.id === id) || completedInterviews[0];

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <main className="max-w-[1280px] mx-auto px-6 py-8 md:py-12 space-y-8 pb-24 print:p-0 print:bg-white print:text-black">
      
      {/* 1. Welcome & Success Banner (Primary Container) */}
      <div className="relative overflow-hidden rounded-2xl bg-slate-900 dark:bg-slate-950 p-8 md:p-12 text-white shadow-xl border border-slate-800">
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className="inline-flex items-center gap-1.5 px-4 py-1 bg-teal-500/20 text-teal-300 rounded-full font-mono text-xs font-extrabold border border-teal-500/30">
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            Session Completed Successfully
          </span>
          <h1 className="font-heading text-3xl md:text-4xl font-extrabold tracking-tight text-white">Fantastic work!</h1>
          <p className="font-sans text-base text-slate-300 leading-relaxed font-medium">
            The mock interview for <span className="font-bold text-white">{report.title}</span> ({report.company}) is finished. Your technical depth and problem-solving were particularly impressive.
          </p>

          <div className="pt-2 flex flex-wrap gap-3 print:hidden">
            <button
              onClick={handleDownloadPDF}
              className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-xl font-mono text-xs font-bold transition flex items-center gap-1.5 shadow"
            >
              <span className="material-symbols-outlined text-sm">download</span> Download PDF Report
            </button>
            <Link
              to="/mock-interview"
              className="bg-slate-800 text-slate-100 hover:bg-slate-700 px-6 py-2.5 rounded-xl font-mono text-xs font-bold transition flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">replay</span> Retake Session
            </Link>
          </div>
        </div>
      </div>

      {/* Grid: Left Summary & Feedback Form (8 Cols) vs Right Next Steps Timeline (4 Cols) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left Column (8 cols) */}
        <div className="md:col-span-8 space-y-6">
          
          {/* Conversation Summary Card */}
          <section className="bg-white dark:bg-[#111827] border border-slate-300 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <h2 className="font-heading text-xl font-extrabold text-slate-900 dark:text-white">Conversation & Metric Summary</h2>
              <span className="font-heading text-2xl font-extrabold text-teal-700 dark:text-teal-400 font-mono">
                {report.score} / 100
              </span>
            </div>

            <div className="p-4 bg-slate-100 dark:bg-slate-900/60 rounded-xl border border-slate-300 dark:border-slate-800 space-y-2">
              <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white">Key Topics Assessed</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-teal-100 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 rounded-full font-mono text-xs font-extrabold border border-teal-500/30">System Architecture</span>
                <span className="px-3 py-1 bg-teal-100 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 rounded-full font-mono text-xs font-extrabold border border-teal-500/30">Microservices</span>
                <span className="px-3 py-1 bg-teal-100 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 rounded-full font-mono text-xs font-extrabold border border-teal-500/30">STAR Behavioral</span>
                <span className="px-3 py-1 bg-teal-100 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 rounded-full font-mono text-xs font-extrabold border border-teal-500/30">Algorithm Performance</span>
              </div>
            </div>

            <div className="p-4 border border-slate-300 dark:border-slate-800 rounded-xl flex items-start gap-3 bg-slate-50 dark:bg-slate-900/40">
              <div className="w-10 h-10 rounded-full bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 flex items-center justify-center shrink-0 font-bold">
                <span className="material-symbols-outlined">psychology</span>
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-slate-900 dark:text-white">AI Lead Insight</h4>
                <p className="font-sans text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  Your explanation of tradeoffs during the session was highlighted as a strong point of the discussion.
                </p>
              </div>
            </div>

            {/* Metric Bars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                  <span>Communication</span>
                  <span className="text-teal-700 dark:text-teal-400">{report.communicationScore}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-teal-600 dark:bg-teal-400 h-full" style={{ width: `${report.communicationScore}%` }}></div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                  <span>Technical Depth</span>
                  <span className="text-teal-700 dark:text-teal-400">{report.technicalScore}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-teal-600 dark:bg-teal-400 h-full" style={{ width: `${report.technicalScore}%` }}></div>
                </div>
              </div>
            </div>
          </section>

          {/* Feedback Rating Form */}
          <section className="bg-white dark:bg-[#111827] border border-slate-300 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4 print:hidden">
            <h2 className="font-heading text-xl font-extrabold text-slate-900 dark:text-white">Share Your Experience Feedback</h2>
            <p className="font-sans text-xs text-slate-700 dark:text-slate-300 font-medium">How was your AI interview session today? Feedback helps improve speech synthesis and evaluation accuracy.</p>

            <div className="space-y-3">
              <p className="font-sans font-bold text-xs text-slate-900 dark:text-white">Overall Platform Rating</p>
              <div className="flex gap-3">
                {[
                  { emoji: '😞', label: 'POOR' },
                  { emoji: '😐', label: 'OKAY' },
                  { emoji: '😊', label: 'GOOD' },
                  { emoji: '🤩', label: 'GREAT' },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setSelectedRating(item.label)}
                    className={`flex-1 py-3 rounded-xl border text-center transition ${
                      selectedRating === item.label
                        ? 'border-teal-600 bg-teal-100 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 font-extrabold shadow-sm'
                        : 'border-slate-300 dark:border-slate-800 hover:border-teal-600 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className="text-2xl">{item.emoji}</span>
                    <p className="font-mono text-[10px] mt-1 font-bold">{item.label}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-sans text-xs font-bold block text-slate-900 dark:text-white">Any specific comments?</label>
              <textarea
                rows={3}
                placeholder="Tell us about the interviewer voice, speech recognition clarity, or question topics..."
                className="w-full rounded-xl border border-slate-300 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-3 text-xs font-sans text-slate-900 dark:text-slate-100 focus:outline-none focus:border-teal-600"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => alert('Feedback submitted! Thank you.')}
                className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-full font-heading text-xs font-bold transition shadow"
              >
                Submit Feedback
              </button>
            </div>
          </section>

        </div>

        {/* Right Column: Next Steps Timeline (4 cols) */}
        <div className="md:col-span-4 space-y-6">
          
          <section className="bg-white dark:bg-[#111827] border border-slate-300 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
            <h2 className="font-heading text-xl font-extrabold text-slate-900 dark:text-white">Next Steps Timeline</h2>

            <div className="relative pl-6 space-y-6 before:absolute before:left-[5px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-300 dark:before:bg-slate-700">
              
              {/* Step 1 */}
              <div className="relative">
                <div className="absolute -left-[27px] top-1 w-6 h-6 rounded-full bg-teal-600 flex items-center justify-center z-10 shadow-sm">
                  <span className="material-symbols-outlined text-[14px] text-white" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                </div>
                <div>
                  <h4 className="font-sans font-bold text-xs text-slate-900 dark:text-white">Technical AI Interview</h4>
                  <p className="text-slate-600 dark:text-slate-400 font-sans text-[11px]">Completed today</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="absolute -left-[27px] top-1 w-6 h-6 rounded-full bg-white dark:bg-slate-900 border-2 border-teal-600 flex items-center justify-center z-10">
                  <div className="w-2 h-2 rounded-full bg-teal-600 animate-pulse"></div>
                </div>
                <div>
                  <h4 className="font-sans font-bold text-xs text-slate-900 dark:text-white">AI Metric Consolidation</h4>
                  <p className="text-slate-600 dark:text-slate-400 font-sans text-[11px]">Report generated in 2 mins.</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative opacity-70">
                <div className="absolute -left-[27px] top-1 w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 border-2 border-slate-400 dark:border-slate-600 flex items-center justify-center z-10"></div>
                <div>
                  <h4 className="font-sans font-bold text-xs text-slate-900 dark:text-white">Final Hiring Decision</h4>
                  <p className="text-slate-600 dark:text-slate-400 font-sans text-[11px]">Share report with hiring lead.</p>
                </div>
              </div>

            </div>

            <div className="p-3.5 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-800 text-center space-y-2">
              <p className="font-sans text-xs text-slate-700 dark:text-slate-300 font-medium">Need help? Contact coordinator:</p>
              <div className="flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-teal-600 dark:text-teal-400">account_circle</span>
                <span className="font-sans font-bold text-xs text-teal-700 dark:text-teal-400">Sarah Jenkins (Recruiter)</span>
              </div>
            </div>
          </section>

        </div>

      </div>

    </main>
  );
};
