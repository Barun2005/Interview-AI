import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('interview_ai_user');
    return saved ? JSON.parse(saved) : {
      id: 'usr_101',
      name: 'Alex Mercer',
      email: 'alex.mercer@example.com',
      role: 'user',
      isEmailVerified: true,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      title: 'Full Stack Engineer Candidate',
      experienceLevel: 'Intermediate',
      targetRole: 'Senior Frontend Developer',
      skills: ['React', 'Node.js', 'System Design', 'TypeScript', 'Data Structures', 'Python'],
      subscription: {
        plan: 'Pro Tier',
        status: 'active',
        renewsOn: '2026-12-31'
      },
      stats: {
        totalInterviews: 14,
        avgScore: 88,
        practiceHours: 18.5,
        streakDays: 5
      }
    };
  });

  const [isAdmin, setIsAdmin] = useState(currentUser?.role === 'admin');

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('interview_ai_user', JSON.stringify(currentUser));
      setIsAdmin(currentUser.role === 'admin');
    } else {
      localStorage.removeItem('interview_ai_user');
      setIsAdmin(false);
    }
  }, [currentUser]);

  const login = async (email, password) => {
    const apiRes = await api.login(email, password);
    const apiUser = apiRes?.user;
    const role = (apiUser?.role || (email.includes('admin') ? 'admin' : 'user'));

    const user = {
      id: apiUser?._id || apiUser?.id || 'usr_' + Date.now(),
      _id: apiUser?._id,
      name: apiUser?.name || email.split('@')[0].replace('.', ' ').toUpperCase(),
      email: email,
      role: role,
      isEmailVerified: apiUser?.isEmailVerified ?? true,
      avatar: apiUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      title: role === 'admin' ? 'Platform Administrator' : 'Software Engineer Candidate',
      experienceLevel: apiUser?.experienceLevel || 'Intermediate',
      targetRole: apiUser?.targetRole || 'Fullstack Developer',
      skills: apiUser?.skills?.length ? apiUser.skills : ['React', 'JavaScript', 'Node.js', 'System Design'],
      subscription: apiUser?.subscription || {
        plan: 'Pro Tier',
        status: 'active',
        renewsOn: '2026-12-31'
      },
      stats: {
        totalInterviews: 12,
        avgScore: 84,
        practiceHours: 14.2,
        streakDays: 4
      }
    };

    setCurrentUser(user);
    return user;
  };

  const signup = async (name, email, password, targetRole = 'Full Stack Engineer') => {
    const apiRes = await api.signup(name, email, password, targetRole);
    const apiUser = apiRes?.user;
    const userName = apiUser?.name || name || 'New Candidate';
    const userEmail = apiUser?.email || email || 'candidate@example.com';

    const user = {
      id: apiUser?._id || apiUser?.id || 'usr_' + Date.now(),
      _id: apiUser?._id,
      name: userName,
      email: userEmail,
      role: 'user',
      isEmailVerified: apiUser?.isEmailVerified || false,
      avatar: apiUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      title: targetRole || 'Software Engineer Candidate',
      experienceLevel: 'Intermediate',
      targetRole: targetRole || 'Senior Full Stack Developer',
      skills: ['React', 'Node.js', 'System Design', 'TypeScript'],
      subscription: {
        plan: 'Pro Tier',
        status: 'active',
        renewsOn: '2026-12-31'
      },
      stats: {
        totalInterviews: 0,
        avgScore: 85,
        practiceHours: 0,
        streakDays: 1
      }
    };

    setCurrentUser(user);
    return { user, otpCode: apiRes?.otpCode };
  };

  const sendOtp = async (email) => {
    return await api.sendOtp(email);
  };

  const verifyOtp = async (email, otpCode) => {
    const res = await api.verifyOtp(email, otpCode);
    if (res?.success) {
      setCurrentUser(prev => prev ? { ...prev, isEmailVerified: true } : prev);
    }
    return res;
  };

  const forgotPassword = async (email) => {
    return await api.forgotPassword(email);
  };

  const resetPassword = async (email, otpCode, newPassword) => {
    return await api.resetPassword(email, otpCode, newPassword);
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateProfile = async (updatedFields) => {
    if (currentUser?.id || currentUser?._id) {
      api.updateProfile(currentUser._id || currentUser.id, updatedFields);
    }
    setCurrentUser(prev => ({
      ...prev,
      ...updatedFields
    }));
  };

  const toggleRole = () => {
    setCurrentUser(prev => ({
      ...prev,
      role: prev.role === 'admin' ? 'user' : 'admin'
    }));
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      isAuthenticated: !!currentUser,
      isAdmin,
      login,
      signup,
      sendOtp,
      verifyOtp,
      forgotPassword,
      resetPassword,
      logout,
      updateProfile,
      toggleRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};
