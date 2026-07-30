import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Sparkles, 
  Mail, 
  Lock, 
  User, 
  ArrowRight, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  CheckCircle2,
  LogIn,
  UserPlus,
  KeyRound
} from 'lucide-react';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('alex.mercer@example.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      // Optional Backend API call to http://localhost:5000/api/auth/login
      try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        if (response.ok) {
          const data = await response.json();
          console.log('Backend Auth Response:', data);
        }
      } catch (err) {
        console.log('Backend connection fallback to local context authentication');
      }

      await login(email, password);
      setIsLoading(false);
      navigate('/dashboard');
    } catch (err) {
      setIsLoading(false);
      setErrorMessage('Invalid credentials. Please try again.');
    }
  };

  const handleQuickRole = (roleEmail) => {
    setEmail(roleEmail);
    setPassword('password123');
  };

  const handleForgotPassword = () => {
    setForgotSent(true);
    setTimeout(() => setForgotSent(false), 4000);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 sm:py-16 space-y-6">
      
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-600 to-indigo-600 flex items-center justify-center text-white mx-auto shadow-lg shadow-indigo-600/30">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading">
          Welcome back to <span className="gradient-text">InterviewAI</span>
        </h1>
        <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
          Sign in to practice voice interviews, run code tests & access ATS reports
        </p>
      </div>

      {/* Main Login Card */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-300 dark:border-slate-800 space-y-5 shadow-lg">
        
        {/* Quick Demo Credentials Switcher */}
        <div className="p-3 rounded-xl bg-indigo-500/10 dark:bg-indigo-950/40 border border-indigo-500/20 space-y-2">
          <p className="text-[11px] font-mono font-bold text-indigo-700 dark:text-indigo-300 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" /> Quick Demo Login Presets:
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleQuickRole('candidate@example.com')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition ${
                email.includes('admin') 
                  ? 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300' 
                  : 'bg-teal-600 text-white shadow-sm'
              }`}
            >
              Candidate Role
            </button>
            <button
              type="button"
              onClick={() => handleQuickRole('admin@interviewai.com')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-bold transition ${
                email.includes('admin') 
                  ? 'bg-rose-600 text-white shadow-sm' 
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              Admin Role
            </button>
          </div>
        </div>

        {/* OAuth Buttons */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => { login('alex.mercer@example.com', 'password'); navigate('/dashboard'); }}
            className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center justify-center gap-2 transition shadow-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"/>
              <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"/>
              <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12.5s.7 2.8 1.9 5.2l3.7-2.9z"/>
              <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 17C3.7 20.7 7.5 24 12 24z"/>
            </svg>
            Continue with Google
          </button>
        </div>

        <div className="flex items-center gap-3 text-[11px] text-slate-500 font-mono">
          <div className="h-px bg-slate-300 dark:bg-slate-800 w-full"></div>
          <span>OR</span>
          <div className="h-px bg-slate-300 dark:bg-slate-800 w-full"></div>
        </div>

        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-500/20 text-rose-800 dark:text-rose-300 border border-rose-500/30 text-xs font-semibold">
            {errorMessage}
          </div>
        )}

        {forgotSent && (
          <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Password reset instructions sent to {email}
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="text-slate-700 dark:text-slate-300 font-bold uppercase font-mono flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" /> Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs"
              placeholder="name@example.com"
              required
            />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-slate-700 dark:text-slate-300 font-bold uppercase font-mono flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" /> Password
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
              >
                Forgot?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full glass-input px-3.5 py-2.5 pr-10 rounded-xl text-xs"
                placeholder="Enter password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300 font-medium">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-slate-400 text-teal-600 focus:ring-teal-500"
              />
              Remember me for 30 days
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl text-xs font-bold text-white gradient-button flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 hover:scale-[1.02] transition disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                Signing In...
              </span>
            ) : (
              <>
                <LogIn className="w-4 h-4" /> Sign In to Dashboard
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-3 text-xs text-slate-600 dark:text-slate-400 font-medium border-t border-slate-200 dark:border-slate-800">
          Don't have an account yet?{' '}
          <Link to="/signup" className="text-indigo-600 dark:text-indigo-400 font-extrabold hover:underline">
            Create Free Account
          </Link>
        </div>

      </div>
    </div>
  );
};

export const SignupPage = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  
  const [name, setName] = useState('Alex Mercer');
  const [email, setEmail] = useState('alex.mercer@example.com');
  const [password, setPassword] = useState('password123');
  const [targetRole, setTargetRole] = useState('Senior Full Stack Developer');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      await signup(
        name || 'Alex Mercer', 
        email || 'alex.mercer@example.com', 
        password || 'password123', 
        targetRole
      );
      setIsLoading(false);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setIsLoading(false);
      setErrorMessage('Registration failed. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 sm:py-16 space-y-6">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-600 to-indigo-600 flex items-center justify-center text-white mx-auto shadow-lg shadow-indigo-600/30">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading">
          Create Your <span className="gradient-text">InterviewAI</span> Account
        </h1>
        <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
          Start practicing realistic voice interviews in under 60 seconds
        </p>
      </div>

      {/* Card */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-300 dark:border-slate-800 space-y-5 shadow-lg">
        
        {/* Quick Google Registration */}
        <button
          type="button"
          onClick={() => { signup('Alex Rivers', 'alex.rivers@example.com', 'password', 'Senior Full Stack Developer'); navigate('/dashboard'); }}
          className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-slate-100 flex items-center justify-center gap-2 transition shadow-sm"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"/>
            <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"/>
            <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12.5s.7 2.8 1.9 5.2l3.7-2.9z"/>
            <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 17C3.7 20.7 7.5 24 12 24z"/>
          </svg>
          Sign Up with Google
        </button>

        <div className="flex items-center gap-3 text-[11px] text-slate-500 font-mono">
          <div className="h-px bg-slate-300 dark:bg-slate-800 w-full"></div>
          <span>OR</span>
          <div className="h-px bg-slate-300 dark:bg-slate-800 w-full"></div>
        </div>

        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-500/20 text-rose-800 dark:text-rose-300 border border-rose-500/30 text-xs font-semibold">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="text-slate-700 dark:text-slate-300 font-bold uppercase font-mono flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" /> Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Mercer"
              className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-700 dark:text-slate-300 font-bold uppercase font-mono flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" /> Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@example.com"
              className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-slate-700 dark:text-slate-300 font-bold uppercase font-mono flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" /> Target Role
            </label>
            <select
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs font-semibold"
            >
              <option value="Senior Full Stack Developer">Senior Full Stack Developer</option>
              <option value="Frontend React Developer">Frontend React Developer</option>
              <option value="Backend Node.js Engineer">Backend Node.js Engineer</option>
              <option value="System Design Architect">System Design Architect</option>
              <option value="Data Scientist / AI Engineer">Data Scientist / AI Engineer</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-slate-700 dark:text-slate-300 font-bold uppercase font-mono flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" /> Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 8 characters"
                className="w-full glass-input px-3.5 py-2.5 pr-10 rounded-xl text-xs"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="pt-1">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl text-xs font-bold text-white gradient-button flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 hover:scale-[1.02] transition disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                  Creating Account...
                </span>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" /> Create Free Account
                </>
              )}
            </button>
          </div>
        </form>

        <div className="text-center pt-3 text-xs text-slate-600 dark:text-slate-400 font-medium border-t border-slate-200 dark:border-slate-800">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 dark:text-indigo-400 font-extrabold hover:underline">
            Sign in
          </Link>
        </div>

      </div>
    </div>
  );
};
