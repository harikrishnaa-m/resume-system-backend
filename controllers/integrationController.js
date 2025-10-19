import Resume from "../models/Resume.js";

// Generic platform integration
export const integratePlatform = async (req, res) => {
  const { userId, platform, accessToken } = req.body;

  try {
    let platformData = [];

    // Standardize API fetching for each platform
    switch (platform) {
      case "coursera":
        const courseraResponse = await fetch(
          `https://api.coursera.org/api/userCourses.v1?userId=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const courseraData = await courseraResponse.json();
        platformData = courseraData.elements.map((course) => ({
          title: course.name,
          platform: "Coursera",
          completionDate: course.completedAt,
          certificateUrl: course.certificateUrl,
        }));
        break;

      case "udemy":
        // Example: fetch course completion data from Udemy
        const udemyResponse = await fetch(
          `https://www.udemy.com/api-2.0/users/${userId}/subscribed-courses`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        const udemyData = await udemyResponse.json();
        platformData = udemyData.results.map((course) => ({
          title: course.title,
          platform: "Udemy",
          completionDate: course.completion_date,
          certificateUrl: course.certificate_url,
        }));
        break;

      // Add more platforms as needed
      default:
        return res.status(400).json({ error: "Platform not supported" });
    }

    // Update resume
    const resume = await Resume.findOne({ userId });
    if (!resume) {
      return res.status(404).json({ error: "Resume not found" });
    }

    resume.education = resume.education.concat(platformData);
    await resume.save();

    res.json({ message: "Resume updated successfully", resume });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to integrate platform" });
  }
};
