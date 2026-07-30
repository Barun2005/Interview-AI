import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInterview } from '../context/InterviewContext';
import { 
  speakText, 
  stopSpeech, 
  createSpeechRecognizer, 
  getQuestionsForType, 
  generateInterviewEvaluation,
  executeCodeSnippet
} from '../services/aiEngine';

export const MockInterviewPage = () => {
  const navigate = useNavigate();
  const { saveCompletedInterview } = useInterview();

  // Setup state vs Room state
  const [setupStep, setSetupStep] = useState(true);
  const [type, setType] = useState('Technical');
  const [difficulty, setDifficulty] = useState('Intermediate');
  const [duration, setDuration] = useState('30');
  const [company, setCompany] = useState('Google');
  const [webcamEnabled, setWebcamEnabled] = useState(true);
  const [micEnabled, setMicEnabled] = useState(true);

  // Active Room state
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [userTextInput, setUserTextInput] = useState('');
  const [liveTranscript, setLiveTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);

  // Code Editor Panel toggle (Stitch interview_room feature)
  const [editorPanelOpen, setEditorPanelOpen] = useState(true);
  const [code, setCode] = useState(`/**
 * Problem: Write a function to check for valid anagram strings.
 */
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    let count = {};
    for (let char of s) {
        count[char] = (count[char] || 0) + 1;
    }
    for (let char of t) {
        if (!count[char]) return false;
        count[char]--;
    }
    return true;
}

console.log(isAnagram("anagram", "nagaram")); // true`);

  const [terminalOutput, setTerminalOutput] = useState('> Output: true (Execution: 8ms)');

  // Timer state
  const [secondsRemaining, setSecondsRemaining] = useState(1800);
  const timerRef = useRef(null);
  const recognitionRef = useRef(null);
  const videoRef = useRef(null);

  // Start interview initialization
  const handleStartSession = () => {
    const fetchedQuestions = getQuestionsForType(type, difficulty);
    setQuestions(fetchedQuestions);
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setSecondsRemaining(parseInt(duration) * 60);
    setSetupStep(false);

    setTimeout(() => {
      speakQuestion(fetchedQuestions[0]?.question);
    }, 600);
  };

  // Webcam stream initialization
  useEffect(() => {
    if (!setupStep && webcamEnabled && videoRef.current) {
      navigator.mediaDevices?.getUserMedia({ video: true, audio: false })
        .then(stream => {
          if (videoRef.current) videoRef.current.srcObject = stream;
        })
        .catch(err => console.warn('Webcam stream unavailable:', err));
    }
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, [setupStep, webcamEnabled]);

  // Speech Recognition Setup
  useEffect(() => {
    if (!setupStep && micEnabled) {
      const recognizer = createSpeechRecognizer(
        (transcript) => {
          setLiveTranscript(transcript);
          setUserTextInput(transcript);
        },
        (err) => console.warn('Speech recognition status:', err)
      );

      if (recognizer) {
        recognitionRef.current = recognizer;
      }
    }
    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch(e) {}
      }
    };
  }, [setupStep, micEnabled]);

  // Timer countdown loop
  useEffect(() => {
    if (!setupStep) {
      timerRef.current = setInterval(() => {
        setSecondsRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            finishInterview();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [setupStep]);

  // Speak AI question
  const speakQuestion = (text) => {
    if (!text) return;
    setIsAiSpeaking(true);
    speakText(text, () => {
      setIsAiSpeaking(false);
      if (micEnabled && recognitionRef.current) {
        try {
          recognitionRef.current.start();
          setIsListening(true);
        } catch(e) {}
      }
    });
  };

  const handleRunCode = () => {
    const res = executeCodeSnippet(code, 'javascript');
    setTerminalOutput(res.output);
  };

  const handleAnswerSubmit = () => {
    const currentQ = questions[currentQuestionIndex];
    const finalAnswer = userTextInput.trim() || liveTranscript.trim() || "Candidate gave a brief spoken response.";
    
    stopSpeech();
    if (recognitionRef.current && isListening) {
      try { recognitionRef.current.stop(); } catch(e) {}
      setIsListening(false);
    }

    const newAnswers = [
      ...answers,
      {
        question: currentQ.question,
        userAnswer: finalAnswer,
        category: currentQ.category,
        sampleAnswer: currentQ.hint
      }
    ];

    setAnswers(newAnswers);
    setUserTextInput('');
    setLiveTranscript('');

    if (currentQuestionIndex + 1 < questions.length) {
      const nextIdx = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIdx);
      setTimeout(() => {
        speakQuestion(questions[nextIdx]?.question);
      }, 500);
    } else {
      finishInterview(newAnswers);
    }
  };

  const finishInterview = (finalAnswers = answers) => {
    stopSpeech();
    const evaluationReport = generateInterviewEvaluation(finalAnswers, type, company);
    saveCompletedInterview(evaluationReport);
    navigate(`/summary/${evaluationReport.id}`);
  };

  const formatTimer = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // 1. SETUP MODAL
  if (setupStep) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">
        <div className="text-center space-y-2">
          <span className="px-3 py-1 rounded-full bg-[#86f2e4] text-[#006f66] font-mono text-xs font-bold uppercase">
            InterviewPro Room Configurator
          </span>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-[#0b1c30]">
            Configure Your Live AI Interview
          </h1>
          <p className="font-sans text-sm text-[#45464d] max-w-lg mx-auto">
            Choose your target company template, session length, and track. Sophia (AI Lead Architect) will conduct the session.
          </p>
        </div>

        <div className="bento-cell bg-white border border-[#e2e8f0] rounded-2xl p-8 space-y-6 shadow-sm">
          
          <div className="space-y-2">
            <label className="font-mono text-xs font-bold text-[#0b1c30] uppercase">1. Select Track</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {['Technical', 'HR', 'Behavioral', 'System Design', 'Coding'].map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setType(item)}
                  className={`p-3 rounded-xl border text-xs font-mono font-bold transition ${
                    type === item
                      ? 'bg-[#006a61] text-white border-[#006a61] shadow'
                      : 'bg-[#eff4ff] border-[#c6c6cd] text-[#45464d] hover:bg-[#dce9ff]'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="font-mono text-xs font-bold text-[#0b1c30] uppercase">2. Difficulty</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full bg-[#eff4ff] border border-[#c6c6cd] px-3 py-2.5 rounded-xl text-xs font-mono text-[#0b1c30]"
              >
                <option value="Beginner">Beginner (Entry-Level)</option>
                <option value="Intermediate">Intermediate (Mid-Level)</option>
                <option value="Advanced">Advanced (Senior / Lead)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="font-mono text-xs font-bold text-[#0b1c30] uppercase">3. Target Company Template</label>
              <select
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full bg-[#eff4ff] border border-[#c6c6cd] px-3 py-2.5 rounded-xl text-xs font-mono text-[#0b1c30]"
              >
                {['Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'NVIDIA', 'Adobe', 'Deloitte', 'TCS'].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="font-mono text-xs font-bold text-[#0b1c30] uppercase">4. Duration</label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full bg-[#eff4ff] border border-[#c6c6cd] px-3 py-2.5 rounded-xl text-xs font-mono text-[#0b1c30]"
              >
                <option value="15">15 Minutes (Express)</option>
                <option value="30">30 Minutes (Standard)</option>
                <option value="45">45 Minutes (Full Bar Raiser)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="font-mono text-xs font-bold text-[#0b1c30] uppercase">5. Controls</label>
              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 text-xs font-mono text-[#45464d] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={webcamEnabled}
                    onChange={(e) => setWebcamEnabled(e.target.checked)}
                    className="rounded text-[#006a61]"
                  />
                  <span>Webcam Feed</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-mono text-[#45464d] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={micEnabled}
                    onChange={(e) => setMicEnabled(e.target.checked)}
                    className="rounded text-[#006a61]"
                  />
                  <span>Voice STT & TTS</span>
                </label>
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={handleStartSession}
              className="bg-[#006a61] text-white px-8 py-3.5 rounded-xl font-heading text-sm font-bold hover:bg-[#005049] shadow-lg transition flex items-center gap-2"
            >
              <span className="material-symbols-outlined">video_chat</span>
              Enter Stitch Interview Room
            </button>
          </div>

        </div>
      </div>
    );
  }

  // 2. LIVE STITCH INTERVIEW ROOM CANVAS
  const currentQ = questions[currentQuestionIndex] || {};

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-[#0b1c30]">
      
      {/* Room Header Strip */}
      <div className="bg-[#131b2e] border-b border-[#3f465c] px-6 py-2 flex items-center justify-between text-white text-xs font-mono">
        <div className="flex items-center gap-3">
          <span className="flex h-2.5 w-2.5 rounded-full bg-[#86f2e4] animate-ping"></span>
          <span className="font-bold text-sm text-[#89f5e7]">{type} Session // {company}</span>
          <span className="text-[#bec6e0]">Question {currentQuestionIndex + 1} of {questions.length}</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="bg-[#0b1c30] px-3 py-1 rounded-md text-[#86f2e4] font-bold border border-[#3f465c]">
            {formatTimer(secondsRemaining)} REMAINING
          </span>
          <button
            onClick={() => finishInterview()}
            className="bg-[#ba1a1a] text-white px-3 py-1 rounded-md font-bold hover:bg-red-700 transition"
          >
            End Interview
          </button>
        </div>
      </div>

      {/* Main Canvas Split: Left Primary Video Area + Right Collapsible Code Panel */}
      <div className="flex-grow flex flex-col md:flex-row overflow-hidden relative">
        
        {/* Left: Interlocutor AI Video Feed */}
        <section className="relative flex-grow bg-[#0b1c30] flex flex-col justify-between p-4 overflow-hidden">
          
          {/* Main AI Avatar & Video Visualizer */}
          <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#131b2e] flex flex-col items-center justify-center p-6 border border-[#3f465c]">
            
            {/* Overlay Name Tag */}
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg text-white border border-white/10 text-xs font-mono">
              <span className="material-symbols-outlined text-sm text-[#86f2e4]" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
              <span className="font-semibold">David Chen (Senior Lead Architect - AI)</span>
            </div>

            {/* Floating Self View Camera Feed */}
            <div className="absolute top-4 right-4 w-32 h-44 md:w-44 md:h-56 rounded-xl border-2 border-white/20 shadow-2xl overflow-hidden bg-black">
              {webcamEnabled ? (
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover transform -scale-x-100"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 text-xs font-mono">
                  <span className="material-symbols-outlined text-2xl">videocam_off</span>
                  <span>Cam Off</span>
                </div>
              )}
              <div className="absolute bottom-1 left-1 bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded text-[10px] text-white font-mono">You</div>
            </div>

            {/* Center AI Speaking Circle */}
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <div className={`w-28 h-28 rounded-full bg-gradient-to-tr from-[#006a61] to-[#86f2e4] flex items-center justify-center shadow-2xl transition duration-500 ${isAiSpeaking ? 'scale-110 ring-4 ring-[#86f2e4]' : ''}`}>
                <span className="material-symbols-outlined text-5xl text-white">smart_toy</span>
              </div>

              <div className="space-y-1">
                <span className={`inline-block px-3 py-0.5 rounded-full text-[10px] font-mono ${isAiSpeaking ? 'bg-[#86f2e4] text-[#006f66] font-bold animate-pulse' : 'bg-[#3f465c] text-slate-300'}`}>
                  {isAiSpeaking ? '● AI SPEAKING QUESTION' : 'LISTENING / IDLE'}
                </span>
              </div>

              {/* Sound wave bars */}
              {isAiSpeaking && (
                <div className="flex items-center gap-1.5 h-8">
                  {[12, 26, 18, 32, 22, 28, 14, 24].map((h, i) => (
                    <span
                      key={i}
                      className="w-1.5 bg-[#86f2e4] rounded-full sound-wave-bar"
                      style={{ height: `${h}px`, animationDelay: `${i * 0.1}s` }}
                    ></span>
                  ))}
                </div>
              )}
            </div>

            {/* Current Question Box Overlay */}
            <div className="w-full max-w-2xl mt-6 bg-[#0b1c30]/90 backdrop-blur-md p-4 rounded-xl border border-[#3f465c] text-white space-y-2">
              <div className="flex justify-between items-center text-xs font-mono text-[#86f2e4]">
                <span>Question Prompt:</span>
                <button onClick={() => speakQuestion(currentQ.question)} className="flex items-center gap-1 hover:underline">
                  <span className="material-symbols-outlined text-sm">volume_up</span> Replay Voice
                </button>
              </div>
              <p className="text-sm font-sans leading-relaxed text-slate-100 font-medium">
                "{currentQ.question}"
              </p>
            </div>

          </div>

          {/* Call Controls Floating Bar (Stitch interview_room Control Bar) */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/60 backdrop-blur-xl px-6 py-3 rounded-full border border-white/20 shadow-2xl z-30">
            <button
              onClick={() => setMicEnabled(!micEnabled)}
              className={`w-12 h-12 flex items-center justify-center rounded-full transition active:scale-95 ${micEnabled ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-red-500 text-white'}`}
              title="Mute Microphone"
            >
              <span className="material-symbols-outlined">{micEnabled ? 'mic' : 'mic_off'}</span>
            </button>

            <button
              onClick={() => setWebcamEnabled(!webcamEnabled)}
              className={`w-12 h-12 flex items-center justify-center rounded-full transition active:scale-95 ${webcamEnabled ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-red-500 text-white'}`}
              title="Stop Video"
            >
              <span className="material-symbols-outlined">{webcamEnabled ? 'videocam' : 'videocam_off'}</span>
            </button>

            <button
              onClick={() => setEditorPanelOpen(!editorPanelOpen)}
              className={`w-12 h-12 flex items-center justify-center rounded-full transition active:scale-95 ${editorPanelOpen ? 'bg-[#86f2e4] text-[#006f66]' : 'bg-white/10 text-white'}`}
              title="Toggle Code Editor Panel"
            >
              <span className="material-symbols-outlined">code</span>
            </button>

            <button
              onClick={handleAnswerSubmit}
              className="px-6 py-3 rounded-full bg-[#006a61] hover:bg-[#005049] text-white text-xs font-mono font-bold shadow-lg flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">send</span>
              Submit Answer
            </button>
          </div>

        </section>

        {/* Right Collapsible Panel: Code Editor & Notes (Stitch interview_room) */}
        {editorPanelOpen && (
          <aside className="w-full md:w-[580px] bg-white border-l border-[#c6c6cd] flex flex-col transition-all duration-300">
            
            {/* Panel Header */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-[#e2e8f0] h-12 bg-[#f8f9ff]">
              <div className="flex items-center gap-4">
                <span className="text-[#006a61] font-bold font-mono text-xs border-b-2 border-[#006a61] py-2">Code Editor</span>
                <span className="text-[#45464d] font-mono text-xs py-2">Voice Transcript</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#e5eeff] text-[#0b1c30]">JavaScript</span>
            </div>

            {/* Code Workspace */}
            <div className="flex-grow bg-[#131b2e] flex flex-col justify-between p-4 relative">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-mono text-[#7c839b]">solution.js</span>
                <button
                  onClick={handleRunCode}
                  className="flex items-center gap-1 bg-[#86f2e4] hover:bg-[#6bd8cb] text-[#006f66] px-3 py-1 rounded-lg font-mono text-xs font-bold transition shadow-sm"
                >
                  <span className="material-symbols-outlined text-sm">play_arrow</span> Run Code
                </button>
              </div>

              {/* Code Textarea */}
              <textarea
                rows={12}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full bg-[#131b2e] text-[#bec6e0] font-mono text-xs p-2 focus:outline-none resize-none leading-relaxed border border-[#3f465c] rounded-lg"
              />

              {/* Candidate Spoken Text Buffer */}
              <div className="mt-2 space-y-1">
                <label className="text-[10px] font-mono text-[#7c839b] uppercase">Live Spoken / Typed Response:</label>
                <textarea
                  rows={3}
                  value={userTextInput}
                  onChange={(e) => setUserTextInput(e.target.value)}
                  placeholder="Speak into microphone or type response..."
                  className="w-full bg-[#0b1c30] text-white font-mono text-xs p-2.5 rounded-lg border border-[#3f465c] focus:outline-none"
                />
              </div>

              {/* Terminal Output */}
              <div className="mt-3 bg-[#0b1c30] border-t border-[#3f465c] p-3 rounded-lg font-mono text-xs space-y-1">
                <div className="flex items-center justify-between text-[#7c839b] text-[10px]">
                  <span>Terminal Output</span>
                  <span className="text-[#86f2e4]">Status: Ready</span>
                </div>
                <pre className="text-[#6bd8cb] whitespace-pre-wrap">{terminalOutput}</pre>
              </div>

            </div>

          </aside>
        )}

      </div>

    </div>
  );
};
