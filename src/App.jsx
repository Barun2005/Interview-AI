import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { InterviewProvider } from './context/InterviewContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { MockInterviewPage } from './pages/MockInterviewPage';
import { PostInterviewSummaryPage } from './pages/PostInterviewSummaryPage';
import { CodingInterviewPage } from './pages/CodingInterviewPage';
import { ResumeAnalyzerPage } from './pages/ResumeAnalyzerPage';
import { AiHrCoachPage } from './pages/AiHrCoachPage';
import { CompanyLibraryPage } from './pages/CompanyLibraryPage';
import { ScheduleBookingPage } from './pages/ScheduleBookingPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { ProfilePage } from './pages/ProfilePage';
import { AdminPanelPage } from './pages/AdminPanelPage';
import { LoginPage, SignupPage } from './pages/AuthPages';

// Protected Route Wrapper
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <InterviewProvider>
          <Router>
            <div className="min-h-screen flex flex-col justify-between selection:bg-teal-500 selection:text-white transition-colors duration-300">
              <div>
                <Navbar />
                <main>
                  <Routes>
                    {/* Public Landing & Auth Routes */}
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />

                    {/* Candidate Core Routes */}
                    <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
                    <Route path="/mock-interview" element={<ProtectedRoute><MockInterviewPage /></ProtectedRoute>} />
                    <Route path="/summary/:id" element={<ProtectedRoute><PostInterviewSummaryPage /></ProtectedRoute>} />
                    <Route path="/coding-interview" element={<ProtectedRoute><CodingInterviewPage /></ProtectedRoute>} />
                    <Route path="/resume-analyzer" element={<ProtectedRoute><ResumeAnalyzerPage /></ProtectedRoute>} />
                    <Route path="/hr-coach" element={<ProtectedRoute><AiHrCoachPage /></ProtectedRoute>} />
                    <Route path="/company-library" element={<ProtectedRoute><CompanyLibraryPage /></ProtectedRoute>} />
                    <Route path="/schedule" element={<ProtectedRoute><ScheduleBookingPage /></ProtectedRoute>} />
                    <Route path="/leaderboard" element={<ProtectedRoute><LeaderboardPage /></ProtectedRoute>} />
                    <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

                    {/* Admin Protected Route */}
                    <Route path="/admin" element={<ProtectedRoute requireAdmin={true}><AdminPanelPage /></ProtectedRoute>} />

                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </main>
              </div>
              <Footer />
            </div>
          </Router>
        </InterviewProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
