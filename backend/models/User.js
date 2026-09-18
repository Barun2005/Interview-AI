import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  avatar: { type: String },
  targetRole: { type: String, default: 'Software Engineer' },
  experienceLevel: { type: String, default: 'Intermediate' },
  skills: [{ type: String }],
  isEmailVerified: { type: Boolean, default: false },
  otpCode: { type: String },
  otpExpiresAt: { type: Date },
  subscription: {
    plan: { type: String, default: 'Pro Tier' },
    status: { type: String, default: 'active' },
    renewsOn: { type: Date }
  },
  createdAt: { type: Date, default: Date.now }
});

export const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;
