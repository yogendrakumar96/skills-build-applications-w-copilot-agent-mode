import mongoose, { Schema, type Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  sport: string;
  location: string;
  members: number;
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true, unique: true },
  sport: { type: String, required: true },
  location: { type: String, required: true },
  members: { type: Number, required: true },
});

export const Team = mongoose.model<ITeam>('Team', teamSchema);
