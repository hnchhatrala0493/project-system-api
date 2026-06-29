const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, unique: true, uppercase: true, trim: true },
    clientName: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    category: { type: String, default: "Software" },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    priority: { type: String, enum: ["Low", "Medium", "High", "Critical"], default: "Medium" },
    status: {
      type: String,
      enum: ["Planning", "In Progress", "Testing", "On Hold", "Completed", "Cancelled"],
      default: "Planning",
    },
    budget: { type: Number, default: 0 },
    technologies: [{ type: String, trim: true }],
    teamMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
