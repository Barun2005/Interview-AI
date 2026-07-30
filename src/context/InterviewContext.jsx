import React, { createContext, useContext, useState } from 'react';

const InterviewContext = createContext();

export const useInterview = () => useContext(InterviewContext);

export const InterviewProvider = ({ children }) => {
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
        },
        {
          question: "How do you mitigate memory leaks when using WebSockets inside long-lived React components?",
          userAnswer: "By closing the WebSocket connection inside the cleanup function returned by useEffect hook.",
          aiFeedback: "Spot on! Always handle component unmount lifecycle cleanup.",
          sampleAnswer: "Return a cleanup function in useEffect to invoke socket.close() or remove event listeners, preventing dangling callbacks."
        }
      ]
    },
    {
      id: 'int_902',
      title: 'System Design & Scalability Mock',
      type: 'System Design',
      company: 'Amazon',
      date: '2026-07-25',
      durationMinutes: 45,
      score: 84,
      communicationScore: 82,
      technicalScore: 86,
      confidenceScore: 85,
      grammarScore: 92,
      problemSolvingScore: 88,
      leadershipScore: 80,
      bodyLanguageScore: 82,
      eyeContactScore: 84,
      strengths: ['Solid trade-off evaluation between SQL and NoSQL databases', 'Good understanding of horizontal vs vertical scaling'],
      improvements: ['Include rate limiting and API Gateway patterns earlier in the design', 'Be more explicit about DB replication lag'],
      questionsAsked: [
        {
          question: "How would you design a rate limiter supporting 100,000 requests per second?",
          userAnswer: "I would use Redis with a Sliding Window Log or Token Bucket algorithm at the API Gateway level.",
          aiFeedback: "Strong answer highlighting distributed caching.",
          sampleAnswer: "Implement Redis Token Bucket algorithm at the API Gateway level with distributed locks and fallback degradation."
        }
      ]
    },
    {
      id: 'int_903',
      title: 'Behavioral & Leadership Alignment',
      type: 'HR / Behavioral',
      company: 'Google',
      date: '2026-07-20',
      durationMinutes: 20,
      score: 89,
      communicationScore: 94,
      technicalScore: 85,
      confidenceScore: 91,
      grammarScore: 96,
      problemSolvingScore: 86,
      leadershipScore: 92,
      bodyLanguageScore: 90,
      eyeContactScore: 93,
      strengths: ['Used the STAR method effectively (Situation, Task, Action, Result)', 'Showed empathy and conflict resolution skills'],
      improvements: ['Quantify business results with concrete percentages or revenue numbers where possible'],
      questionsAsked: [
        {
          question: "Tell me about a time when you disagreed with a technical decision made by your team lead.",
          userAnswer: "I presented data comparing serverless cold start times vs containerized services and suggested a hybrid POC.",
          aiFeedback: "Great objective approach using metrics rather than emotion.",
          sampleAnswer: "Focus on data-driven persuasion, listening actively to tradeoffs, and committing to the final team consensus."
        }
      ]
    }
  ]);

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

  const saveCompletedInterview = (report) => {
    setCompletedInterviews(prev => [report, ...prev]);
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
