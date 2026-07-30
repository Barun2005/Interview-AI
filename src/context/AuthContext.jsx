import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('interview_ai_user');
    return saved ? JSON.parse(saved) : {
      id: 'usr_101',
      name: 'Alex Mercer',
      email: 'alex.mercer@example.com',
      role: 'user', // 'user' or 'admin'
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
    // Simulated API call
    const role = email.includes('admin') ? 'admin' : 'user';
    const user = {
      id: 'usr_' + Date.now(),
      name: email.split('@')[0].replace('.', ' ').toUpperCase(),
      email: email,
      role: role,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      title: role === 'admin' ? 'Platform Administrator' : 'Software Engineer Candidate',
      experienceLevel: 'Intermediate',
      targetRole: 'Fullstack Developer',
      skills: ['React', 'JavaScript', 'Node.js', 'System Design'],
      subscription: {
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
    const userName = name || 'New Candidate';
    const userEmail = email || 'candidate@example.com';
    const user = {
      id: 'usr_' + Date.now(),
      name: userName,
      email: userEmail,
      role: 'user',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
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
    return user;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateProfile = (updatedFields) => {
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
      logout,
      updateProfile,
      toggleRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};
