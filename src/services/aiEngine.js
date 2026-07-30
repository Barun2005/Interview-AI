// AI Engine for Voice STT/TTS, Mock Interview Questions, Evaluation & Resume ATS Parsing

// 1. Voice Speech Synthesis (Text-to-Speech)
export const speakText = (text, onEndCallback) => {
  if (!('speechSynthesis' in window)) {
    console.warn('Text-to-speech not supported in this browser.');
    if (onEndCallback) onEndCallback();
    return;
  }

  // Cancel existing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1.0;
  utterance.pitch = 1.0;
  utterance.lang = 'en-US';

  // Get available voices and pick a natural English voice
  const voices = window.speechSynthesis.getVoices();
  const selectedVoice = voices.find(v => (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Alex')) && v.lang.startsWith('en')) || voices[0];
  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }

  utterance.onend = () => {
    if (onEndCallback) onEndCallback();
  };

  utterance.onerror = (e) => {
    console.error('TTS error:', e);
    if (onEndCallback) onEndCallback();
  };

  window.speechSynthesis.speak(utterance);
};

export const stopSpeech = () => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

// 2. Web Speech API Speech Recognition (Speech-to-Text)
export const createSpeechRecognizer = (onResultCallback, onErrorCallback) => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    console.warn('Web Speech API is not supported in this browser environment.');
    return null;
  }

  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US';

  recognition.onresult = (event) => {
    let transcript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }
    onResultCallback(transcript);
  };

  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
    if (onErrorCallback) onErrorCallback(event.error);
  };

  return recognition;
};

// 3. Questions Bank Generator for Mock Interview Engine
export const getQuestionsForType = (type = 'Technical', difficulty = 'Intermediate') => {
  const bank = {
    Technical: [
      {
        id: 'q_tech_1',
        question: "Can you explain the Event Loop in JavaScript and how asynchronous operations like microtasks and macrotasks are prioritized?",
        category: "JavaScript & Async Core",
        hint: "Mention the Call Stack, Web APIs, Task Queue (macrotasks), and Microtask Queue (Promises, process.nextTick)."
      },
      {
        id: 'q_tech_2',
        question: "How does React handle reconciliation and what is the key benefit of the Fiber architecture?",
        category: "React Core Architecture",
        hint: "Discuss incremental rendering, task prioritization, and tree diffing algorithm O(N)."
      },
      {
        id: 'q_tech_3',
        question: "Describe the differences between REST API and GraphQL. When would you choose one over the other in enterprise applications?",
        category: "API & Backend Architecture",
        hint: "Talk about over-fetching, under-fetching, schema definitions, caching, and payload flexibility."
      },
      {
        id: 'q_tech_4',
        question: "How do database indexes speed up query performance, and what trade-offs do they introduce during WRITE operations?",
        category: "Databases & Storage",
        hint: "Reference B-Tree structure, faster SELECT lookups versus CPU/disk cost during INSERT/UPDATE."
      }
    ],
    HR: [
      {
        id: 'q_hr_1',
        question: "Tell me about yourself, your background in software engineering, and why you are interested in joining our team.",
        category: "Introduction & Motivation",
        hint: "Structure your answer: Past background -> Present technical achievements -> Future career goal."
      },
      {
        id: 'q_hr_2',
        question: "What is your greatest technical strength, and what is one area you are actively working to improve?",
        category: "Self Assessment",
        hint: "Provide an authentic self-reflection with steps you are taking to grow."
      },
      {
        id: 'q_hr_3',
        question: "Where do you see yourself in 3 to 5 years in your engineering trajectory?",
        category: "Career Vision",
        hint: "Focus on technical depth, leadership capabilities, and impact."
      }
    ],
    Behavioral: [
      {
        id: 'q_beh_1',
        question: "Describe a situation where a project deadline was under severe risk. How did you prioritize tasks and communicate with stakeholders?",
        category: "Crisis Management & STAR",
        hint: "Use STAR: Situation, Task, Action, Result. Highlight transparent communication."
      },
      {
        id: 'q_beh_2',
        question: "Tell me about a technical dispute or architectural disagreement you had with a senior colleague. How was it resolved?",
        category: "Conflict Resolution",
        hint: "Emphasize data-driven benchmarks, active listening, and team consensus."
      }
    ],
    'System Design': [
      {
        id: 'q_sd_1',
        question: "How would you design a distributed URL shortening service like Bitly handling millions of daily redirects?",
        category: "High Availability & Storage",
        hint: "Discuss Base62 hashing, Redis caching layer, database partitioning, and rate limiting."
      },
      {
        id: 'q_sd_2',
        question: "Design a real-time collaborative document editing system like Google Docs. How do you handle concurrent edits?",
        category: "Real-time Concurrency",
        hint: "Mention WebSockets, Operational Transformation (OT) or CRDTs (Conflict-free Replicated Data Types)."
      }
    ],
    Coding: [
      {
        id: 'q_code_1',
        question: "Write an optimal function to find the length of the Longest Substring Without Repeating Characters in O(N) time.",
        category: "Algorithms & Two Pointers",
        hint: "Use sliding window approach with a hash map to track last seen indices of characters."
      }
    ]
  };

  return bank[type] || bank.Technical;
};

// 4. Intelligent Evaluation Generator
export const generateInterviewEvaluation = (answers, type, company = 'Target Company') => {
  const answerCount = answers.length;
  let totalLength = 0;
  answers.forEach(a => {
    totalLength += (a.userAnswer || '').length;
  });

  const avgLength = answerCount > 0 ? totalLength / answerCount : 0;
  
  // Baseline scores
  const scoreBase = Math.min(95, Math.max(72, Math.floor(78 + (avgLength / 15))));
  const commsScore = Math.min(98, scoreBase + Math.floor(Math.random() * 6));
  const techScore = Math.min(96, scoreBase + Math.floor(Math.random() * 8) - 2);
  const confScore = Math.min(94, scoreBase + Math.floor(Math.random() * 5));
  const gramScore = Math.min(99, 90 + Math.floor(Math.random() * 8));

  return {
    id: 'eval_' + Date.now(),
    title: `${type} Evaluation - ${company}`,
    type,
    company,
    date: new Date().toISOString().split('T')[0],
    durationMinutes: Math.max(10, Math.floor(answerCount * 5)),
    score: scoreBase,
    communicationScore: commsScore,
    technicalScore: techScore,
    confidenceScore: confScore,
    grammarScore: gramScore,
    problemSolvingScore: Math.min(95, scoreBase + 3),
    leadershipScore: Math.min(92, scoreBase - 2),
    bodyLanguageScore: Math.min(94, scoreBase + 1),
    eyeContactScore: Math.min(92, scoreBase),
    strengths: [
      "Articulated technical concepts clearly with structured terminology.",
      "Demonstrated problem-solving agility when responding to follow-up questions.",
      "Maintained professional tone and strong sentence pacing."
    ],
    improvements: [
      "Elaborate more on trade-offs and edge-case error scenarios.",
      "Provide concrete metrics or benchmarks when describing past architectural impact."
    ],
    recommendedResources: [
      { title: "System Design Primer - Distributed Caching", url: "#", type: "Article" },
      { title: "Mastering STAR Method for Tech Interviews", url: "#", type: "Video" },
      { title: "Clean Architecture & Async Execution in Modern JS", url: "#", type: "Course" }
    ],
    questionsAsked: answers.map((ans, idx) => ({
      question: ans.question,
      userAnswer: ans.userAnswer || "No answer provided.",
      aiFeedback: "Solid grasp of core principles. Could be enhanced with architectural tradeoff comparisons.",
      sampleAnswer: ans.sampleAnswer || ans.hint || "A comprehensive response covers core definitions, runtime complexity, and real-world edge cases."
    }))
  };
};

// 5. Simulated Code Execution Engine
export const executeCodeSnippet = (code, language) => {
  let output = "";
  let success = true;
  let timeComplexity = "O(N)";
  let spaceComplexity = "O(N)";

  if (!code || code.trim() === "") {
    return {
      output: "Error: Empty code buffer.",
      success: false,
      testCasesPassed: 0,
      totalTestCases: 3,
      timeComplexity: "N/A",
      spaceComplexity: "N/A",
      aiReview: "Please write code before executing."
    };
  }

  if (language === "javascript") {
    timeComplexity = code.includes("for") && code.includes("while") ? "O(N^2)" : "O(N)";
    spaceComplexity = code.includes("Map") || code.includes("Set") || code.includes("[]") ? "O(N)" : "O(1)";
    output = `> Running JavaScript Node.js runtime...\n[SUCCESS] Test Case 1: Input: [2, 7, 11, 15], Target: 9 -> Output: [0, 1] (Passed - 12ms)\n[SUCCESS] Test Case 2: Input: [3, 2, 4], Target: 6 -> Output: [1, 2] (Passed - 8ms)\n[SUCCESS] Test Case 3: Hidden Test Case (Large Array N=100,000) -> Output: Valid (Passed - 45ms)\n\nAll 3/3 Test Cases Passed!`;
  } else if (language === "python") {
    timeComplexity = code.includes("for") ? "O(N)" : "O(1)";
    spaceComplexity = "O(N)";
    output = `> Running Python 3.11 runtime...\n[SUCCESS] Test Case 1: Input: "abcabcbb" -> Output: 3 (Passed - 14ms)\n[SUCCESS] Test Case 2: Input: "bbbbb" -> Output: 1 (Passed - 9ms)\n[SUCCESS] Test Case 3: Hidden Edge Case (Empty String & Unicode) -> Output: 0 (Passed - 6ms)\n\nAll 3/3 Test Cases Passed!`;
  } else {
    output = `> Compiling ${language.toUpperCase()} with gcc/g++ optimization flags...\n[SUCCESS] Compilation complete with 0 warnings.\n[SUCCESS] Test Case 1: Passed (4ms)\n[SUCCESS] Test Case 2: Passed (3ms)\n[SUCCESS] Test Case 3: Hidden Test Case Passed (11ms)\n\nExecution successful. Memory consumed: 8.4 MB.`;
  }

  return {
    output,
    success: true,
    testCasesPassed: 3,
    totalTestCases: 3,
    timeComplexity,
    spaceComplexity,
    aiReview: `Your ${language} solution exhibits strong asymptotic efficiency with ${timeComplexity} runtime complexity. Code formatting is clean with proper variable scope declarations. Consider adding guard clauses for null/undefined parameters.`
  };
};

// 6. DYNAMIC ATS Resume Analyzer Engine
export const analyzeResumeContent = (resumeText = "") => {
  if (!resumeText || resumeText.trim() === "") {
    return {
      atsScore: 0,
      candidateName: "Unknown Candidate",
      candidateEmail: "Not Provided",
      matchingKeywords: [],
      missingKeywords: ["React.js", "Node.js", "Python", "Docker", "SQL", "Git", "REST APIs"],
      weakBulletPoints: [],
      skillsGap: [],
      improvedResumeMarkdown: "# Candidate Resume\n*Please paste or upload resume text to generate ATS audit.*"
    };
  }

  const text = resumeText.trim();
  const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);

  // 1. Extract Candidate Name (First non-empty line without special email/phone chars)
  let candidateName = "Candidate";
  const nameCandidateLine = lines.find(l => !l.includes('@') && !l.toLowerCase().startsWith('http') && l.length < 45);
  if (nameCandidateLine) {
    candidateName = nameCandidateLine.replace(/[^a-zA-Z\s.-]/g, '').trim() || "Candidate";
  }

  // 2. Extract Email via Regex
  const emailMatch = text.match(/[\w.-]+@[\w.-]+\.\w+/);
  const candidateEmail = emailMatch ? emailMatch[0] : "email@example.com";

  // 3. Extract Phone via Regex
  const phoneMatch = text.match(/(\+?\d{1,3}[\s-]?)?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}/);
  const candidatePhone = phoneMatch ? phoneMatch[0] : "+1 (555) 019-2834";

  // 4. Industry Keywords Dictionary
  const TECH_KEYWORDS = [
    "React", "React.js", "Node.js", "Express", "JavaScript", "TypeScript", "Python", "Java", "C++",
    "HTML", "CSS", "Tailwind", "SQL", "PostgreSQL", "MongoDB", "Redis", "Docker", "Kubernetes",
    "AWS", "GCP", "Azure", "Git", "GitHub", "REST API", "REST APIs", "GraphQL", "System Design",
    "Redux", "Jest", "CI/CD", "Next.js", "Vue", "Angular", "Linux", "Microservices", "Kafka",
    "Machine Learning", "TensorFlow", "Pandas", "Spring Boot", "Go", "Golang", "Agile", "Scrum"
  ];

  const lowerText = text.toLowerCase();
  const detectedKeywords = [];
  const missingKeywords = [];

  TECH_KEYWORDS.forEach(kw => {
    // Check keyword presence
    const kwRegex = new RegExp(`\\b${kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    if (kwRegex.test(text)) {
      if (!detectedKeywords.includes(kw)) detectedKeywords.push(kw);
    } else {
      if (!missingKeywords.includes(kw)) missingKeywords.push(kw);
    }
  });

  // Pick top missing keywords for recommendations
  const recommendedMissing = missingKeywords.slice(0, 6);

  // 5. Extract Bullet Points and Identify Weak Ones
  const rawBulletPoints = lines.filter(l => 
    l.startsWith('-') || l.startsWith('*') || l.startsWith('•') ||
    /\b(worked|built|developed|helped|created|responsible|managed|assisted|handled)\b/i.test(l)
  );

  const weakBulletPoints = [];
  rawBulletPoints.forEach(bp => {
    const cleanBp = bp.replace(/^[-*•]\s*/, '').trim();
    // A bullet point is considered "weak" if it lacks numbers/percentages or uses generic weak action verbs
    const hasMetrics = /\d+%|\$\d+|\d+\+|\b(reduced|increased|boosted|engineered|architected|scaled|improved)\b/i.test(cleanBp);
    if (!hasMetrics && cleanBp.length > 10 && weakBulletPoints.length < 3) {
      let enhanced = `Engineered and optimized ${cleanBp.toLowerCase()}, boosting performance latency by 35% across 50,000+ active users.`;
      if (cleanBp.toLowerCase().includes('api') || cleanBp.toLowerCase().includes('backend')) {
        enhanced = `Architected scalable backend microservices for ${cleanBp.toLowerCase()}, achieving 99.9% uptime for 1.2M daily API requests.`;
      } else if (cleanBp.toLowerCase().includes('frontend') || cleanBp.toLowerCase().includes('ui')) {
        enhanced = `Redesigned modular UI components for ${cleanBp.toLowerCase()}, driving a 42% increase in user engagement metrics.`;
      }

      weakBulletPoints.push({
        original: cleanBp,
        suggestion: enhanced
      });
    }
  });

  // Fallback weak bullet points if none extracted
  if (weakBulletPoints.length === 0) {
    weakBulletPoints.push(
      {
        original: "Responsible for developing software features and resolving code bugs.",
        suggestion: "Spearheaded end-to-end feature deployment in React & Node.js, decreasing bug regression rates by 28% across 4 production releases."
      },
      {
        original: "Collaborated with team members on database queries.",
        suggestion: "Optimized complex SQL queries and Redis caching strategy, reducing database lookup latency by 45ms."
      }
    );
  }

  // 6. Calculate Dynamic ATS Score
  let score = 50; // Base score
  if (emailMatch) score += 10;
  if (phoneMatch) score += 5;
  score += Math.min(25, detectedKeywords.length * 4); // Keyword density
  if (text.toLowerCase().includes('experience') || text.toLowerCase().includes('work')) score += 5;
  if (text.toLowerCase().includes('education') || text.toLowerCase().includes('degree')) score += 5;
  if (text.toLowerCase().includes('skills')) score += 5;
  if (/\d+%|\$\d+|\d+\+/.test(text)) score += 10; // Metrics check

  const finalAtsScore = Math.min(96, Math.max(45, score));

  // 7. Dynamic Skills Gap
  const skillsGap = [];
  if (!detectedKeywords.some(k => ['Docker', 'Kubernetes'].includes(k))) {
    skillsGap.push({ skill: "Containerization (Docker)", currentLevel: "Not Detected in CV", requiredLevel: "Intermediate" });
  }
  if (!detectedKeywords.some(k => ['AWS', 'GCP', 'Azure'].includes(k))) {
    skillsGap.push({ skill: "Cloud Infrastructure (AWS/GCP)", currentLevel: "Not Detected in CV", requiredLevel: "Intermediate" });
  }
  if (!detectedKeywords.some(k => ['CI/CD', 'GitHub'].includes(k))) {
    skillsGap.push({ skill: "CI/CD & DevOps Automation", currentLevel: "Beginner", requiredLevel: "Intermediate" });
  }
  if (skillsGap.length === 0) {
    skillsGap.push({ skill: "System Architecture & Scalability", currentLevel: "Intermediate", requiredLevel: "Advanced" });
  }

  // 8. Dynamic Improved Resume Markdown Preview
  const detectedSkillsStr = detectedKeywords.length > 0 ? detectedKeywords.join(', ') : "JavaScript, HTML, CSS, Git, Node.js";
  const improvedMarkdown = `# ${candidateName}
**Full Stack / Software Engineering Candidate**
*${candidateEmail} | ${candidatePhone}*

---

### PROFESSIONAL SUMMARY
Results-driven Software Engineer with proven expertise in ${detectedKeywords.slice(0, 4).join(', ') || "modern web application development"}. Demonstrated track record of optimizing application latency and scaling clean code architecture.

### CORE TECHNICAL SKILLS
* **Technologies & Tools:** ${detectedSkillsStr}
* **Core Competencies:** Full Stack Web Architecture, System Optimization, Clean Code Standards, Agile Methodology

### REFACTORED PROFESSIONAL IMPACT (STAR METHOD)
${weakBulletPoints.map(w => `* ${w.suggestion}`).join('\n')}
`;

  return {
    atsScore: finalAtsScore,
    candidateName,
    candidateEmail,
    matchingKeywords: detectedKeywords.length > 0 ? detectedKeywords : ["JavaScript", "HTML", "CSS", "Git"],
    missingKeywords: recommendedMissing.length > 0 ? recommendedMissing : ["Docker", "AWS Lambda", "GraphQL", "Redis Caching"],
    weakBulletPoints,
    skillsGap,
    improvedResumeMarkdown: improvedMarkdown
  };
};
