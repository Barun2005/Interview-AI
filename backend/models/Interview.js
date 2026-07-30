// Mongoose Interview Schema Definition
export const InterviewSchema = {
  userId: { type: String, required: true },
  title: { type: String, required: true },
  type: { type: String, enum: ['Technical', 'HR', 'Behavioral', 'System Design', 'Coding'], required: true },
  company: { type: String, default: 'General' },
  durationMinutes: { type: Number, default: 30 },
  score: { type: Number, required: true },
  communicationScore: { type: Number },
  technicalScore: { type: Number },
  confidenceScore: { type: Number },
  grammarScore: { type: Number },
  problemSolvingScore: { type: Number },
  strengths: [{ type: String }],
  improvements: [{ type: String }],
  questionsAsked: [
    {
      question: String,
      userAnswer: String,
      aiFeedback: String,
      sampleAnswer: String
    }
  ],
  createdAt: { type: Date, default: Date.now }
};
