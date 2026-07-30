import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const CompanyLibraryPage = () => {
  const [selectedCompany, setSelectedCompany] = useState('All');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const companiesList = [
    'All', 'Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 
    'NVIDIA', 'Adobe', 'IBM', 'Deloitte', 'Accenture', 
    'TCS', 'Infosys', 'Wipro', 'Cognizant', 'Capgemini'
  ];

  const questionVault = [
    {
      id: 'cq_1',
      company: 'Google',
      role: 'Frontend Engineer',
      difficulty: 'Advanced',
      experience: '3+ Years',
      title: 'Design a Web Performance Dashboard tracking Core Web Vitals (LCP, FID, CLS)',
      type: 'System Design & Web Architecture',
      frequency: 'High (Asked 42 times)',
      summary: 'Focus on PerformanceObserver API, beacon network dispatch, and non-blocking event loops.'
    },
    {
      id: 'cq_2',
      company: 'Amazon',
      role: 'Full Stack Engineer',
      difficulty: 'Intermediate',
      experience: '2+ Years',
      title: 'Amazon Leadership Principle: Have Backbone; Disagree and Commit',
      type: 'HR & Behavioral',
      frequency: 'Very High (Core LP)',
      summary: 'Prepare a STAR story where you challenged a technical decision with benchmark data.'
    },
    {
      id: 'cq_3',
      company: 'Meta',
      role: 'Backend Engineer',
      difficulty: 'Advanced',
      experience: '5+ Years',
      title: 'Design a Distributed Newsfeed Cache with Real-time WebSockets',
      type: 'System Design',
      frequency: 'High',
      summary: 'Cover Fan-out on Write vs Fan-out on Read, Redis clusters, and pub/sub architecture.'
    },
    {
      id: 'cq_4',
      company: 'Microsoft',
      role: 'Software Engineer',
      difficulty: 'Intermediate',
      experience: '1-3 Years',
      title: 'Implement LRU Cache in O(1) Time using Doubly Linked List & HashMap',
      type: 'Coding / Data Structures',
      frequency: 'High',
      summary: 'Demonstrate pointer updates and hash lookup efficiency.'
    },
    {
      id: 'cq_5',
      company: 'Apple',
      role: 'iOS / Web Specialist',
      difficulty: 'Advanced',
      experience: '4+ Years',
      title: 'Explain Async/Await Memory Closures & Retain Cycles',
      type: 'Technical Core',
      frequency: 'Medium',
      summary: 'Explain weak references and memory leak detection using Instruments.'
    },
    {
      id: 'cq_6',
      company: 'NVIDIA',
      role: 'AI / Software Engineer',
      difficulty: 'Advanced',
      experience: '3+ Years',
      title: 'Optimize Matrix Multiplication CUDA Kernels for Parallel GPU Execution',
      type: 'High Performance Computing',
      frequency: 'Medium',
      summary: 'Discuss shared memory tiling and thread warp divergence.'
    },
    {
      id: 'cq_7',
      company: 'TCS',
      role: 'Associate Developer',
      difficulty: 'Beginner',
      experience: '0-2 Years',
      title: 'Difference between Abstract Class and Interface in Java with JDK 8 Default Methods',
      type: 'Technical Fundamentals',
      frequency: 'Very High',
      summary: 'Explain multiple inheritance trade-offs and functional interfaces.'
    },
    {
      id: 'cq_8',
      company: 'Deloitte',
      role: 'Consultant Engineer',
      difficulty: 'Intermediate',
      experience: '2+ Years',
      title: 'How do you handle cloud migration trade-offs from Monolith to Microservices?',
      type: 'Cloud Architecture',
      frequency: 'High',
      summary: 'Discuss Strangler Fig pattern, database per service, and API gateway routing.'
    }
  ];

  const filteredQuestions = questionVault.filter(q => {
    const matchCompany = selectedCompany === 'All' || q.company === selectedCompany;
    const matchRole = selectedRole === 'All' || q.role.includes(selectedRole);
    const matchDiff = selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;
    const matchSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase()) || q.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCompany && matchRole && matchDiff && matchSearch;
  });

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-6 space-y-6 pb-24">
      
      {/* Header */}
      <div className="border-b border-slate-300 dark:border-slate-800 pb-4 space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading flex items-center gap-2">
          Company Interview Question Library 🏢
        </h1>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
          Browse verified interview questions and system design prompts from 15+ top tech companies and IT consulting giants.
        </p>
      </div>

      {/* Company Logos Filter Bar */}
      <div className="bg-white dark:bg-[#111827] rounded-2xl p-4 border border-slate-300 dark:border-slate-800 overflow-x-auto shadow-sm">
        <div className="flex items-center gap-2 min-w-max">
          {companiesList.map((comp) => (
            <button
              key={comp}
              onClick={() => setSelectedCompany(comp)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition ${
                selectedCompany === comp
                  ? 'bg-teal-600 text-white shadow'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 border border-slate-300 dark:border-slate-700'
              }`}
            >
              {comp}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Options & Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search questions by keyword or topic..."
          className="w-full bg-white dark:bg-[#111827] border border-slate-300 dark:border-slate-800 px-4 py-2.5 rounded-xl text-xs font-mono text-slate-900 dark:text-white focus:outline-none focus:border-teal-600"
        />

        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="bg-white dark:bg-[#111827] border border-slate-300 dark:border-slate-800 px-3 py-2.5 rounded-xl text-xs font-mono text-slate-900 dark:text-white focus:outline-none"
        >
          <option value="All">All Roles (Frontend, Backend, System Design)</option>
          <option value="Frontend">Frontend Engineer</option>
          <option value="Backend">Backend Engineer</option>
          <option value="Full Stack">Full Stack Engineer</option>
        </select>

        <select
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
          className="bg-white dark:bg-[#111827] border border-slate-300 dark:border-slate-800 px-3 py-2.5 rounded-xl text-xs font-mono text-slate-900 dark:text-white focus:outline-none"
        >
          <option value="All">All Difficulties</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      {/* Questions Vault Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredQuestions.map((q) => (
          <div
            key={q.id}
            className="bg-white dark:bg-[#111827] rounded-2xl p-6 border border-slate-300 dark:border-slate-800 space-y-4 shadow-sm hover:border-teal-600 transition flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold font-mono px-2.5 py-0.5 rounded bg-teal-100 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 border border-teal-500/30">
                  {q.company}
                </span>
                <span className="text-[10px] font-mono text-slate-600 dark:text-slate-400 font-bold">
                  {q.difficulty} • {q.experience}
                </span>
              </div>

              <h3 className="font-extrabold text-slate-900 dark:text-white text-base font-heading leading-snug">
                {q.title}
              </h3>

              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                {q.summary}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-teal-700 dark:text-teal-400 font-mono font-bold">
                🔥 {q.frequency}
              </span>

              <Link
                to="/mock-interview"
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 shadow transition"
              >
                Practice in AI Room
              </Link>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
