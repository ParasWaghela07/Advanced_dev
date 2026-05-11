import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(

  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      trim: true
    },

    status: {
      type: String,
      enum: ["active", "completed"],
      default: "active"
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }

  },

  {
    timestamps: true
  }

);

// 🔥 indexes
projectSchema.index({ owner: 1, createdAt: -1 });

projectSchema.index({ status: 1 });

projectSchema.index({ title: "text" });

const Project = mongoose.model(
  "Project",
  projectSchema
);

export default Project;