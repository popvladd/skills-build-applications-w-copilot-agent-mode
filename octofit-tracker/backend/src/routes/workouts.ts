import { Router } from 'express';
import { Workout } from '../models/workout';

const workoutsRouter = Router();

workoutsRouter.get('/', async (_request, response) => {
  const workouts = await Workout.find().sort({ difficulty: 1, title: 1 }).lean();
  response.json({ resource: 'workouts', data: workouts });
});

export default workoutsRouter;