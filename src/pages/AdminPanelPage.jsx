import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Users, 
  Database, 
  BarChart2, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Settings,
  Sparkles
} from 'lucide-react';

export const AdminPanelPage = () => {
  const [users, setUsers] = useState([
    { id: 'usr_1', name: 'Alex Mercer', email: 'alex.mercer@example.com', role: 'Candidate', plan: 'Pro', interviews: 14 },
    { id: 'usr_2', name: 'Sarah Jenkins', email: 'sarah.j@google.com', role: 'Candidate', plan: 'Pro', interviews: 28 },
    { id: 'usr_3', name: 'Admin Barun', email: 'admin@interviewai.com', role: 'Admin', plan: 'Enterprise', interviews: 45 }
  ]);

  const [questions, setQuestions] = useState([
    { id: 'q_1', title: 'Explain React Virtual DOM & Reconciliation', type: 'Technical', company: 'Google' },
    { id: 'q_2', title: 'Design URL Shortener Bitly at Scale', type: 'System Design', company: 'Amazon' }
  ]);

  const [newQuestionTitle, setNewQuestionTitle] = useState('');
  const [newQuestionCompany, setNewQuestionCompany] = useState('Google');
  const [newQuestionType, setNewQuestionType] = useState('Technical');

  const handleAddQuestion = (e) => {
    e.preventDefault();
    if (!newQuestionTitle.trim()) return;
    const newQ = {
      id: 'q_' + Date.now(),
      title: newQuestionTitle,
      type: newQuestionType,
      company: newQuestionCompany
    };
    setQuestions(prev => [newQ, ...prev]);
    setNewQuestionTitle('');
  };

  const handleDeleteUser = (id) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-4 space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading flex items-center gap-2">
          Platform Administration <ShieldAlert className="w-6 h-6 text-rose-400" />
        </h1>
        <p className="text-xs text-slate-400">
          Manage system candidates, question bank items, company metadata, and global telemetry metrics.
        </p>
      </div>

      {/* Admin Stats Header */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-mono">Total Platform Candidates</span>
          <div className="text-3xl font-extrabold text-white font-heading">25,480</div>
        </div>
        <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-mono">AI Mock Interviews Generated</span>
          <div className="text-3xl font-extrabold text-indigo-400 font-heading">142,910</div>
        </div>
        <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-1">
          <span className="text-xs text-slate-400 font-mono">Question Bank Vault Items</span>
          <div className="text-3xl font-extrabold text-teal-400 font-heading">1,250</div>
        </div>
      </div>

      {/* Grid: User Management (6 cols) & Question Bank Management (6 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Candidates Table (6 cols) */}
        <div className="lg:col-span-6 glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white font-heading flex items-center gap-2">
            <Users className="w-4 h-4 text-indigo-400" /> Candidate Management
          </h3>

          <div className="space-y-3">
            {users.map((u) => (
              <div key={u.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3 text-xs">
                <div>
                  <h4 className="font-bold text-white">{u.name}</h4>
                  <p className="text-slate-400 text-[11px]">{u.email} • Plan: {u.plan}</p>
                </div>
                <button
                  onClick={() => handleDeleteUser(u.id)}
                  className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 transition"
                  title="Remove candidate account"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Question Vault Editor (6 cols) */}
        <div className="lg:col-span-6 glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white font-heading flex items-center gap-2">
            <Database className="w-4 h-4 text-teal-400" /> Add Question to Bank
          </h3>

          <form onSubmit={handleAddQuestion} className="space-y-3 text-xs">
            <input
              type="text"
              value={newQuestionTitle}
              onChange={(e) => setNewQuestionTitle(e.target.value)}
              placeholder="Enter question text..."
              className="w-full glass-input px-3 py-2 rounded-xl text-xs"
              required
            />

            <div className="grid grid-cols-2 gap-3">
              <select
                value={newQuestionCompany}
                onChange={(e) => setNewQuestionCompany(e.target.value)}
                className="glass-input px-3 py-2 rounded-xl text-xs"
              >
                <option value="Google">Google</option>
                <option value="Amazon">Amazon</option>
                <option value="Meta">Meta</option>
                <option value="Microsoft">Microsoft</option>
              </select>

              <select
                value={newQuestionType}
                onChange={(e) => setNewQuestionType(e.target.value)}
                className="glass-input px-3 py-2 rounded-xl text-xs"
              >
                <option value="Technical">Technical</option>
                <option value="HR">HR</option>
                <option value="System Design">System Design</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl font-bold text-white gradient-button flex items-center justify-center gap-1 shadow"
            >
              <Plus className="w-4 h-4" /> Add Question
            </button>
          </form>

          <div className="pt-2 space-y-2">
            <h4 className="text-xs font-bold text-slate-300 font-mono">Recent Questions:</h4>
            {questions.map((q) => (
              <div key={q.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
                <div className="flex justify-between text-slate-400 font-mono text-[10px]">
                  <span>{q.company}</span>
                  <span className="text-teal-400">{q.type}</span>
                </div>
                <p className="font-bold text-white">{q.title}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
