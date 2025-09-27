// jobPostRoutes.js

const nodemailer = require("nodemailer");
const express = require("express");
const router = express.Router();
const JobPost = require("../models/jobPost");
const Session = require("../models/Session.model");
const Email = require("../models/email");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

// Middleware to verify the session token
const authMiddleware = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization;
    if (!accessToken) {
      return res.status(401).json({ message: "Unauthorized. No token provided." });
    }

    // Find the session by token
    const session = await Session.findById(accessToken);
    if (!session) {
      return res.status(401).json({ message: "Unauthorized. Invalid token." });
    }

    req.userData = { userId: session.user };
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res.status(500).json({ message: "Internal Server Error." });
  }
};

// Create a new job post (requires authentication)
router.post("/", async (req, res) => {

  const jobPost = new JobPost({
    ...req.body // Use the userId from the verified session
  });
  
  try {
    const savedJobPost = await jobPost.save();

    const subscribers = await Email.find({});

    if (subscribers.length > 0) {
        const subject = "🚀 Nuevo trabajo publicado en nuestra plataforma";

        const htmlContent = `
          <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
            <h2 style="color: #2c3e50;">¡Tenemos una nueva oportunidad para vos!</h2>
            <p><b>${savedJobPost.title}</b></p>
            <p style="color: #555;">
              ${savedJobPost.description.substring(0, 150)}...
            </p>
            <a href="https://web-ceciliamenta-rrhh.vercel.app/clientdashboard/clientjobs"
              style="display: inline-block; margin-top: 15px; padding: 10px 20px; 
                      background-color: #3498db; color: #fff; text-decoration: none; 
                      border-radius: 5px; font-weight: bold;">
              Ver más detalles
            </a>
            <hr style="margin-top: 30px; border: none; border-top: 1px solid #eee;">
          </div>
        `;
      // Mandar un BCC a todos en UN solo envio
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        bcc: subscribers.map(sub => sub.email), // todos en copia oculta
        subject,
        html: htmlContent,
      });
    }

    res.status(201).json(savedJobPost);
  } catch (error) {
    console.error("Error creating job post:", error);
    res.status(400).json({ message: error.message });
  }
});

// Get all job posts (public)
router.get("/", async (req, res) => {
  const { searchTerm, locationTerm } = req.query;

  // Initialize filter with non-deleted items
 // Backend filter update logic to ensure the search works as intended
 let filter = { isDeleted: false };

 if (searchTerm || locationTerm) {
   filter.$or = [];
 
   if (searchTerm) {
     filter.$or.push(
       { title: { $regex: searchTerm, $options: "i" } },

     );
   }
 
   if (locationTerm) {
     filter.$or.push({ locationTerm: { $regex: locationTerm, $options: "i" } });
   }
 }

 // Log the constructed filter to verify
//  console.log("Filter:", JSON.stringify(filter));
  
  try {
    const jobPosts = await JobPost.find(filter);
    res.status(200).json(jobPosts);
  } catch (error) {
    console.error("Error fetching job posts:", error);
    res.status(500).json({ message: error.message });
  }
});

// Get a single job post by ID (public)
router.get("/:id", async (req, res) => {
  try {
    const jobPost = await JobPost.findById(req.params.id);
    if (!jobPost) {
      return res.status(404).json({ message: "Job Post not found" });
    }
    res.status(200).json(jobPost);
  } catch (error) {
    console.error("Error fetching job post:", error);
    res.status(500).json({ message: error.message });
  }
});

// Update a job post (requires authentication)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const updatedJobPost = await JobPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedJobPost) {
      return res.status(404).json({ message: "Job Post not found" });
    }
    res.status(200).json(updatedJobPost);
  } catch (error) {
    console.error("Error updating job post:", error);
    res.status(400).json({ message: error.message });
  }
});

// Delete a job post (requires authentication)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const job = await JobPost.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job Post not found" });
    }
    job.isDeleted = true;
    job.deletedAt = new Date();
    await job.save();
    res.status(200).json({ message: "Job marked as deleted." });
  } catch (error) {
    console.error("Error deleting the job post:", error);
    res.status(500).json({ message: "Error deleting the job post." });
  }
});

// Restore a deleted job post (requires authentication)
router.post("/restore/:id", authMiddleware, async (req, res) => {
  try {
    const job = await JobPost.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job Post not found" });
    }
    job.isDeleted = false;
    job.deletedAt = null;
    await job.save();
    res.status(200).json({ message: "Job restored." });
  } catch (error) {
    console.error("Error restoring job post:", error);
    res.status(500).json({ message: "Error restoring the job post." });
  }
});

module.exports = router;
