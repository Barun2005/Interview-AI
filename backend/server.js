import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'InterviewAI API', version: '1.0.0', timestamp: new Date() });
});

// Mock Auth Routes
app.post('/api/auth/login', (req, res) => {
  const { email } = req.body;
  res.json({
    token: 'jwt_mock_token_sample',
    user: {
      id: 'usr_101',
      name: email ? email.split('@')[0] : 'Candidate',
      email,
      role: email?.includes('admin') ? 'admin' : 'user'
    }
  });
});

// Mock Interview Evaluation Route
app.post('/api/interviews/evaluate', (req, res) => {
  const { answers, type, company } = req.body;
  res.json({
    id: 'eval_' + Date.now(),
    score: 88,
    communicationScore: 90,
    technicalScore: 86,
    confidenceScore: 88,
    strengths: ['Clear terminology', 'Structured STAR responses'],
    improvements: ['Include revenue metrics in past results'],
    answersCount: answers ? answers.length : 0
  });
});

// Mock Resume Analysis Route
app.post('/api/resume/analyze', (req, res) => {
  res.json({
    atsScore: 82,
    matchingKeywords: ['React.js', 'Node.js', 'System Architecture'],
    missingKeywords: ['Docker', 'AWS Lambda', 'GraphQL'],
    weakBulletPoints: ['Worked on frontend features']
  });
});

app.listen(PORT, () => {
  console.log(`🚀 InterviewAI Backend API Server running on port ${PORT}`);
});
