import React, { useState } from 'react';
import { useInterview } from '../context/InterviewContext';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  CheckCircle2, 
  Sparkles, 
  Plus,
  Video
} from 'lucide-react';

export const ScheduleBookingPage = () => {
  const { scheduledInterviews, addScheduledInterview } = useInterview();

  const [date, setDate] = useState('2026-08-03');
  const [time, setTime] = useState('14:00');
  const [title, setTitle] = useState('System Design & Distributed Caching');
  const [company, setCompany] = useState('Google');
  const [duration, setDuration] = useState('45 mins');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleBooking = (e) => {
    e.preventDefault();
    const newBooking = {
      id: 'sch_' + Date.now(),
      title,
      type: 'Technical System Design',
      company,
      dateTime: `${date}T${time}:00`,
      interviewer: 'AI Specialist Sophia',
      duration
    };
    addScheduledInterview(newBooking);
    setBookingSuccess(true);
    setTimeout(() => setBookingSuccess(false), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Header */}
      <div className="border-b border-slate-300 dark:border-slate-800 pb-4 space-y-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-heading flex items-center gap-2">
          Mock Interview Scheduler <CalendarIcon className="w-6 h-6 text-purple-400" />
        </h1>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          Schedule upcoming 1-on-1 mock interviews with AI interviewers or peer candidates.
        </p>
      </div>

      {/* Grid: Booking Form (Left) vs Scheduled Sessions (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Form (5 cols) */}
        <div className="lg:col-span-5 glass-panel rounded-2xl p-6 border border-slate-300 dark:border-slate-800 space-y-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading flex items-center gap-2">
            <Plus className="w-5 h-5 text-indigo-400" /> Reserve Session Slot
          </h3>

          {bookingSuccess && (
            <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Session successfully reserved!
            </div>
          )}

          <form onSubmit={handleBooking} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="text-slate-700 dark:text-slate-300 font-semibold uppercase font-mono">Session Topic Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full glass-input px-3 py-2 rounded-xl text-xs"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-slate-700 dark:text-slate-300 font-semibold uppercase font-mono">Target Company</label>
                <select
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full glass-input px-3 py-2 rounded-xl text-xs"
                >
                  <option value="Google">Google</option>
                  <option value="Amazon">Amazon</option>
                  <option value="Meta">Meta</option>
                  <option value="Microsoft">Microsoft</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-700 dark:text-slate-300 font-semibold uppercase font-mono">Duration</label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full glass-input px-3 py-2 rounded-xl text-xs"
                >
                  <option value="15 mins">15 Minutes</option>
                  <option value="30 mins">30 Minutes</option>
                  <option value="45 mins">45 Minutes</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-slate-700 dark:text-slate-300 font-semibold uppercase font-mono">Select Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full glass-input px-3 py-2 rounded-xl text-xs"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-700 dark:text-slate-300 font-semibold uppercase font-mono">Select Time Slot</label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full glass-input px-3 py-2 rounded-xl text-xs"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl text-xs font-bold text-white gradient-button shadow-lg shadow-indigo-600/30 hover:scale-105 transition"
            >
              Confirm Reservation
            </button>
          </form>
        </div>

        {/* Scheduled List (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white font-heading flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" /> Confirmed Upcoming Sessions
          </h3>

          <div className="space-y-3">
            {scheduledInterviews.map((sch) => (
              <div
                key={sch.id}
                className="p-5 rounded-2xl glass-panel border border-slate-300 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-slate-900 dark:text-white text-base">{sch.title}</span>
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-500/30 font-bold">
                      {sch.company}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-4 flex-wrap font-medium">
                    <span className="flex items-center gap-1.5"><CalendarIcon className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" /> {new Date(sch.dateTime).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" /> {new Date(sch.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-mono text-[11px] font-bold">{sch.duration}</span>
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 font-mono">
                    <User className="w-3 h-3 text-indigo-500" /> Interviewer: {sch.interviewer}
                  </p>
                </div>

                <a
                  href="/mock-interview"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white gradient-button flex items-center gap-1.5 shadow-md shadow-indigo-600/30 shrink-0 hover:scale-105 transition"
                >
                  <Video className="w-4 h-4" /> Join Room
                </a>
              </div>
            ))}

            {scheduledInterviews.length === 0 && (
              <div className="p-8 rounded-2xl glass-panel border border-slate-300 dark:border-slate-800 text-center space-y-2">
                <CalendarIcon className="w-8 h-8 text-slate-400 mx-auto" />
                <p className="text-sm text-slate-700 dark:text-slate-300 font-bold">No upcoming sessions scheduled.</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Use the form on the left to reserve your next interview slot.</p>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
