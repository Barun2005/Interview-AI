# InterviewAI - AI-Powered Technical & HR Interview Preparation Platform

**InterviewAI** is a modern, full-stack SaaS web application designed to help software engineers, developers, and candidates excel in technical and HR interviews using Artificial Intelligence.

---

## 🌟 Key Features

### 🎙️ 1. Real-Time AI Voice Mock Interview Simulator
- **Voice Speech Synthesis (TTS)**: Realistic AI interviewer voice (Sophia) asking questions dynamically.
- **Speech-to-Text (STT)**: Live speech recognition using Web Speech API with real-time transcript streaming.
- **Webcam Feed & Eye Contact Monitoring**: Video preview with posture and eye contact diagnostic indicators.
- **5 Core Tracks**: Technical, HR, Behavioral (STAR method), System Design, and Coding.
- **Smart Follow-ups & Hints**: AI adaptively generates contextual follow-up questions based on candidate answers.

### 📊 2. Comprehensive AI Post-Interview Feedback & PDF Reports
- **Overall Score Gauge (0-100)**: Visual overall readiness metric.
- **10+ Score Dimensions**: Communication, Technical Knowledge, Confidence, Grammar, Vocabulary, Problem Solving, Leadership, Body Language, Eye Contact.
- **Strengths & Critical Improvements**: Specific bullet points highlighting what went well and what to fix.
- **Sample Better Answers**: Side-by-side comparison of candidate responses versus ideal AI model answers.
- **Downloadable PDF Report**: Official printable performance summary card.

### 💻 3. Interactive Coding Assessment Lab
- **Multi-Language Code Editor**: Write code in **Java**, **C++**, **Python**, or **JavaScript**.
- **Automated Execution Engine**: Run code against visible and hidden test cases.
- **AI Asymptotic Complexity Analysis**: Instant calculation of Time Complexity $O(N)$ and Space Complexity $O(N)$ with code optimization suggestions.

### 📄 4. ATS Resume Analyzer & Bullet Point Enhancer
- **ATS Compatibility Score**: Automated compatibility rating for top tech companies.
- **Missing Keywords & Skills Gap**: Highlights missing technologies (e.g. Docker, AWS, GraphQL, Redis).
- **AI Bullet Point Enhancer**: Rewrites weak resume bullet points into impact-driven STAR metrics.

### 🤖 5. AI HR Coach Chatbot
- Conversational assistant answering common HR prompts: *"Tell me about yourself"*, salary negotiation scripts, and behavioral STAR stories.

### 🏢 6. Company Interview Question Library
- Question sets for **15+ Top Companies**: Google, Microsoft, Amazon, Meta, Apple, NVIDIA, Adobe, IBM, Deloitte, Accenture, TCS, Infosys, Wipro, Cognizant, Capgemini.
- Filter by Company, Role, Difficulty, and Experience level.

### 📅 7. Mock Interview Scheduler & Leaderboard
- Calendar booking for peer or AI specialist sessions.
- Global community streak leaderboard and score badges.

### 🛡️ 8. Admin Portal & User Settings
- Admin dashboard to manage candidate accounts, edit question bank items, and inspect platform analytics.
- User profile manager with verified certificate downloads.

---

## 🚀 Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons, Web Speech API (STT/TTS).
- **Backend API**: Node.js, Express.js, CORS.
- **Database Schemas**: MongoDB Mongoose models (User, Interview, Question, Resume).
- **Design Aesthetic**: Dark mode SaaS glassmorphism with Indigo, Purple, and Teal accents based on `DESIGN.md`.

---

## 💻 Local Development Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Launch Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

### 3. Launch Backend Server (Optional)
```bash
npm run server
```

---

## 📄 License
MIT © InterviewAI Team
