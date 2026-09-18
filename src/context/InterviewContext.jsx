import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';

const InterviewContext = createContext();

export const useInterview = () => useContext(InterviewContext);

export const InterviewProvider = ({ children }) => {
  const { currentUser } = useAuth();

  // History of completed interviews
  const [completedInterviews, setCompletedInterviews] = useState([
    {
      id: 'int_901',
      title: 'Full Stack React & Node Technical Bar',
      type: 'Technical',
      company: 'Meta',
      date: '2026-07-28',
      durationMinutes: 30,
      score: 92,
      communicationScore: 90,
      technicalScore: 94,
      confidenceScore: 88,
      grammarScore: 95,
      problemSolvingScore: 92,
      leadershipScore: 86,
      bodyLanguageScore: 89,
      eyeContactScore: 91,
      strengths: ['Clear explanation of Virtual DOM reconciliation', 'Strong algorithmic optimization using HashMap', 'Confident voice modulation'],
      improvements: ['Elaborate further on edge cases in asynchronous state batching', 'Maintain direct camera contact during complex system design queries'],
      questionsAsked: [
        {
          question: "Explain the difference between React Server Components and Client Components in terms of bundle size and execution context.",
          userAnswer: "Server components run on the server and do not ship JavaScript to the client bundle. Client components run on the client for interactivity using 'use client'.",
          aiFeedback: "Excellent summary. You accurately highlighted zero-bundle impact.",
          sampleAnswer: "Server Components execute solely on the server, rendering HTML/RSC payloads without increasing client JS bundle size. Client Components handle browser interactivity, state, and DOM listeners."
        }
      ]
    }
  ]);

  // Load backend history on user change
  useEffect(() => {
    const fetchHistory = async () => {
      if (currentUser?.id || currentUser?._id) {
        const historyRes = await api.getInterviewHistory(currentUser._id || currentUser.id);
        if (historyRes?.interviews?.length) {
          const formatted = historyRes.interviews.map(i => ({
            ...i,
            id: i._id || i.id,
            date: i.createdAt ? i.createdAt.split('T')[0] : '2026-09-18'
          }));
          setCompletedInterviews(prev => {
            const combined = [...formatted, ...prev];
            const unique = Array.from(new Map(combined.map(item => [item.id, item])).values());
            return unique;
          });
        }
      }
    };
    fetchHistory();
  }, [currentUser]);

  // Current active interview setup
  const [activeSession, setActiveSession] = useState(null);

  // Scheduled Mock Interviews
  const [scheduledInterviews, setScheduledInterviews] = useState([
    {
      id: 'sch_1',
      title: 'Senior Frontend System Design',
      type: 'Technical',
      company: 'Google',
      dateTime: '2026-08-02T15:00:00',
      interviewer: 'AI Specialist (Sophia)',
      duration: '45 mins'
    },
    {
      id: 'sch_2',
      title: 'HR Behavioral & Cultural Fit',
      type: 'HR',
      company: 'Apple',
      dateTime: '2026-08-05T10:30:00',
      interviewer: 'AI Coach (Marcus)',
      duration: '30 mins'
    }
  ]);

  const saveCompletedInterview = async (report) => {
    const payload = {
      ...report,
      userId: currentUser?._id || currentUser?.id || 'usr_101'
    };

    // Save to MongoDB Atlas via backend API
    const savedDoc = await api.saveInterviewEvaluation(payload);
    const finalReport = savedDoc ? { ...report, id: savedDoc._id || savedDoc.id } : report;

    setCompletedInterviews(prev => [finalReport, ...prev]);
  };

  const addScheduledInterview = (booking) => {
    setScheduledInterviews(prev => [...prev, booking]);
  };

  return (
    <InterviewContext.Provider value={{
      completedInterviews,
      saveCompletedInterview,
      activeSession,
      setActiveSession,
      scheduledInterviews,
      addScheduledInterview
    }}>
      {children}
    </InterviewContext.Provider>
  );
};
