import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  User, 
  Mail, 
  Briefcase, 
  Award, 
  Save, 
  CheckCircle2, 
  Sparkles,
  Download,
  Edit3,
  Camera,
  Layers,
  FileText,
  Upload,
  X
} from 'lucide-react';

export const ProfilePage = () => {
  const { currentUser, updateProfile } = useAuth();
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const mediaStreamRef = useRef(null);

  const [isEditing, setIsEditing] = useState(true);
  const [name, setName] = useState(currentUser?.name || 'Alex Mercer');
  const [email, setEmail] = useState(currentUser?.email || 'alex.mercer@example.com');
  const [targetRole, setTargetRole] = useState(currentUser?.targetRole || 'Senior Full Stack Developer');
  const [title, setTitle] = useState(currentUser?.title || 'Full Stack Engineer Candidate');
  const [experienceLevel, setExperienceLevel] = useState(currentUser?.experienceLevel || 'Intermediate');
  const [avatar, setAvatar] = useState(currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80');
  const [bio, setBio] = useState(currentUser?.bio || 'Passionate software engineer preparing for senior tech lead roles at Google, Meta, and top startups.');
  const [skillsStr, setSkillsStr] = useState(currentUser?.skills ? currentUser.skills.join(', ') : 'React, Node.js, System Design, TypeScript, Python');
  
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraError, setCameraError] = useState('');

  const presetAvatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
  ];

  // Cleanup camera stream on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    setIsCameraOpen(true);
    setCameraError('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' } 
      });
      mediaStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Camera error:', err);
      setCameraError('Unable to access camera. Please allow camera permissions in your browser.');
    }
  };

  const stopCamera = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    setIsCameraOpen(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 400;
      canvas.height = video.videoHeight || 400;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/png');
      setAvatar(dataUrl);
      stopCamera();
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const skills = skillsStr.split(',').map(s => s.trim()).filter(Boolean);
    updateProfile({
      name,
      email,
      targetRole,
      title,
      experienceLevel,
      avatar,
      bio,
      skills
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* WEBCAM PHOTO CAPTURE MODAL OVERLAY */}
      {isCameraOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white font-heading flex items-center gap-2">
                <Camera className="w-5 h-5 text-teal-400" /> Take Live Profile Photo
              </h3>
              <button
                type="button"
                onClick={stopCamera}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {cameraError ? (
              <div className="p-4 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold">
                {cameraError}
              </div>
            ) : (
              <div className="relative rounded-2xl overflow-hidden bg-black aspect-square flex items-center justify-center border border-slate-800 shadow-inner">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover transform -scale-x-100"
                ></video>
                <canvas ref={canvasRef} className="hidden"></canvas>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={stopCamera}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 transition"
              >
                Cancel
              </button>
              {!cameraError && (
                <button
                  type="button"
                  onClick={capturePhoto}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white gradient-button flex items-center gap-2 shadow-lg shadow-teal-600/40 hover:scale-105 transition"
                >
                  <Camera className="w-4 h-4" /> Capture Photo
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="border-b border-slate-300 dark:border-slate-800 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading flex items-center gap-2">
            Edit Candidate Profile <Edit3 className="w-6 h-6 text-teal-600 dark:text-teal-400" />
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
            Update your personal details, target roles, technical skills, and candidate bio.
          </p>
        </div>

        {/* View vs Edit Mode Selector */}
        <div className="flex items-center gap-2 bg-slate-200 dark:bg-slate-800 p-1 rounded-xl font-mono text-xs">
          <button
            onClick={() => setIsEditing(false)}
            className={`px-3 py-1.5 rounded-lg font-bold transition ${
              !isEditing 
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow' 
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setIsEditing(true)}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 transition ${
              isEditing 
                ? 'bg-teal-600 text-white shadow' 
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" /> Edit Profile
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-2 shadow-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" /> Your profile has been updated and saved successfully!
        </div>
      )}

      {/* EDIT PROFILE FORM */}
      {isEditing ? (
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-300 dark:border-slate-800 space-y-6 shadow-sm">
          
          <form onSubmit={handleSave} className="space-y-6 text-xs">
            
            {/* Avatar Selection Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 border-b border-slate-200 dark:border-slate-800 pb-6">
              <div 
                className="relative group cursor-pointer" 
                onClick={() => fileInputRef.current?.click()}
                title="Click to upload profile photo"
              >
                <img
                  src={avatar}
                  alt="Candidate Avatar"
                  className="w-20 h-20 rounded-full object-cover ring-4 ring-teal-500/40 shadow-md group-hover:opacity-85 transition"
                />
                <span className="absolute bottom-0 right-0 bg-teal-600 text-white p-1.5 rounded-full shadow hover:bg-teal-700 transition">
                  <Camera className="w-3.5 h-3.5" />
                </span>
              </div>

              {/* Hidden File Input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />

              <div className="space-y-3 w-full">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <label className="text-slate-700 dark:text-slate-300 font-bold uppercase font-mono">
                    Profile Photo & Avatar
                  </label>
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-xs flex items-center gap-1.5 shadow transition hover:scale-105"
                    >
                      <Upload className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" /> Upload File
                    </button>
                    <button
                      type="button"
                      onClick={startCamera}
                      className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 shadow transition hover:scale-105"
                    >
                      <Camera className="w-3.5 h-3.5" /> Take Photo
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">Presets:</span>
                  {presetAvatars.map((url, idx) => (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => setAvatar(url)}
                      className={`w-9 h-9 rounded-full overflow-hidden border-2 transition ${
                        avatar === url ? 'border-teal-500 scale-110 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={url} alt={`Preset ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>

                <div className="pt-1">
                  <input
                    type="text"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                    placeholder="Or enter image URL..."
                    className="w-full glass-input px-3 py-1.5 rounded-lg text-xs font-mono"
                  />
                </div>
              </div>
            </div>

            {/* General Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-slate-700 dark:text-slate-300 font-bold uppercase font-mono flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" /> Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full glass-input px-3 py-2.5 rounded-xl text-xs"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-700 dark:text-slate-300 font-bold uppercase font-mono flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" /> Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full glass-input px-3 py-2.5 rounded-xl text-xs"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-slate-700 dark:text-slate-300 font-bold uppercase font-mono flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" /> Target Role Title
                </label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  placeholder="e.g. Senior Frontend Engineer"
                  className="w-full glass-input px-3 py-2.5 rounded-xl text-xs"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-700 dark:text-slate-300 font-bold uppercase font-mono flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" /> Experience Level
                </label>
                <select
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  className="w-full glass-input px-3 py-2.5 rounded-xl text-xs font-semibold"
                >
                  <option value="Entry">Entry Level (0-2 Years)</option>
                  <option value="Intermediate">Intermediate (2-5 Years)</option>
                  <option value="Advanced">Advanced (5+ Years)</option>
                </select>
              </div>
            </div>

            {/* Core Skills Input */}
            <div className="space-y-1">
              <label className="text-slate-700 dark:text-slate-300 font-bold uppercase font-mono flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" /> Tech Stack & Core Skills (Comma Separated)
              </label>
              <input
                type="text"
                value={skillsStr}
                onChange={(e) => setSkillsStr(e.target.value)}
                placeholder="React, Node.js, System Design, Python, Docker"
                className="w-full glass-input px-3 py-2.5 rounded-xl text-xs font-mono"
              />
            </div>

            {/* Candidate Bio */}
            <div className="space-y-1">
              <label className="text-slate-700 dark:text-slate-300 font-bold uppercase font-mono flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" /> Candidate Executive Bio
              </label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full glass-input px-3 py-2 rounded-xl text-xs"
                placeholder="Describe your background and career targets..."
              ></textarea>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="px-6 py-3 rounded-xl text-xs font-bold text-white gradient-button flex items-center gap-2 shadow-lg shadow-indigo-600/30 hover:scale-105 transition"
              >
                <Save className="w-4 h-4" /> Save Profile Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-3 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              >
                Cancel
              </button>
            </div>

          </form>
        </div>
      ) : (
        /* OVERVIEW CARD */
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-300 dark:border-slate-800 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
            <div className="flex items-center gap-4">
              <img
                src={currentUser?.avatar}
                alt="Avatar"
                className="w-16 h-16 rounded-full object-cover ring-2 ring-teal-500/40"
              />
              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 dark:text-white text-xl">{currentUser?.name}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-xs font-medium">{currentUser?.email}</p>
                <div className="flex items-center gap-2 pt-1">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-teal-500/10 dark:bg-teal-500/20 text-teal-800 dark:text-teal-300 border border-teal-500/30 uppercase">
                    {currentUser?.targetRole || 'Full Stack Engineer'}
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-800 dark:text-indigo-300 border border-indigo-500/30">
                    {currentUser?.experienceLevel || 'Intermediate'}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white gradient-button flex items-center gap-1.5 shadow"
            >
              <Edit3 className="w-3.5 h-3.5" /> Edit Profile
            </button>
          </div>

          <div className="space-y-3 text-xs">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase font-mono">Executive Summary</h4>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              {currentUser?.bio || 'Passionate software engineer preparing for senior tech lead roles at Google, Meta, and top startups.'}
            </p>
          </div>

          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase font-mono">Technical Skill Stack</h4>
            <div className="flex flex-wrap gap-2">
              {(currentUser?.skills || ['React', 'Node.js', 'System Design', 'Python']).map((sk, i) => (
                <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono text-xs font-bold border border-slate-300 dark:border-slate-700">
                  {sk}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Verified Certificates Card */}
      <div className="glass-panel rounded-2xl p-6 border border-slate-300 dark:border-slate-800 space-y-4 shadow-sm">
        <h3 className="text-base font-bold text-slate-900 dark:text-white font-heading flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500 dark:text-amber-400" /> Verified Achievements & Certificates
        </h3>

        <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 dark:text-white text-sm">Full Stack AI Mock Interview Mastery</span>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30">
                VERIFIED
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Issued by InterviewAI • Score: 92% • ID: CERT-2026-901</p>
          </div>

          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 flex items-center gap-1.5 transition"
          >
            <Download className="w-3.5 h-3.5" /> PDF Certificate
          </button>
        </div>
      </div>

    </div>
  );
};

export default ProfilePage;
