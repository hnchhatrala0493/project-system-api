const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, default: "" },
    permissions: {
      viewDashboard: { type: Boolean, default: true },
      manageUsers: { type: Boolean, default: false },
      manageProjects: { type: Boolean, default: false },
      manageTasks: { type: Boolean, default: false },
      manageBugs: { type: Boolean, default: false },
      manageReports: { type: Boolean, default: false },
      manageSettings: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Role", roleSchema);
