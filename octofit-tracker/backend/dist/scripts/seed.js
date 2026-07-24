"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const database_1 = require("../config/database");
const user_1 = require("../models/user");
const team_1 = require("../models/team");
const activity_1 = require("../models/activity");
const leaderboard_1 = require("../models/leaderboard");
const workout_1 = require("../models/workout");
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await (0, database_1.connectToDatabase)();
        console.log('Seed the octofit_db database with test data');
        await Promise.all([
            user_1.User.deleteMany({}),
            team_1.Team.deleteMany({}),
            activity_1.Activity.deleteMany({}),
            leaderboard_1.LeaderboardEntry.deleteMany({}),
            workout_1.Workout.deleteMany({}),
        ]);
        const createdTeam = await team_1.Team.create({
            name: 'North Stars',
            sport: 'Running',
            location: 'Seattle',
            members: 8,
        });
        const createdUser = await user_1.User.create({
            name: 'Maya Chen',
            email: 'maya.chen@octofit.com',
            fitnessGoal: 'Train for a half marathon',
            experienceLevel: 'intermediate',
            teamId: createdTeam._id,
        });
        await activity_1.Activity.create({
            userId: createdUser._id,
            type: 'run',
            durationMinutes: 45,
            distanceKm: 8.4,
            calories: 520,
            date: new Date('2026-07-20'),
        });
        await leaderboard_1.LeaderboardEntry.create({
            userId: createdUser._id,
            score: 980,
            rank: 1,
        });
        await workout_1.Workout.create({
            title: 'Tempo Intervals',
            focus: 'cardio',
            durationMinutes: 30,
            difficulty: 'intermediate',
        });
        console.log('Database seeding complete');
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
    finally {
        await mongoose_1.default.disconnect();
    }
}
seedDatabase();
