const express = require("express");
const { dashboard, projectReport, taskReport, bugReport, userReport } = require("../controllers/reportController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.use(protect);
router.get("/dashboard", dashboard);
router.get("/project", projectReport);
router.get("/tasks", taskReport);
router.get("/bugs", bugReport);
router.get("/users", userReport);

module.exports = router;
