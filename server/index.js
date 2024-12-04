import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { router as formRoutes } from "./routes/forms.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN; // Used for development & production

// Middleware
app.use(
  cors({
    origin: CLIENT_ORIGIN, // Replace with your frontend domains
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    credentials: true, // Enable cookies, authorization headers, etc.
  })
);
app.use(express.json());

connectDB();

app.use("/api/forms", formRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
