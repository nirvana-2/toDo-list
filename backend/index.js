const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const todoRoutes = require("./routes/todoRoutes");

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/todoDB")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ DB Connection Error:", err));

app.use("/todos", todoRoutes);

app.get("/", (req, res) => {
  res.send("✅ Server is running! Use /todos endpoint.");
});

app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
