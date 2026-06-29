const express = require("express");
const { listUsers, createUser, getUser, updateUser, deleteUser } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const { authorize } = require("../middleware/roleMiddleware");

const router = express.Router();

router.use(protect);
router.get("/", authorize("Super Admin", "Admin", "Project Manager", "Team Lead"), listUsers);
router.post("/", authorize("Super Admin", "Admin"), createUser);
router.get("/:id", authorize("Super Admin", "Admin", "Project Manager", "Team Lead"), getUser);
router.put("/:id", authorize("Super Admin", "Admin"), updateUser);
router.delete("/:id", authorize("Super Admin"), deleteUser);

module.exports = router;
