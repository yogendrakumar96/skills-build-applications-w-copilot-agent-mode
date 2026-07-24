import mongoose from 'mongoose';
import { connectToDatabase } from '../config/database';
import { User } from '../models/user';
import { Team } from '../models/team';
import { Activity } from '../models/activity';
import { LeaderboardEntry } from '../models/leaderboard';
import { Workout } from '../models/workout';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectToDatabase();
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const createdTeam = await Team.create({
      name: 'North Stars',
      sport: 'Running',
      location: 'Seattle',
      members: 8,
    });

    const createdUser = await User.create({
      name: 'Maya Chen',
      email: 'maya.chen@octofit.com',
      fitnessGoal: 'Train for a half marathon',
      experienceLevel: 'intermediate',
      teamId: createdTeam._id,
    });

    await Activity.create({
      userId: createdUser._id,
      type: 'run',
      durationMinutes: 45,
      distanceKm: 8.4,
      calories: 520,
      date: new Date('2026-07-20'),
    });

    await LeaderboardEntry.create({
      userId: createdUser._id,
      score: 980,
      rank: 1,
    });

    await Workout.create({
      title: 'Tempo Intervals',
      focus: 'cardio',
      durationMinutes: 30,
      difficulty: 'intermediate',
    });

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
