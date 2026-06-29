const express = require("express");
const { listProjects, createProject, getProject, updateProject, deleteProject } = require("../controllers/projectController");
const { protect } = require("../middleware/authMiddleware");
const { authorize, canManageProject } = require("../middleware/roleMiddleware");

const router = express.Router();

router.use(protect);
router.get("/", listProjects);
router.post("/", canManageProject, createProject);
router.get("/:id", getProject);
router.put("/:id", canManageProject, updateProject);
router.delete("/:id", authorize("Super Admin", "Admin"), deleteProject);

module.exports = router;
