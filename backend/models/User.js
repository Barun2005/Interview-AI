// Mongoose User Schema Definition
export const UserSchema = {
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  avatar: { type: String },
  targetRole: { type: String, default: 'Software Engineer' },
  experienceLevel: { type: String, default: 'Intermediate' },
  skills: [{ type: String }],
  subscription: {
    plan: { type: String, default: 'Pro Tier' },
    status: { type: String, default: 'active' },
    renewsOn: { type: Date }
  },
  createdAt: { type: Date, default: Date.now }
};
