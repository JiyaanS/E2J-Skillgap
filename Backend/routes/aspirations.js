const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");
const {
  getUserAspirations,
  createAspirations,
} = require("../controller/aspirationController");

router.use(authMiddleware);

router.get("/me", getUserAspirations);
router.post("/", createAspirations);
// Removed certifications update endpoint

module.exports = router;
