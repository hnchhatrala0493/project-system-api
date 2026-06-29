const bcrypt = require("bcrypt");
const User = require("../models/User");

const listUsers = async (req, res, next) => {
  try {
    const { search, role, status } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { name: new RegExp(search, "i") },
        { email: new RegExp(search, "i") },
        { department: new RegExp(search, "i") },
      ];
    }
    if (role) query.role = role;
    if (status) query.status = status;

    const users = await User.find(query).select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const existing = await User.findOne({ email: req.body.email });
    if (existing) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const password = await bcrypt.hash(req.body.password || "ProjectFlow@123", 12);
    const user = await User.create({ ...req.body, password });
    const clean = user.toObject();
    delete clean.password;
    res.status(201).json(clean);
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password").populate("assignedProjects", "name code status");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const payload = { ...req.body };
    if (payload.password) payload.password = await bcrypt.hash(payload.password, 12);
    const user = await User.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true }).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = { listUsers, createUser, getUser, updateUser, deleteUser };
