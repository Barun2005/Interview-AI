# 🚀 Interview AI - Smart AI-Powered Technical & HR Interview Platform

[![Build Status](https://img.shields.io/badge/Build-Passing-emerald?style=for-the-badge&logo=vite)](https://github.com/Barun2005/Interview-AI)
[![Stack](https://img.shields.io/badge/Stack-React%20%7C%20Node.js%20%7C%20Express%20%7C%20MongoDB-indigo?style=for-the-badge&logo=react)](https://github.com/Barun2005/Interview-AI)
[![Deployment](https://img.shields.io/badge/Deployment-Render-blue?style=for-the-badge&logo=render)](https://github.com/Barun2005/Interview-AI)
[![License](https://img.shields.io/badge/License-MIT-purple?style=for-the-badge)](LICENSE)

**Interview AI** is a state-of-the-art, full-stack web application designed to help software engineers, developers, and candidates master technical and HR interviews using Artificial Intelligence, voice speech recognition, live coding labs, and ATS resume scoring.

---

## 🌟 Key Features

### 🔐 1. Full Authentication & Email OTP Verification
- **User Registration & Login**: Secure account creation with MongoDB Atlas database persistence.
- **6-Digit Email OTP Verification**: Automated HTML verification codes sent directly to candidate email addresses via **Nodemailer**.
- **Forgot Password Workflow**: Reset password securely using single-use OTP validation.
- **Multi-Role Access**: Role-based routing for Candidate and Platform Admin views.

### 🎙️ 2. Real-Time AI Voice Mock Interview Simulator
- **Voice Speech Synthesis (TTS)**: Realistic AI interviewer audio asking role-specific technical and behavioral questions.
- **Speech-to-Text (STT)**: Live speech recognition using Web Speech API with real-time transcript streaming.
- **Webcam & Eye Contact Diagnostics**: Video preview with posture and eye contact diagnostic feedback.
- **5 Core Tracks**: Technical, HR, Behavioral (STAR method), System Design, and Coding.
- **Smart Follow-ups**: AI adaptively generates contextual follow-up questions based on candidate answers.

### 📊 3. Comprehensive AI Post-Interview Evaluation & PDF Reports
- **Overall Score Gauge (0-100)**: Visual readiness metric.
- **Multi-Dimensional Metrics**: Communication, Technical Depth, Confidence, Grammar, Problem Solving, and Leadership.
- **Strengths & Critical Improvements**: Contextual bullet points highlighting what went well and what to refine.
- **Sample Ideal Answers**: Side-by-side comparison of candidate responses against top-tier model answers.
- **Downloadable Reports**: Printable performance summary cards.

### 💻 4. Interactive Coding Assessment Lab
- **Multi-Language Support**: Write and test code in **Java**, **C++**, **Python**, or **JavaScript**.
- **Automated Test Execution**: Run code against visible and hidden test cases.
- **AI Asymptotic Complexity Analysis**: Instant calculation of Time Complexity $O(N)$ and Space Complexity $O(N)$ with code optimization suggestions.

### 📄 5. ATS Resume Analyzer & Bullet Point Enhancer
- **ATS Compatibility Score**: Automated matching score for top tech firms.
- **Skill Gap Analysis**: Identifies missing technologies (e.g. Docker, AWS, GraphQL, Redis).
- **Bullet Point Enhancer**: Rewrites generic resume bullets into impact-driven STAR metrics.

### 🏢 6. Company Interview Question Library
- Curated question sets for **15+ Top Tech Companies**: Google, Microsoft, Amazon, Meta, Apple, NVIDIA, Adobe, IBM, Deloitte, Accenture, TCS, Infosys, Wipro, Cognizant, and Capgemini.

### 🛡️ 7. Admin Management Portal
- Comprehensive admin panel to manage candidates, inspect platform usage metrics, and audit question banks.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, React Router v6, Vite, Tailwind CSS, Lucide Icons, Recharts, Web Speech API.
- **Backend**: Node.js, Express.js (v5), Cors, Dotenv, Nodemailer.
- **Database**: MongoDB Atlas with Mongoose Schemas (`User`, `Interview`).
- **Deployment**: Render (Web Service + SPA static asset serving).

---

## 📁 Repository Structure

```text
Interview-AI/
├── backend/
│   ├── models/
│   │   ├── Interview.js       # Interview Evaluation Mongoose Schema
│   │   └── User.js            # User Account & OTP Mongoose Schema
│   └── server.js              # Express API Server & Production SPA Static Server
├── src/
│   ├── components/            # Reusable Navbar, Footer, UI components
│   ├── context/               # AuthContext & InterviewContext providers
│   ├── pages/                 # LandingPage, AuthPages, Dashboard, MockInterview, etc.
│   ├── services/              # API Client Service (api.js)
│   └── App.jsx                # Router & Protected Route Navigation
├── .env.example               # Environment Configuration Template
├── package.json               # Dependencies & Build Scripts
├── render.yaml                # Render Blueprint Deployment Configuration
└── vite.config.js             # Vite Bundler Config
```

---

## ⚙️ Environment Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Barun2005/Interview-AI.git
   cd Interview-AI
   ```

2. **Configure Environment Variables**:
   Copy `.env.example` to create a local `.env` file:
   ```bash
   cp .env.example .env
   ```

   Fill in your actual environment parameters in `.env`:
   ```env
   PORT=5000
   VITE_API_BASE_URL=http://localhost:5000/api
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/interview_ai

   # Optional Email SMTP Credentials (for sending real OTPs to email inboxes)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-google-app-password
   FROM_EMAIL="Interview AI" <no-reply@interviewai.com>
   ```

   > [!IMPORTANT]
   > Do **NOT** commit your `.env` file to Git. It is already added to `.gitignore` to keep credentials secure.

---

## 🚀 Running Locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Backend Server
```bash
npm run server
```
*Backend server will start on `http://localhost:5000` and connect to MongoDB.*

### 3. Run Frontend Dev Server
In a separate terminal window:
```bash
npm run dev
```
*Open `http://localhost:3000` in your browser to view the application.*

---

## ☁️ Deployment on Render

This project is pre-configured for one-click deployment on **[Render](https://render.com)** using the included [`render.yaml`](render.yaml) blueprint.

1. Connect your GitHub repository (`Barun2005/Interview-AI`) to **Render**.
2. Select **New Web Service**.
3. Set **Build Command**: `npm install --include=dev && npm run build`
4. Set **Start Command**: `npm start`
5. Add your `MONGODB_URI` environment variable in the Render Dashboard.

---

## 🌐 Main API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Health Check & Database connection status |
| `POST` | `/api/auth/signup` | Candidate registration & OTP generation |
| `POST` | `/api/auth/verify-otp` | Validates 6-digit email OTP code |
| `POST` | `/api/auth/login` | Account login & credential validation |
| `POST` | `/api/auth/forgot-password` | Initiates password reset OTP |
| `POST` | `/api/auth/reset-password` | Resets user password with OTP |
| `POST` | `/api/interviews/evaluate` | Saves AI interview evaluation metrics |
| `GET` | `/api/interviews/history` | Fetches interview history for a user |
| `POST` | `/api/resume/analyze` | Generates ATS resume feedback |

---

## 📄 License

This project is licensed under the **MIT License**.

© 2026 **Interview AI Team** — Built with ❤️ for software engineering candidates.
