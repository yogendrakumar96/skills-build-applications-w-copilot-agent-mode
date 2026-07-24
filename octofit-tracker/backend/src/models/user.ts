import mongoose, { Schema, type Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  fitnessGoal: string;
  experienceLevel: string;
  teamId?: mongoose.Types.ObjectId;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  fitnessGoal: { type: String, required: true },
  experienceLevel: { type: String, required: true },
  teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
});

export const User = mongoose.model<IUser>('User', userSchema);
