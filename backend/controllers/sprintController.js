const Sprint = require("../models/Sprint");

const listSprints = async (req, res, next) => {
  try {
    const query = req.query.project ? { project: req.query.project } : {};
    const sprints = await Sprint.find(query).populate("project", "name code").populate("tasks", "title status priority");
    res.json(sprints);
  } catch (error) {
    next(error);
  }
};

const createSprint = async (req, res, next) => {
  try {
    const sprint = await Sprint.create(req.body);
    res.status(201).json(await sprint.populate(["project", "tasks"]));
  } catch (error) {
    next(error);
  }
};

const updateSprint = async (req, res, next) => {
  try {
    const sprint = await Sprint.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!sprint) return res.status(404).json({ message: "Sprint not found" });
    res.json(sprint);
  } catch (error) {
    next(error);
  }
};

const deleteSprint = async (req, res, next) => {
  try {
    const sprint = await Sprint.findByIdAndDelete(req.params.id);
    if (!sprint) return res.status(404).json({ message: "Sprint not found" });
    res.json({ message: "Sprint deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = { listSprints, createSprint, updateSprint, deleteSprint };
