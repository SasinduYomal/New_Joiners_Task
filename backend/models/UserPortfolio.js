import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
  email: { type: String },
  linkedin: { type: String },
  github: { type: String },
  website: { type: String },
});

const ProjectSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  technologies: { type: String },
  githubLink: { type: String },
  liveDemoLink: { type: String },
});

const ExperienceSchema = new mongoose.Schema({
  company: { type: String },
  role: { type: String },
  duration: { type: String },
  description: { type: String },
});

const UserPortFolioSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    fullname: { type: String, required: true },
    title: { type: String },
    profileImage: { type: String },
    bio: { type: String },
    // Fixed: single object instead of array
    contact: { type: ContactSchema },
    skills: { type: String },
    projects: [ProjectSchema],
    experience: [ExperienceSchema],
  },
  { timestamps: true }
);

export default mongoose.model("UserPortfolio", UserPortFolioSchema);