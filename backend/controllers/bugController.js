const Bug = require("../models/Bug");

const listBugs = async (req, res, next) => {
  try {
    const { project, status, severity, assignedTo } = req.query;
    const query = {};
    if (project) query.project = project;
    if (status) query.status = status;
    if (severity) query.severity = severity;
    if (assignedTo) query.assignedTo = assignedTo;

    const bugs = await Bug.find(query)
      .populate("project", "name code")
      .populate("task", "title")
      .populate("reportedBy", "name")
      .populate("assignedTo", "name role avatar")
      .sort({ createdAt: -1 });
    res.json(bugs);
  } catch (error) {
    next(error);
  }
};

const createBug = async (req, res, next) => {
  try {
    const bug = await Bug.create({ ...req.body, reportedBy: req.user._id });
    res.status(201).json(await bug.populate(["project", "task", "reportedBy", "assignedTo"]));
  } catch (error) {
    next(error);
  }
};

const getBug = async (req, res, next) => {
  try {
    const bug = await Bug.findById(req.params.id).populate(["project", "task", "reportedBy", "assignedTo"]);
    if (!bug) return res.status(404).json({ message: "Bug not found" });
    res.json(bug);
  } catch (error) {
    next(error);
  }
};

const updateBug = async (req, res, next) => {
  try {
    const bug = await Bug.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!bug) return res.status(404).json({ message: "Bug not found" });
    res.json(bug);
  } catch (error) {
    next(error);
  }
};

const updateBugStatus = async (req, res, next) => {
  try {
    const bug = await Bug.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true, runValidators: true });
    if (!bug) return res.status(404).json({ message: "Bug not found" });
    res.json(bug);
  } catch (error) {
    next(error);
  }
};

const deleteBug = async (req, res, next) => {
  try {
    const bug = await Bug.findByIdAndDelete(req.params.id);
    if (!bug) return res.status(404).json({ message: "Bug not found" });
    res.json({ message: "Bug deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = { listBugs, createBug, getBug, updateBug, updateBugStatus, deleteBug };
