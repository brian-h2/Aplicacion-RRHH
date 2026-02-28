// jobPostRoutes.js

const express = require("express");
const router = express.Router();
const JobPost = require("../models/jobPost");
const Session = require("../models/Session.model");
const upload = require("../middleware/UploadCloudinary");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");


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
router.post("/", upload.single("image"), async (req, res) => {

  console.log(req.body);
    
  const jobPost = new JobPost({
    ...req.body, // Use the userId from the verified session
    imageUrl: req.file?.path || null // URL pública de Cloudinary
  });


  try {
    const savedJobPost = await jobPost.save();

    res.status(201).json(savedJobPost);
  } catch (error) {
    console.error("Error creating job post:", error);
    res.status(400).json({ message: error.message });
  }
});

// Get all job posts (public)
router.get("/", async (req, res) => {
  const { searchTerm, locationTerm, statusTerm } = req.query;

  let filter = {};

  // Creamos un array para $and
  let andConditions = [];

  // 🔍 Filtro por búsqueda (title OR location)
  if (searchTerm) {
    andConditions.push({
      $or: [
        { title: { $regex: searchTerm, $options: "i" } },
        { company: { $regex: searchTerm, $options: "i" } },
        { description: { $regex: searchTerm, $options: "i" } }
      ]
    });
  }

  // 🔍 Filtro por ubicación
  if (locationTerm) {
    andConditions.push({
      locationTerm: { $regex: locationTerm, $options: "i" }
    });
  }

  // 🔥 Filtro por estado (FUNCIONA AHORA)
  if (statusTerm === "true") {
    // Activos = isDeleted false
    andConditions.push({ isDeleted: false });
  } 
  
  if (statusTerm === "false") {
    // Cerrados = isDeleted true
    andConditions.push({ isDeleted: true });
  }

  // Si hay condiciones, las aplicamos
  if (andConditions.length > 0) {
    filter.$and = andConditions;
  }

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
    console.log(jobPost);
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
router.put("/:id", authMiddleware,upload.single("image"), async (req, res) => {

  try {                             
    const updateData = { ...req.body };

    // 🔴 borrar explícito
    if (req.body.imageUrl === "") {
      updateData.imageUrl = "";
    }

    // 🟢 subir nueva (tiene prioridad)
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      updateData.imageUrl = result.secure_url;
    }

    const updatedJobPost = await JobPost.findByIdAndUpdate(
      req.params.id,
      updateData,
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
