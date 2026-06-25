const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ Mongo Error:", err));

// Test Route
app.get("/", (req, res) => {
  res.send("Server Running...");
});

// Auth Routes
const authRoutes = require("./routes/authRoutes");
const riderRoutes =
  require("./routes/riderRoutes");
app.use("/api/auth", authRoutes);
app.use("/api/riders", riderRoutes);
const riderOrderRoutes = require(
  "./routes/riderOrderRoutes"
);

app.use(
  "/api/rider",
  riderOrderRoutes
);
// Server Start
const PORT = process.env.PORT || 7007;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});