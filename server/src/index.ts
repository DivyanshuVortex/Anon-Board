import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import authRoutes from "./routes/route";
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Welcome to the Anon-Board API");
});

// Routes
app.use("/api/auth", authRoutes);

// Start server
app.listen(3000, () => {
  console.log("🚀 Server running at http://localhost:3000");
});
