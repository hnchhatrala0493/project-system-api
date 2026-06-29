const mongoose = require("mongoose");

const bugSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
    task: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
    reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    severity: { type: String, enum: ["Low", "Medium", "High", "Critical"], default: "Medium" },
    priority: { type: String, enum: ["Low", "Medium", "High", "Critical"], default: "Medium" },
    status: {
      type: String,
      enum: ["Open", "Assigned", "In Progress", "Fixed", "Retesting", "Closed", "Reopened"],
      default: "Open",
    },
    stepsToReproduce: { type: String, default: "" },
    expectedResult: { type: String, default: "" },
    actualResult: { type: String, default: "" },
    screenshot: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bug", bugSchema);
