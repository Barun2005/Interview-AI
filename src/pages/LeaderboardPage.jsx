import React from 'react';
import { Trophy, Award, Star, Flame, Sparkles, Share2 } from 'lucide-react';

export const LeaderboardPage = () => {
  const leaders = [
    { rank: 1, name: 'Sarah Jenkins', score: 98, streak: '14 Days', role: 'Staff Frontend Architect', company: 'Google Target' },
    { rank: 2, name: 'Alex Mercer', score: 92, streak: '5 Days', role: 'Senior Full Stack Lead', company: 'Meta Target' },
    { rank: 3, name: 'David Chen', score: 91, streak: '9 Days', role: 'System Design Specialist', company: 'Amazon Target' },
    { rank: 4, name: 'Elena Rostova', score: 89, streak: '11 Days', role: 'Backend Software Engineer', company: 'Apple Target' },
    { rank: 5, name: 'Michael Vance', score: 87, streak: '4 Days', role: 'DevOps & Cloud Engineer', company: 'NVIDIA Target' }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-4 space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading flex items-center gap-2">
          Global Candidate Leaderboard <Trophy className="w-6 h-6 text-amber-400" />
        </h1>
        <p className="text-xs text-slate-400">
          Rankings updated weekly based on AI interview accuracy, problem-solving scores, and practice streaks.
        </p>
      </div>

      {/* Podium Top 3 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        
        {/* Rank 2 */}
        <div className="glass-panel rounded-2xl p-5 border border-slate-800 text-center space-y-2 order-2 sm:order-1 mt-4">
          <div className="w-12 h-12 rounded-full bg-slate-700 text-slate-200 font-bold text-lg flex items-center justify-center mx-auto shadow">2</div>
          <h4 className="font-bold text-white text-sm">{leaders[1].name}</h4>
          <p className="text-[11px] text-slate-400">{leaders[1].role}</p>
          <div className="text-xl font-extrabold text-indigo-400 font-heading">{leaders[1].score} pts</div>
        </div>

        {/* Rank 1 (Gold) */}
        <div className="glass-panel rounded-2xl p-6 border-2 border-amber-500 bg-amber-950/20 text-center space-y-3 order-1 sm:order-2 shadow-2xl shadow-amber-500/20">
          <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-400 to-amber-600 text-slate-950 font-extrabold text-xl flex items-center justify-center mx-auto shadow-lg">1</div>
          <h4 className="font-extrabold text-white text-base">{leaders[0].name}</h4>
          <p className="text-xs text-amber-300 font-mono">{leaders[0].role}</p>
          <div className="text-3xl font-extrabold text-amber-400 font-heading">{leaders[0].score} pts</div>
          <span className="inline-block text-[10px] font-bold px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
            👑 Weekly Champion
          </span>
        </div>

        {/* Rank 3 */}
        <div className="glass-panel rounded-2xl p-5 border border-slate-800 text-center space-y-2 order-3 mt-6">
          <div className="w-12 h-12 rounded-full bg-amber-800/40 text-amber-400 font-bold text-lg flex items-center justify-center mx-auto shadow">3</div>
          <h4 className="font-bold text-white text-sm">{leaders[2].name}</h4>
          <p className="text-[11px] text-slate-400">{leaders[2].role}</p>
          <div className="text-xl font-extrabold text-teal-400 font-heading">{leaders[2].score} pts</div>
        </div>

      </div>

      {/* Leaderboard Table */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white font-heading">Top Ranked Candidates</h3>

        <div className="space-y-3">
          {leaders.map((lead) => (
            <div
              key={lead.rank}
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4 text-xs"
            >
              <div className="flex items-center gap-4">
                <span className="font-extrabold font-mono text-sm text-slate-400 w-6">#{lead.rank}</span>
                <div>
                  <h4 className="font-bold text-white text-sm">{lead.name}</h4>
                  <p className="text-slate-400 text-[11px]">{lead.role} • {lead.company}</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <span className="font-mono text-amber-400 flex items-center gap-1 font-semibold">
                  <Flame className="w-3.5 h-3.5 fill-amber-400" /> {lead.streak}
                </span>
                <span className="font-extrabold text-white text-sm font-heading">{lead.score} / 100</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
