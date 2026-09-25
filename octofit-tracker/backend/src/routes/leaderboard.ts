import { Router } from 'express';
import { Leaderboard } from '../models/leaderboard';

const leaderboardRouter = Router();

leaderboardRouter.get('/', async (_request, response) => {
  const leaderboard = await Leaderboard.find()
    .populate('user', 'username displayName')
    .populate('team', 'name')
    .sort({ points: -1 })
    .lean();
  response.json({ resource: 'leaderboard', data: leaderboard });
});

export default leaderboardRouter;