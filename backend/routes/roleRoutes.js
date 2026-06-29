const express = require("express");
const { listRoles, createRole, updateRole, deleteRole } = require("../controllers/roleController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const router = express.Router();

router.use(protect);
router.get("/", authorize("Super Admin", "Admin"), listRoles);
router.post("/", authorize("Super Admin"), createRole);
router.put("/:id", authorize("Super Admin"), updateRole);
router.delete("/:id", authorize("Super Admin"), deleteRole);

module.exports = router;
