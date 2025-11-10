import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import employeeRoutes from "./routes/employeeRoutes.js";
import ptoRoutes from "./routes/ptoroutes.js";
import monthlyUpdateRoutes from "./routes/monthlyUpdateRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch(err => console.log("❌ MongoDB Connection Failed:", err.message));

// Base route
app.get("/", (req, res) => 
  res.json({ 
    message: "Backend running successfully",
    endpoints: {
      employees: "/api/employees",
      health: "/api/health"
    }
  }));

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "OK", 
    mongodb: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
    timestamp: new Date().toISOString()
  });
});

// Employee routes
app.use("/api/employees", employeeRoutes);

app.use("/api/ptos", ptoRoutes);

app.use("/api/monthly-updates", monthlyUpdateRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));