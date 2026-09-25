import mongoose from 'mongoose';
import { connectDatabase } from '../config/database';
import { Activity } from '../models/activity';
import { Leaderboard } from '../models/leaderboard';
import { Team } from '../models/team';
import { User } from '../models/user';
import { Workout } from '../models/workout';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDatabase();
    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      {
        username: 'alexrivera',
        email: 'alex.rivera@example.com',
        displayName: 'Alex Rivera',
        bio: 'Trail runner and early-morning workout fan.',
      },
      {
        username: 'jamiechen',
        email: 'jamie.chen@example.com',
        displayName: 'Jamie Chen',
        bio: 'Cyclist building consistent strength habits.',
      },
      {
        username: 'morganlee',
        email: 'morgan.lee@example.com',
        displayName: 'Morgan Lee',
        bio: 'Yoga instructor and mobility enthusiast.',
      },
    ]);

    const teams = await Team.create([
      {
        name: 'Summit Striders',
        description: 'A friendly crew focused on weekly running goals.',
        members: [users[0]._id, users[1]._id],
        totalPoints: 1840,
      },
      {
        name: 'Wellness Wave',
        description: 'Balanced training for strength, mobility, and recovery.',
        members: [users[2]._id],
        totalPoints: 1260,
      },
    ]);

    await Activity.create([
      {
        user: users[0]._id,
        type: 'run',
        durationMinutes: 42,
        calories: 430,
        distanceKm: 6.8,
        completedAt: new Date('2026-09-24T07:15:00Z'),
      },
      {
        user: users[1]._id,
        type: 'ride',
        durationMinutes: 55,
        calories: 510,
        distanceKm: 18.4,
        completedAt: new Date('2026-09-23T17:30:00Z'),
      },
      {
        user: users[2]._id,
        type: 'yoga',
        durationMinutes: 30,
        calories: 180,
        completedAt: new Date('2026-09-24T06:45:00Z'),
      },
    ]);

    await Leaderboard.create([
      { user: users[0]._id, team: teams[0]._id, points: 980, rank: 1 },
      { user: users[1]._id, team: teams[0]._id, points: 860, rank: 2 },
      { user: users[2]._id, team: teams[1]._id, points: 760, rank: 3 },
    ]);

    await Workout.create([
      {
        title: 'Full Body Foundations',
        description: 'A balanced strength session for building movement confidence.',
        difficulty: 'beginner',
        durationMinutes: 30,
        exercises: [
          { name: 'Bodyweight squat', sets: 3, reps: 12 },
          { name: 'Incline push-up', sets: 3, reps: 10 },
          { name: 'Dead bug', sets: 3, reps: 10 },
        ],
      },
      {
        title: 'Tempo Runner',
        description: 'A focused interval workout for improving running speed.',
        difficulty: 'intermediate',
        durationMinutes: 40,
        exercises: [
          { name: 'Warm-up jog', sets: 1, reps: 1 },
          { name: 'Tempo interval', sets: 4, reps: 5 },
          { name: 'Cool-down walk', sets: 1, reps: 1 },
        ],
      },
    ]);

    console.log('Seeded users, teams, activities, leaderboard, and workouts');
    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
