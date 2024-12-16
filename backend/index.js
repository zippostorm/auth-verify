import express from "express";
import dotenv from "dotenv";

import { connectDB } from "./db/connectDB.js";

import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port:", PORT);
});

app.use("/api/auth", authRoutes);
