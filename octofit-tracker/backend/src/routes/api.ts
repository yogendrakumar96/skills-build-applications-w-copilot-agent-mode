import { Router, type Request, type Response } from 'express';
import { User } from '../models/user';
import { Team } from '../models/team';
import { Activity } from '../models/activity';
import { LeaderboardEntry } from '../models/leaderboard';
import { Workout } from '../models/workout';

const router = Router();

router.get('/users', async (_req: Request, res: Response) => {
  const users = await User.find().lean();
  res.json(users);
});

router.post('/users', async (req: Request, res: Response) => {
  const newUser = await User.create(req.body);
  res.status(201).json(newUser);
});

router.get('/teams', async (_req: Request, res: Response) => {
  const teams = await Team.find().lean();
  res.json(teams);
});

router.post('/teams', async (req: Request, res: Response) => {
  const newTeam = await Team.create(req.body);
  res.status(201).json(newTeam);
});

router.get('/activities', async (_req: Request, res: Response) => {
  const activities = await Activity.find().populate('userId').lean();
  res.json(activities);
});

router.post('/activities', async (req: Request, res: Response) => {
  const newActivity = await Activity.create(req.body);
  res.status(201).json(newActivity);
});

router.get('/leaderboard', async (_req: Request, res: Response) => {
  const leaderboard = await LeaderboardEntry.find().populate('userId').lean();
  res.json(leaderboard);
});

router.get('/workouts', async (_req: Request, res: Response) => {
  const workouts = await Workout.find().lean();
  res.json(workouts);
});

router.post('/workouts', async (req: Request, res: Response) => {
  const newWorkout = await Workout.create(req.body);
  res.status(201).json(newWorkout);
});

export default router;
