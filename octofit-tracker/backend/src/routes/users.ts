import { Router } from 'express';
import { User } from '../models/user';

const usersRouter = Router();

usersRouter.get('/', async (_request, response) => {
  const users = await User.find().sort({ displayName: 1 }).lean();
  response.json({ resource: 'users', data: users });
});

export default usersRouter;