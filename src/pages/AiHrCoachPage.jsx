import React, { useState } from 'react';
import { 
  MessageSquare, 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Lightbulb, 
  DollarSign, 
  Briefcase, 
  HelpCircle 
} from 'lucide-react';

export const AiHrCoachPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "Hello! I'm your dedicated AI HR & Career Coach. I can help you prepare perfect responses for 'Tell me about yourself', salary negotiations, behavioral STAR questions, or company culture fit. What would you like to practice today?"
    }
  ]);
  const [input, setInput] = useState('');

  const quickTopics = [
    { label: 'Tell me about yourself', prompt: 'How should I structure the "Tell me about yourself" question for a Senior Tech Lead role?' },
    { label: 'Salary Negotiation', prompt: 'What script can I use to negotiate a 15% higher base salary after getting a job offer?' },
    { label: 'Why should we hire you?', prompt: 'Give me a winning response for "Why should we hire you over other candidates?"' },
    { label: 'Strengths & Weaknesses', prompt: 'How do I answer "What is your biggest weakness?" without sounding unhireable?' }
  ];

  const handleSend = (textToSend = input) => {
    if (!textToSend.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    if (textToSend === input) setInput('');

    // AI Response Simulation
    setTimeout(() => {
      let aiText = "That's a fantastic question. The key is to structure your response using the STAR method (Situation, Task, Action, Result). Always quantify your impact with specific percentages or scale metrics!";
      
      if (textToSend.toLowerCase().includes('tell me about yourself')) {
        aiText = "Structure your answer in 3 parts:\n1. Past (20%): Your background in engineering & foundational projects.\n2. Present (60%): Your current core technical mastery and recent major impact.\n3. Future (20%): Why this company's mission perfectly aligns with your next career trajectory.";
      } else if (textToSend.toLowerCase().includes('salary')) {
        aiText = "When negotiating salary:\n• Never give a single number first; state a researched range based on Levels.fyi or Glassdoor.\n• Express enthusiasm: 'I am thrilled about the team! Based on my experience with system architecture, I was hoping for a base of $145k-$155k.'\n• Consider total compensation (equity, performance bonus, signing bonus).";
      } else if (textToSend.toLowerCase().includes('weakness')) {
        aiText = "Use a genuine technical area you are actively remediating. Example:\n'In the past, I tended to dive directly into coding before writing comprehensive unit test specs. Recently, I adopted Test-Driven Development (TDD) using Jest, which reduced regression bugs by 40%.'";
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'ai', text: aiText }]);
    }, 600);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-4 space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading flex items-center gap-2">
          AI HR & Career Coach <MessageSquare className="w-6 h-6 text-indigo-400" />
        </h1>
        <p className="text-xs text-slate-400">
          Get instant guidance on HR interview questions, salary negotiations, and behavioral STAR stories.
        </p>
      </div>

      {/* Quick Topic Chips */}
      <div className="flex flex-wrap gap-2">
        {quickTopics.map((topic, i) => (
          <button
            key={i}
            onClick={() => handleSend(topic.prompt)}
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 text-slate-300 text-xs font-medium transition flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            {topic.label}
          </button>
        ))}
      </div>

      {/* Chat Container */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-800 min-h-[460px] flex flex-col justify-between space-y-4">
        
        {/* Messages Feed */}
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0 ${
                msg.sender === 'user' ? 'bg-indigo-600' : 'bg-purple-600'
              }`}>
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`p-4 rounded-2xl text-xs sm:text-sm max-w-lg leading-relaxed whitespace-pre-line ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-tr-none'
                  : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center gap-2 pt-2 border-t border-slate-800">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your HR coach anything (e.g. How to answer salary questions)..."
            className="w-full glass-input px-4 py-2.5 rounded-xl text-xs sm:text-sm"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl gradient-button text-white text-xs font-bold shrink-0 flex items-center gap-1 shadow-lg shadow-indigo-600/30"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>

    </div>
  );
};
