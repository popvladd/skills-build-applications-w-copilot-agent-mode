import { Router } from 'express';
import { Activity } from '../models/activity';

const activitiesRouter = Router();

activitiesRouter.get('/', async (_request, response) => {
  const activities = await Activity.find()
    .populate('user', 'username displayName')
    .sort({ completedAt: -1 })
    .lean();
  response.json({ resource: 'activities', data: activities });
});

export default activitiesRouter;