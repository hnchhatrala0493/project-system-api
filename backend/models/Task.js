const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    priority: { type: String, enum: ["Low", "Medium", "High", "Critical"], default: "Medium" },
    status: {
      type: String,
      enum: ["Todo", "In Progress", "Review", "Testing", "Completed", "Reopened"],
      default: "Todo",
    },
    startDate: { type: Date, required: true },
    dueDate: { type: Date, required: true },
    estimatedHours: { type: Number, default: 0 },
    actualHours: { type: Number, default: 0 },
    attachments: [{ type: String }],
    comments: [commentSchema],
    sprint: { type: mongoose.Schema.Types.ObjectId, ref: "Sprint" },
  },
  { timestamps: true }
);

taskSchema.pre("validate", function validateDates(next) {
  if (this.startDate && this.dueDate && this.dueDate < this.startDate) {
    return next(new Error("Task due date cannot be before start date"));
  }
  next();
});

module.exports = mongoose.model("Task", taskSchema);
