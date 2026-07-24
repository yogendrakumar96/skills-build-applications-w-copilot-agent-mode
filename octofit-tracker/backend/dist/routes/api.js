"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../models/user");
const team_1 = require("../models/team");
const activity_1 = require("../models/activity");
const leaderboard_1 = require("../models/leaderboard");
const workout_1 = require("../models/workout");
const router = (0, express_1.Router)();
router.get('/users', async (_req, res) => {
    const users = await user_1.User.find().lean();
    res.json(users);
});
router.post('/users', async (req, res) => {
    const newUser = await user_1.User.create(req.body);
    res.status(201).json(newUser);
});
router.get('/teams', async (_req, res) => {
    const teams = await team_1.Team.find().lean();
    res.json(teams);
});
router.post('/teams', async (req, res) => {
    const newTeam = await team_1.Team.create(req.body);
    res.status(201).json(newTeam);
});
router.get('/activities', async (_req, res) => {
    const activities = await activity_1.Activity.find().populate('userId').lean();
    res.json(activities);
});
router.post('/activities', async (req, res) => {
    const newActivity = await activity_1.Activity.create(req.body);
    res.status(201).json(newActivity);
});
router.get('/leaderboard', async (_req, res) => {
    const leaderboard = await leaderboard_1.LeaderboardEntry.find().populate('userId').lean();
    res.json(leaderboard);
});
router.get('/workouts', async (_req, res) => {
    const workouts = await workout_1.Workout.find().lean();
    res.json(workouts);
});
router.post('/workouts', async (req, res) => {
    const newWorkout = await workout_1.Workout.create(req.body);
    res.status(201).json(newWorkout);
});
exports.default = router;
