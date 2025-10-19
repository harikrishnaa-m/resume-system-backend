import Resume from "../models/Resume.js";

//create resume
export const createResume = async (req, res) => {
  try {
    // Check if resume already exists for this user
    const existingResume = await Resume.findOne({ userId: req.user.id });

    if (existingResume) {
      return res.status(400).json({
        message: "Resume already exists. Use update endpoint to modify.",
      });
    }

    const resume = await Resume.create({ ...req.body, userId: req.user.id });
    res.status(201).json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//fetch resume
export const getMyResume = async (req, res) => {
  const resume = await Resume.findOne({ userId: req.user.id });
  res.json(resume);
};

//updation
export const updateResume = async (req, res) => {
  const updated = await Resume.findOneAndUpdate(
    { userId: req.user.id },
    req.body,
    { new: true }
  );
  res.json(updated);
};

//deletion
export const deleteResume = async (req, res) => {
  await Resume.findOneAndDelete({ userId: req.user.id });
  res.json({ message: "Resume deleted" });
};
