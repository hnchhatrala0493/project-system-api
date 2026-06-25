const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/Auth.routes");
// const userRoutes = require("./routes/Users.routes");
// const projectRoutes = require("./routes/project.routes");
// const taskRoutes = require("./routes/task.routes");

// Use Routes
// app.use("/api/users", userRoutes);
// app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
// app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log("MongoDB Error:", err));
