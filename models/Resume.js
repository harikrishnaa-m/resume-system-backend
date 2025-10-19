import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: String,
  platform: String,
  completionDate: Date,
  certificateUrl: String,
});

const resumeSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: String,
    personalInfo: {
      name: String,
      email: String,
      phone: String,
    },
    education: [courseSchema],
    experience: [
      {
        company: String,
        role: String,
        duration: String,
        description: String,
      },
    ],
    skills: [String],
    projects: [
      {
        title: String,
        description: String,
        link: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Resume", resumeSchema);
