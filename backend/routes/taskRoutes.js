const express = require("express");
const { listTasks, createTask, getTask, updateTask, updateTaskStatus, deleteTask } = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");
const { authorize, canManageProject } = require("../middleware/roleMiddleware");

const router = express.Router();

router.use(protect);
router.get("/", listTasks);
router.post("/", canManageProject, createTask);
router.get("/:id", getTask);
router.put("/:id", authorize("Super Admin", "Admin", "Project Manager", "Team Lead", "Developer", "Tester"), updateTask);
router.delete("/:id", canManageProject, deleteTask);
router.patch("/:id/status", authorize("Super Admin", "Admin", "Project Manager", "Team Lead", "Developer", "Tester"), updateTaskStatus);

module.exports = router;
