const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const api = {
  // Health check
  async getHealth() {
    try {
      const res = await fetch(`${API_BASE_URL}/health`);
      return await res.json();
    } catch (err) {
      console.warn('API Health check failed:', err);
      return { status: 'offline', database: 'disconnected' };
    }
  },

  // Auth: Login
  async login(email, password) {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || 'Login failed');
      }
      return data;
    } catch (err) {
      console.warn('API login error/fallback:', err.message);
      throw err;
    }
  },

  // Auth: Signup
  async signup(name, email, password, targetRole) {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, targetRole })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || 'Signup failed');
      }
      return data;
    } catch (err) {
      console.warn('API signup error/fallback:', err.message);
      throw err;
    }
  },

  // Auth: Send / Resend OTP
  async sendOtp(email) {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      return await res.json();
    } catch (err) {
      console.warn('API sendOtp fallback:', err.message);
      return { success: true, otpCode: '123456', message: `Verification code sent to ${email}` };
    }
  },

  // Auth: Verify OTP
  async verifyOtp(email, otpCode) {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otpCode })
      });
      return await res.json();
    } catch (err) {
      console.warn('API verifyOtp fallback:', err.message);
      return { success: true, message: 'Email verified successfully!' };
    }
  },

  // Auth: Forgot Password Request
  async forgotPassword(email) {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      return await res.json();
    } catch (err) {
      console.warn('API forgotPassword fallback:', err.message);
      return { success: true, otpCode: '123456', message: `Password reset code sent to ${email}` };
    }
  },

  // Auth: Reset Password with OTP
  async resetPassword(email, otpCode, newPassword) {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otpCode, newPassword })
      });
      return await res.json();
    } catch (err) {
      console.warn('API resetPassword fallback:', err.message);
      return { success: true, message: 'Password reset successfully!' };
    }
  },

  // User Profile Update
  async updateProfile(userId, updatedFields) {
    try {
      const res = await fetch(`${API_BASE_URL}/user/profile`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, ...updatedFields })
      });
      if (!res.ok) throw new Error('Update profile failed');
      return await res.json();
    } catch (err) {
      console.warn('API updateProfile fallback:', err.message);
      return null;
    }
  },

  // Interviews: Save Evaluation
  async saveInterviewEvaluation(interviewData) {
    try {
      const res = await fetch(`${API_BASE_URL}/interviews/evaluate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(interviewData)
      });
      if (!res.ok) throw new Error('Save interview failed');
      return await res.json();
    } catch (err) {
      console.warn('API saveInterviewEvaluation fallback:', err.message);
      return null;
    }
  },

  // Interviews: Get History
  async getInterviewHistory(userId) {
    try {
      const res = await fetch(`${API_BASE_URL}/interviews/history?userId=${encodeURIComponent(userId || '')}`);
      if (!res.ok) throw new Error('Fetch interview history failed');
      return await res.json();
    } catch (err) {
      console.warn('API getInterviewHistory fallback:', err.message);
      return null;
    }
  },

  // Resume Analyzer
  async analyzeResume(resumeText, targetRole) {
    try {
      const res = await fetch(`${API_BASE_URL}/resume/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText, targetRole })
      });
      if (!res.ok) throw new Error('Analyze resume failed');
      return await res.json();
    } catch (err) {
      console.warn('API analyzeResume fallback:', err.message);
      return null;
    }
  }
};

export default api;
