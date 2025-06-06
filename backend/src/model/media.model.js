
import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    url: {
      type: String,
      required: true
    },
  
    type: {
      type: String,
      enum: ['image', 'video'],
      required: true
    },
    tags: {
      type: [String],
      default: []
    },
    albums: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Album",
      },
    ],
  
  },
  { timestamps: true }
);
export const Media =  mongoose.model('Media', mediaSchema);
