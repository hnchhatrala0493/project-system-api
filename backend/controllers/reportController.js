const Project = require("../models/Project");
const Task = require("../models/Task");
const Bug = require("../models/Bug");
const User = require("../models/User");

const dashboard = async (req, res, next) => {
  try {
    const today = new Date();
    const [totalProjects, activeProjects, completedProjects, pendingTasks, overdueTasks, bugsCount, usersCount] =
      await Promise.all([
        Project.countDocuments(),
        Project.countDocuments({ status: { $in: ["Planning", "In Progress", "Testing"] } }),
        Project.countDocuments({ status: "Completed" }),
        Task.countDocuments({ status: { $ne: "Completed" } }),
        Task.countDocuments({ status: { $ne: "Completed" }, dueDate: { $lt: today } }),
        Bug.countDocuments({ status: { $nin: ["Closed"] } }),
        User.countDocuments(),
      ]);

    const projectProgress = await Project.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
      { $project: { status: "$_id", count: 1, _id: 0 } },
    ]);

    const teamPerformance = await Task.aggregate([
      { $match: { assignedTo: { $ne: null } } },
      { $group: { _id: { user: "$assignedTo", status: "$status" }, count: { $sum: 1 } } },
      { $lookup: { from: "users", localField: "_id.user", foreignField: "_id", as: "user" } },
      { $unwind: "$user" },
      { $project: { name: "$user.name", status: "$_id.status", count: 1, _id: 0 } },
    ]);

    res.json({
      stats: { totalProjects, activeProjects, completedProjects, pendingTasks, overdueTasks, bugsCount, usersCount },
      projectProgress,
      teamPerformance,
    });
  } catch (error) {
    next(error);
  }
};

const projectReport = async (req, res, next) => {
  try {
    res.json(await Project.find().populate("teamMembers", "name role").sort({ createdAt: -1 }));
  } catch (error) {
    next(error);
  }
};

const taskReport = async (req, res, next) => {
  try {
    res.json(await Task.find().populate("project", "name code").populate("assignedTo", "name role").sort({ dueDate: 1 }));
  } catch (error) {
    next(error);
  }
};

const bugReport = async (req, res, next) => {
  try {
    res.json(await Bug.find().populate("project", "name code").populate("assignedTo", "name role").sort({ createdAt: -1 }));
  } catch (error) {
    next(error);
  }
};

const userReport = async (req, res, next) => {
  try {
    res.json(await User.find().select("-password").sort({ role: 1, name: 1 }));
  } catch (error) {
    next(error);
  }
};

module.exports = { dashboard, projectReport, taskReport, bugReport, userReport };
