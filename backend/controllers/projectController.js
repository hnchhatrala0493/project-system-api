const Project = require("../models/Project");
const Task = require("../models/Task");
const { ADMIN_ROLES } = require("../middleware/roleMiddleware");

const projectAccessQuery = (user) => {
  if (ADMIN_ROLES.includes(user.role)) return {};
  if (user.role === "Client") return { clientName: new RegExp(user.name, "i") };
  return { teamMembers: user._id };
};

const listProjects = async (req, res, next) => {
  try {
    const { search, status, priority } = req.query;
    const query = projectAccessQuery(req.user);
    if (search) query.$or = [{ name: new RegExp(search, "i") }, { code: new RegExp(search, "i") }, { clientName: new RegExp(search, "i") }];
    if (status) query.status = status;
    if (priority) query.priority = priority;

    const projects = await Project.find(query)
      .populate("teamMembers", "name role avatar")
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    next(error);
  }
};

const createProject = async (req, res, next) => {
  try {
    const project = await Project.create({ ...req.body, createdBy: req.user._id });
    res.status(201).json(await project.populate("teamMembers", "name role avatar"));
  } catch (error) {
    next(error);
  }
};

const getProject = async (req, res, next) => {
  try {
    const project = await Project.findOne({ _id: req.params.id, ...projectAccessQuery(req.user) })
      .populate("teamMembers", "name role avatar email")
      .populate("createdBy", "name");
    if (!project) return res.status(404).json({ message: "Project not found" });

    const tasks = await Task.find({ project: project._id }).populate("assignedTo", "name role");
    res.json({ project, tasks });
  } catch (error) {
    next(error);
  }
};

const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate("teamMembers", "name role avatar");
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (error) {
    next(error);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    await Task.deleteMany({ project: project._id });
    res.json({ message: "Project and related tasks deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = { listProjects, createProject, getProject, updateProject, deleteProject };
