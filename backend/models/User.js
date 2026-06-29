const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    phone: { type: String, trim: true },
    role: {
      type: String,
      enum: ["Super Admin", "Admin", "Project Manager", "Team Lead", "Developer", "Tester", "Client"],
      default: "Developer",
    },
    department: { type: String, default: "Engineering" },
    designation: { type: String, default: "Team Member" },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
    avatar: { type: String, default: "" },
    assignedProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
    resetPasswordToken: String,
    resetPasswordExpires: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
