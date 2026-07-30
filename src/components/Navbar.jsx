import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Sparkles } from 'lucide-react';

export const Navbar = () => {
  const { currentUser, logout, isAdmin, toggleRole } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* TopAppBar - Day / Night Mode Compatible Header */}
      <header className="w-full top-0 sticky bg-white dark:bg-[#0b0f19] border-b border-slate-300 dark:border-slate-800 z-40 shadow-sm transition-colors duration-300">
        <div className="flex items-center justify-between px-6 py-3 w-full max-w-[1280px] mx-auto h-16">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-4">
            <Link to={currentUser ? '/dashboard' : '/'} className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md group-hover:scale-105 transition">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Interview<span className="text-teal-600 dark:text-teal-400">Pro</span>
              </span>
            </Link>
            
            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-2 ml-6">
              {[
                { name: 'Dashboard', path: '/dashboard' },
                { name: 'Interview Room', path: '/mock-interview' },
                { name: 'Coding Lab', path: '/coding-interview' },
                { name: 'Company Jobs', path: '/company-library' },
                { name: 'Resume ATS', path: '/resume-analyzer' },
                { name: 'Schedule', path: '/schedule' },
              ].map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`font-sans text-xs font-bold px-3 py-2 rounded-xl transition-all ${
                      active
                        ? 'bg-teal-600 text-white shadow-md'
                        : 'text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}

              {isAdmin && (
                <Link
                  to="/admin"
                  className={`font-sans text-xs font-bold px-3 py-2 rounded-xl transition-all ${
                    isActive('/admin')
                      ? 'bg-rose-600 text-white shadow-md'
                      : 'text-rose-700 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-950/40'
                  }`}
                >
                  Admin Portal
                </Link>
              )}
            </nav>
          </div>

          {/* Right Action Items */}
          <div className="flex items-center gap-3">
            
            {/* DAY / NIGHT MODE TOGGLE BUTTON */}
            <button
              onClick={toggleTheme}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 transition font-mono text-xs font-bold shadow-sm"
              title="Toggle Day / Night Mode"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="hidden sm:inline">Day Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-indigo-600 fill-indigo-600" />
                  <span className="hidden sm:inline">Night Mode</span>
                </>
              )}
            </button>

            {/* Quick Role Toggle */}
            <button
              onClick={toggleRole}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
            >
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
              Role: <span className="text-teal-600 dark:text-teal-400 uppercase">{currentUser?.role || 'USER'}</span>
            </button>

            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="w-10 h-10 rounded-full border-2 border-teal-600 dark:border-teal-400 overflow-hidden shadow-sm hover:scale-105 transition"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-full h-full object-cover"
                  />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-xl shadow-2xl py-2 z-50 border border-slate-300 dark:border-slate-800 text-sm">
                    <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-800">
                      <p className="font-bold text-slate-900 dark:text-white">{currentUser.name}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400 truncate">{currentUser.email}</p>
                      <span className="mt-1 inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 border border-teal-500/30">
                        {currentUser.subscription?.plan || 'Pro Tier'}
                      </span>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 font-bold text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                    >
                      <span className="material-symbols-outlined text-sm text-teal-600 dark:text-teal-400">edit</span>
                      Edit Candidate Profile
                    </Link>

                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        logout();
                      }}
                      className="w-full text-left px-4 py-2 font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="text-xs font-bold text-slate-800 dark:text-slate-200 hover:underline px-3 py-1.5">
                  Sign In
                </Link>
                <Link to="/signup" className="text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded-xl transition shadow">
                  Get Started
                </Link>
              </div>
            )}

          </div>

        </div>
      </header>

      {/* Mobile Bottom Navigation Bar (Stitch BottomNavBar) */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 bg-white dark:bg-[#0b0f19] border-t border-slate-300 dark:border-slate-800 shadow-lg">
        <div className="flex justify-around items-center w-full h-16 px-2">
          {[
            { name: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
            { name: 'Room', path: '/mock-interview', icon: 'video_chat' },
            { name: 'Code Lab', path: '/coding-interview', icon: 'code' },
            { name: 'Jobs', path: '/company-library', icon: 'work' },
            { name: 'Schedule', path: '/schedule', icon: 'calendar_month' },
          ].map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center px-3 py-1 rounded-xl text-[10px] font-mono transition ${
                  active
                    ? 'bg-teal-600 text-white font-bold shadow'
                    : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                <span className="material-symbols-outlined text-lg">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};
