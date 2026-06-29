const express = require("express");
const { listSprints, createSprint, updateSprint, deleteSprint } = require("../controllers/sprintController");
const { protect } = require("../middleware/authMiddleware");
const { canManageProject } = require("../middleware/roleMiddleware");

const router = express.Router();

router.use(protect);
router.get("/", listSprints);
router.post("/", canManageProject, createSprint);
router.put("/:id", canManageProject, updateSprint);
router.delete("/:id", canManageProject, deleteSprint);

module.exports = router;
