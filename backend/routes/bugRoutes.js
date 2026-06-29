const express = require("express");
const { listBugs, createBug, getBug, updateBug, updateBugStatus, deleteBug } = require("../controllers/bugController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const router = express.Router();

router.use(protect);
router.get("/", listBugs);
router.post("/", authorize("Super Admin", "Admin", "Project Manager", "Team Lead", "Tester", "Developer"), createBug);
router.get("/:id", getBug);
router.put("/:id", authorize("Super Admin", "Admin", "Project Manager", "Team Lead", "Tester", "Developer"), updateBug);
router.delete("/:id", authorize("Super Admin", "Admin", "Project Manager"), deleteBug);
router.patch("/:id/status", authorize("Super Admin", "Admin", "Project Manager", "Team Lead", "Tester", "Developer"), updateBugStatus);

module.exports = router;
