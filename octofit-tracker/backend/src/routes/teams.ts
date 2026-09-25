import { Router } from 'express';
import { Team } from '../models/team';

const teamsRouter = Router();

teamsRouter.get('/', async (_request, response) => {
  const teams = await Team.find().populate('members', 'username displayName').sort({ name: 1 }).lean();
  response.json({ resource: 'teams', data: teams });
});

export default teamsRouter;