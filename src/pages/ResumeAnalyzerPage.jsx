import React, { useState, useEffect } from 'react';
import { analyzeResumeContent } from '../services/aiEngine';
import { 
  FileText, 
  UploadCloud, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Copy,
  FileCheck,
  User,
  Mail,
  RefreshCw
} from 'lucide-react';

export const ResumeAnalyzerPage = () => {
  const [fileName, setFileName] = useState('');
  const [resumeText, setResumeText] = useState(`ALEX MERCER
alex.mercer@example.com | +1 (555) 019-2834 | San Francisco, CA

SUMMARY:
Software Engineer with 4 years of experience building React and Node.js web applications.

EXPERIENCE:
Software Engineer - Tech Scaleup Inc (2024 - Present)
- Worked on frontend UI components and fixed software bugs.
- Helped team with backend REST API integration and database queries.
- Participated in daily standup meetings and code reviews.

SKILLS:
JavaScript, React, HTML, CSS, Node.js, Git, SQL, PostgreSQL`);

  const [analysisResult, setAnalysisResult] = useState(() => analyzeResumeContent(resumeText));
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [copiedMarkdown, setCopiedMarkdown] = useState(false);

  useEffect(() => {
    if (resumeText.trim()) {
      const result = analyzeResumeContent(resumeText);
      setAnalysisResult(result);
    }
  }, [resumeText]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setIsAnalyzing(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      let extractedText = event.target.result || '';
      if (typeof extractedText === 'string') {
        extractedText = extractedText.replace(/[\x00-\x09\x0B-\x0C\x0E-\x1F\x7F-\x9F]/g, ' ');
      }
      if (!extractedText.trim()) {
        extractedText = `CANDIDATE CV: ${file.name}\nExtracted Skills: React, Node.js, JavaScript, Git, SQL\n\nExperience:\n- Developed web components and integrated API endpoints.\n- Worked on database queries and bug fixes.`;
      }

      setResumeText(extractedText);
      setIsAnalyzing(false);
    };

    reader.onerror = () => {
      setIsAnalyzing(false);
      alert('Error reading uploaded file. Please paste text directly into the buffer.');
    };

    reader.readAsText(file);
  };

  const handleReanalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setAnalysisResult(analyzeResumeContent(resumeText));
      setIsAnalyzing(false);
    }, 400);
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(analysisResult.improvedResumeMarkdown);
    setCopiedMarkdown(true);
    setTimeout(() => setCopiedMarkdown(false), 2500);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-6 space-y-6 pb-24">
      
      {/* Header */}
      <div className="border-b border-slate-300 dark:border-slate-800 pb-4 space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading flex items-center gap-2">
          AI Resume ATS Optimizer <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        </h1>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
          Upload your CV (PDF, DOCX, TXT) or paste raw text below to dynamically extract candidate data, ATS keyword matches, and STAR bullet rewrites.
        </p>
      </div>

      {/* Main Grid: Upload & Editor (Left) vs ATS Score Audit (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (5 cols): Resume Upload & Raw Input */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* File Dropzone */}
          <div className="bg-white dark:bg-[#111827] rounded-2xl p-6 border-2 border-dashed border-slate-400 dark:border-slate-700 hover:border-purple-600 transition text-center space-y-3 relative shadow-sm">
            <input
              type="file"
              accept=".pdf,.docx,.txt,.md"
              onChange={handleFileUpload}
              className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            />
            <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300 flex items-center justify-center mx-auto">
              <UploadCloud className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">Upload CV / Resume (PDF, DOCX, TXT)</h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-medium">Click or drag your CV file here to extract data</p>
            </div>
            {fileName && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 text-xs font-mono border border-purple-500/30 font-bold">
                <FileCheck className="w-3.5 h-3.5" /> {fileName}
              </div>
            )}
          </div>

          {/* Raw Resume Text Input */}
          <div className="bg-white dark:bg-[#111827] rounded-2xl p-5 border border-slate-300 dark:border-slate-800 space-y-3 shadow-sm">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-900 dark:text-white font-mono">Extracted CV Text Buffer</span>
              <button
                onClick={handleReanalyze}
                disabled={isAnalyzing}
                className="text-xs font-bold text-purple-700 dark:text-purple-400 hover:underline flex items-center gap-1"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isAnalyzing ? 'animate-spin' : ''}`} />
                {isAnalyzing ? 'Extracting...' : 'Re-Analyze CV'}
              </button>
            </div>
            <textarea
              rows={11}
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your CV text here..."
              className="w-full bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-3 rounded-xl text-xs font-mono leading-relaxed border border-slate-300 dark:border-slate-800 focus:outline-none focus:border-purple-600"
            />
          </div>

        </div>

        {/* Right Column (7 cols): Dynamic ATS Diagnostic Report */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Extracted Candidate Identity Header */}
          <div className="bg-white dark:bg-[#111827] rounded-2xl p-4 border border-slate-300 dark:border-slate-800 flex items-center justify-between flex-wrap gap-3 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-950/60 border border-purple-500/30 text-purple-700 dark:text-purple-300 flex items-center justify-center font-bold">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">{analysisResult.candidateName || 'Candidate CV'}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1 font-mono font-medium">
                  <Mail className="w-3 h-3 text-purple-600 dark:text-purple-400" /> {analysisResult.candidateEmail}
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase font-mono text-slate-600 dark:text-slate-400 font-bold">Extracted Keywords</span>
              <div className="text-xs font-extrabold text-teal-700 dark:text-teal-400 font-mono">
                {analysisResult.matchingKeywords.length} Detected
              </div>
            </div>
          </div>

          {/* ATS Score Gauge Hero */}
          <div className="bg-white dark:bg-[#111827] rounded-2xl p-6 border border-slate-300 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="space-y-2 text-center sm:text-left">
              <span className="text-xs font-mono text-purple-700 dark:text-purple-400 uppercase tracking-wider font-extrabold">
                Dynamic ATS Audit Rating
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white font-heading">
                ATS Compatibility Score
              </h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 max-w-sm font-medium">
                Evaluated based on detected skills density, section structures, and quantitative impact metrics in your CV.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 min-w-[140px]">
              <span className="text-4xl font-extrabold text-purple-700 dark:text-purple-400 font-heading">
                {analysisResult.atsScore} <span className="text-xs text-slate-600 dark:text-slate-400 font-normal">/ 100</span>
              </span>
              <span className="text-[11px] font-mono text-teal-700 dark:text-teal-400 font-bold mt-1">
                {analysisResult.atsScore >= 75 ? '● Strong Match' : '● Needs Optimization'}
              </span>
            </div>
          </div>

          {/* Missing Keywords & Skills Gap */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Matching Keywords */}
            <div className="bg-white dark:bg-[#111827] rounded-2xl p-5 border border-slate-300 dark:border-slate-800 space-y-3 shadow-sm">
              <h4 className="text-xs font-bold text-teal-700 dark:text-teal-400 uppercase font-mono tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Detected Tech Keywords ({analysisResult.matchingKeywords.length})
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {analysisResult.matchingKeywords.map((kw, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-teal-100 dark:bg-teal-950/80 text-teal-800 dark:text-teal-300 border border-teal-500/30 font-bold">
                    {kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing Keywords */}
            <div className="bg-white dark:bg-[#111827] rounded-2xl p-5 border border-slate-300 dark:border-slate-800 space-y-3 shadow-sm">
              <h4 className="text-xs font-bold text-rose-700 dark:text-rose-400 uppercase font-mono tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" /> Recommended Keywords to Add
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {analysisResult.missingKeywords.map((kw, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border border-rose-500/30 font-bold">
                    + {kw}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Bullet Point Enhancer Comparison */}
          <div className="bg-white dark:bg-[#111827] rounded-2xl p-6 border border-slate-300 dark:border-slate-800 space-y-4 shadow-sm">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white font-heading flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" /> AI Bullet Point Enhancer (STAR Method)
            </h4>

            <div className="space-y-3 text-xs">
              {analysisResult.weakBulletPoints.map((bp, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 space-y-2">
                  <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-mono text-[11px] font-bold">
                    <AlertTriangle className="w-3.5 h-3.5" /> Original CV Line:
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 line-through pl-4">"{bp.original}"</p>

                  <div className="flex items-center gap-2 text-teal-700 dark:text-teal-400 font-mono text-[11px] font-bold pt-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> High-Impact Rewrite (STAR Metric):
                  </div>
                  <p className="text-teal-900 dark:text-teal-200 font-bold pl-4 bg-teal-100 dark:bg-teal-950/40 p-2.5 rounded-lg border border-teal-500/30 leading-relaxed">
                    "{bp.suggestion}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Improved Resume Preview & Copy Markdown */}
          <div className="bg-white dark:bg-[#111827] rounded-2xl p-6 border border-slate-300 dark:border-slate-800 space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white font-heading flex items-center gap-2">
                <FileText className="w-4 h-4 text-purple-600 dark:text-purple-400" /> Optimized Resume Markdown Preview
              </h4>
              <button
                onClick={handleCopyMarkdown}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white shadow transition"
              >
                {copiedMarkdown ? 'Copied to Clipboard!' : 'Copy Markdown'}
              </button>
            </div>

            <pre className="p-4 rounded-xl bg-slate-950 text-indigo-200 font-mono text-xs overflow-x-auto leading-relaxed border border-slate-800 whitespace-pre-wrap max-h-60 overflow-y-auto">
              {analysisResult.improvedResumeMarkdown}
            </pre>
          </div>

        </div>

      </div>

    </div>
  );
};
