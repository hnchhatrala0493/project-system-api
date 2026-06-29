const Role = require("../models/Role");

const listRoles = async (req, res, next) => {
  try {
    res.json(await Role.find().sort({ name: 1 }));
  } catch (error) {
    next(error);
  }
};

const createRole = async (req, res, next) => {
  try {
    res.status(201).json(await Role.create(req.body));
  } catch (error) {
    next(error);
  }
};

const updateRole = async (req, res, next) => {
  try {
    const role = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!role) return res.status(404).json({ message: "Role not found" });
    res.json(role);
  } catch (error) {
    next(error);
  }
};

const deleteRole = async (req, res, next) => {
  try {
    const role = await Role.findByIdAndDelete(req.params.id);
    if (!role) return res.status(404).json({ message: "Role not found" });
    res.json({ message: "Role deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = { listRoles, createRole, updateRole, deleteRole };
