const Task = require("../models/Task");
const Project = require("../models/Project");
const { ADMIN_ROLES } = require("../middleware/roleMiddleware");

const taskAccessQuery = async (user) => {
  if (ADMIN_ROLES.includes(user.role)) return {};
  const assignedProjects = await Project.find({ teamMembers: user._id }).select("_id");
  return {
    $or: [
      { assignedTo: user._id },
      { assignedBy: user._id },
      { project: { $in: assignedProjects.map((project) => project._id) } },
    ],
  };
};

const listTasks = async (req, res, next) => {
  try {
    const { project, status, priority, assignedTo } = req.query;
    const query = await taskAccessQuery(req.user);
    if (project) query.project = project;
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (assignedTo) query.assignedTo = assignedTo;

    const tasks = await Task.find(query)
      .populate("project", "name code")
      .populate("assignedTo", "name role avatar")
      .populate("assignedBy", "name")
      .sort({ dueDate: 1 });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    const task = await Task.create({ ...req.body, assignedBy: req.user._id });
    res.status(201).json(await task.populate(["project", "assignedTo", "assignedBy"]));
  } catch (error) {
    next(error);
  }
};

const getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id).populate(["project", "assignedTo", "assignedBy", "comments.user"]);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate(["project", "assignedTo"]);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    next(error);
  }
};

const updateTaskStatus = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true, runValidators: true });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = { listTasks, createTask, getTask, updateTask, updateTaskStatus, deleteTask };
