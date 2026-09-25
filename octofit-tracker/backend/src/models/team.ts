import mongoose, { Schema } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    totalPoints: { type: Number, required: true, min: 0, default: 0 },
  },
  { timestamps: true },
);

export const Team = mongoose.model('Team', teamSchema);