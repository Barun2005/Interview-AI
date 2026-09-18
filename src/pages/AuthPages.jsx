import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Sparkles, 
  Mail, 
  Lock, 
  User, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  CheckCircle2,
  LogIn,
  UserPlus,
  KeyRound,
  ArrowRight,
  RefreshCw,
  AlertCircle
} from 'lucide-react';

export const LoginPage = ({ initialMode = 'login' }) => {
  const navigate = useNavigate();
  const { login, signup, sendOtp, verifyOtp, forgotPassword, resetPassword } = useAuth();

  // Mode: 'login' | 'signup' | 'otp-verify' | 'forgot-pwd'
  const [authMode, setAuthMode] = useState(initialMode);

  useEffect(() => {
    if (initialMode) {
      setAuthMode(initialMode);
    }
  }, [initialMode]);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('alex.mercer@example.com');
  const [password, setPassword] = useState('password123');
  const [newPassword, setNewPassword] = useState('');
  const [targetRole, setTargetRole] = useState('Full Stack Engineer');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // OTP inputs (6 digits)
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const otpInputRefs = useRef([]);
  const [liveOtpCode, setLiveOtpCode] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  // UI status states
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Resend OTP countdown timer
  useEffect(() => {
    let interval = null;
    if (resendTimer > 0 && !canResend) {
      interval = setInterval(() => {
        setResendTimer(prev => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer, canResend]);

  // Handle Quick Login presets
  const handleQuickRole = (roleEmail) => {
    setEmail(roleEmail);
    setPassword('password123');
  };

  // Login submit handler
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      await login(email, password);
      setIsLoading(false);
      navigate('/dashboard');
    } catch (err) {
      setIsLoading(false);
      setErrorMessage(err?.message || 'Invalid email or password. Please try again.');
    }
  };

  // Signup submit handler -> Triggers OTP step
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const res = await signup(name, email, password, targetRole);
      setIsLoading(false);
      if (res?.otpCode) {
        setLiveOtpCode(res.otpCode);
      }
      setResendTimer(30);
      setCanResend(false);
      setAuthMode('otp-verify');
      setSuccessMessage(`Account created! A 6-digit verification code was sent to ${email}`);
    } catch (err) {
      setIsLoading(false);
      setErrorMessage(err?.message || 'Registration failed. Please check your inputs.');
    }
  };

  // Handle OTP digit box changes & auto-focus
  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const updated = [...otpDigits];
    updated[index] = value.slice(-1);
    setOtpDigits(updated);

    // Auto-advance to next input
    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  // OTP Verification Submit Handler
  const handleOtpVerifySubmit = async (e) => {
    e.preventDefault();
    const fullOtp = otpDigits.join('');
    if (fullOtp.length < 6) {
      setErrorMessage('Please enter all 6 digits of the OTP code.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const res = await verifyOtp(email, fullOtp);
      setIsLoading(false);
      if (res?.success) {
        setSuccessMessage('✅ Email verified successfully! Redirecting to Dashboard...');
        setTimeout(() => navigate('/dashboard'), 1500);
      } else {
        setErrorMessage(res?.error || 'Invalid OTP code. Please check and try again.');
      }
    } catch (err) {
      setIsLoading(false);
      setErrorMessage('Verification failed. Invalid or expired OTP.');
    }
  };

  // Resend OTP handler
  const handleResendOtp = async () => {
    setIsLoading(true);
    setErrorMessage('');
    const res = await sendOtp(email);
    setIsLoading(false);
    if (res?.otpCode) {
      setLiveOtpCode(res.otpCode);
    }
    setResendTimer(30);
    setCanResend(false);
    setSuccessMessage(`New OTP code sent to ${email}`);
  };

  // Forgot Password Request OTP
  const handleForgotPasswordRequest = async (e) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage('Please enter your registered email address.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const res = await forgotPassword(email);
      setIsLoading(false);
      if (res?.otpCode) setLiveOtpCode(res.otpCode);
      setResendTimer(30);
      setCanResend(false);
      setSuccessMessage(`Password reset code sent to ${email}`);
    } catch (err) {
      setIsLoading(false);
      setErrorMessage('Failed to send reset code. Please check email address.');
    }
  };

  // Reset Password Submit with OTP
  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    const fullOtp = otpDigits.join('');
    if (fullOtp.length < 6) {
      setErrorMessage('Please enter the 6-digit OTP code.');
      return;
    }
    if (!newPassword) {
      setErrorMessage('Please enter your new password.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const res = await resetPassword(email, fullOtp, newPassword);
      setIsLoading(false);
      if (res?.success) {
        setSuccessMessage('🎉 Password reset successfully! You can now log in.');
        setTimeout(() => {
          setPassword(newPassword);
          setAuthMode('login');
          setSuccessMessage('Login with your new password.');
        }, 1800);
      } else {
        setErrorMessage(res?.error || 'Invalid OTP code.');
      }
    } catch (err) {
      setIsLoading(false);
      setErrorMessage('Failed to reset password. Please verify your OTP code.');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12 sm:py-16 space-y-6">
      
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-600 to-indigo-600 flex items-center justify-center text-white mx-auto shadow-lg shadow-indigo-600/30">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading">
          {authMode === 'login' && <>Welcome back to <span className="gradient-text">InterviewAI</span></>}
          {authMode === 'signup' && <>Create Your <span className="gradient-text">InterviewAI</span> Account</>}
          {authMode === 'otp-verify' && <>Verify Your <span className="gradient-text">Email Address</span></>}
          {authMode === 'forgot-pwd' && <>Reset Your <span className="gradient-text">Password</span></>}
        </h1>
        <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
          {authMode === 'login' && 'Sign in to practice voice interviews, run code tests & access ATS reports'}
          {authMode === 'signup' && 'Join thousands of candidates mastering technical & HR interviews with AI'}
          {authMode === 'otp-verify' && `Enter the 6-digit code sent to ${email}`}
          {authMode === 'forgot-pwd' && 'Enter your email to receive a password reset verification code'}
        </p>
      </div>

      {/* Main Authentication Card */}
      <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-300 dark:border-slate-800 space-y-5 shadow-lg relative overflow-hidden">

        {/* Tab Switcher (Login vs Signup) */}
        {(authMode === 'login' || authMode === 'signup') && (
          <div className="grid grid-cols-2 gap-1 p-1 bg-slate-200/60 dark:bg-slate-900/60 rounded-xl border border-slate-300/40 dark:border-slate-800/40 text-xs font-bold">
            <button
              type="button"
              onClick={() => { setAuthMode('login'); setErrorMessage(''); setSuccessMessage(''); }}
              className={`py-2 rounded-lg transition flex items-center justify-center gap-1.5 ${
                authMode === 'login' 
                  ? 'bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 shadow-sm' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" /> Sign In
            </button>
            <button
              type="button"
              onClick={() => { setAuthMode('signup'); setErrorMessage(''); setSuccessMessage(''); }}
              className={`py-2 rounded-lg transition flex items-center justify-center gap-1.5 ${
                authMode === 'signup' 
                  ? 'bg-white dark:bg-slate-800 text-teal-600 dark:text-teal-400 shadow-sm' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" /> Sign Up
            </button>
          </div>
        )}

        {/* Quick Demo Credentials Switcher (Only on Login) */}
        {authMode === 'login' && (
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
        )}

        {/* Simulated Live OTP Toast Notification */}
        {liveOtpCode && (authMode === 'otp-verify' || authMode === 'forgot-pwd') && (
          <div className="p-3 rounded-xl bg-teal-500/20 text-teal-800 dark:text-teal-200 border border-teal-500/40 text-xs font-mono font-bold flex items-center justify-between shadow-sm animate-pulse">
            <span className="flex items-center gap-1.5">
              <KeyRound className="w-4 h-4 text-teal-500" /> Verification Code (Simulated):
            </span>
            <span className="bg-teal-600 text-white px-2.5 py-0.5 rounded-lg font-mono text-sm tracking-widest">
              {liveOtpCode}
            </span>
          </div>
        )}

        {/* Alert Notifications */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-500/20 text-rose-800 dark:text-rose-300 border border-rose-500/30 text-xs font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* ---------------- LOGIN FORM ---------------- */}
        {authMode === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="text-slate-700 dark:text-slate-300 font-bold uppercase font-mono flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" /> Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs"
                placeholder="name@company.com"
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
                  onClick={() => { setAuthMode('forgot-pwd'); setErrorMessage(''); setSuccessMessage(''); }}
                  className="text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:underline"
                >
                  Forgot Password?
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
        )}

        {/* ---------------- SIGNUP FORM ---------------- */}
        {authMode === 'signup' && (
          <form onSubmit={handleSignupSubmit} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="text-slate-700 dark:text-slate-300 font-bold uppercase font-mono flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" /> Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs"
                placeholder="Alex Mercer"
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
                className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs"
                placeholder="alex.mercer@example.com"
                required
              />
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
                  className="w-full glass-input px-3.5 py-2.5 pr-10 rounded-xl text-xs"
                  placeholder="Create a strong password"
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

            <div className="space-y-1">
              <label className="text-slate-700 dark:text-slate-300 font-bold uppercase font-mono flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" /> Target Engineering Role
              </label>
              <select
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs bg-white dark:bg-slate-900"
              >
                <option value="Full Stack Engineer">Full Stack Engineer</option>
                <option value="Frontend Developer (React)">Frontend Developer (React)</option>
                <option value="Backend Developer (Node.js)">Backend Developer (Node.js)</option>
                <option value="System Design Architect">System Design Architect</option>
                <option value="Data Engineer / AI Engineer">Data Engineer / AI Engineer</option>
              </select>
            </div>

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
                  <UserPlus className="w-4 h-4" /> Sign Up & Send Verification OTP
                </>
              )}
            </button>
          </form>
        )}

        {/* ---------------- OTP VERIFICATION STEP ---------------- */}
        {authMode === 'otp-verify' && (
          <form onSubmit={handleOtpVerifySubmit} className="space-y-5 text-xs text-center">
            
            <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/20 text-slate-700 dark:text-slate-300 space-y-1">
              <p className="font-bold text-teal-600 dark:text-teal-400 flex items-center justify-center gap-1">
                <ShieldCheck className="w-4 h-4" /> Verification Required
              </p>
              <p className="text-[11px]">
                Enter the 6-digit code sent to <span className="font-bold text-slate-900 dark:text-white">{email}</span>
              </p>
            </div>

            {/* 6 Digit Inputs */}
            <div className="flex items-center justify-center gap-2 my-4">
              {otpDigits.map((digit, idx) => (
                <input
                  key={idx}
                  ref={el => otpInputRefs.current[idx] = el}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                  className="w-10 h-12 text-center text-lg font-mono font-extrabold rounded-xl glass-input border-2 border-slate-300 focus:border-teal-500 dark:border-slate-700 dark:focus:border-teal-400 text-slate-900 dark:text-white shadow-sm transition"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl text-xs font-bold text-white gradient-button flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 hover:scale-[1.02] transition disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                  Verifying Code...
                </span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" /> Verify Email & Continue
                </>
              )}
            </button>

            {/* Resend Timer */}
            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setAuthMode('signup')}
                className="hover:underline text-slate-600 dark:text-slate-400 font-medium"
              >
                ← Back to Signup
              </button>

              <button
                type="button"
                disabled={!canResend || isLoading}
                onClick={handleResendOtp}
                className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline disabled:opacity-50 flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                {canResend ? 'Resend OTP' : `Resend in ${resendTimer}s`}
              </button>
            </div>
          </form>
        )}

        {/* ---------------- FORGOT PASSWORD STEP ---------------- */}
        {authMode === 'forgot-pwd' && (
          <div className="space-y-4 text-xs">
            
            <div className="space-y-1">
              <label className="text-slate-700 dark:text-slate-300 font-bold uppercase font-mono flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" /> Account Email Address
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs"
                  placeholder="name@company.com"
                  required
                />
                <button
                  type="button"
                  onClick={handleForgotPasswordRequest}
                  disabled={isLoading}
                  className="px-3 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl whitespace-nowrap text-[11px] transition shadow-sm"
                >
                  Send OTP
                </button>
              </div>
            </div>

            <form onSubmit={handleResetPasswordSubmit} className="space-y-4 pt-2 border-t border-slate-200 dark:border-slate-800">
              
              <div className="space-y-1">
                <label className="text-slate-700 dark:text-slate-300 font-bold uppercase font-mono flex items-center gap-1">
                  <KeyRound className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" /> Enter 6-Digit Verification OTP
                </label>
                <div className="flex items-center justify-center gap-2 my-2">
                  {otpDigits.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={el => otpInputRefs.current[idx] = el}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      className="w-9 h-11 text-center text-base font-mono font-extrabold rounded-xl glass-input border border-slate-300 focus:border-teal-500 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-700 dark:text-slate-300 font-bold uppercase font-mono flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" /> New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full glass-input px-3.5 py-2.5 rounded-xl text-xs"
                  placeholder="Enter new strong password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl text-xs font-bold text-white gradient-button flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 hover:scale-[1.02] transition disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                    Resetting Password...
                  </span>
                ) : (
                  <>
                    <KeyRound className="w-4 h-4" /> Reset Password & Verify
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => { setAuthMode('login'); setErrorMessage(''); setSuccessMessage(''); }}
                  className="text-xs text-slate-600 dark:text-slate-400 hover:underline font-bold"
                >
                  ← Back to Sign In
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};

export const SignupPage = (props) => <LoginPage {...props} initialMode="signup" />;

export default LoginPage;


