import express from "express";
import protect from "../middleware/authMiddleware.js";

import {
  getProfile,
  updateProfile,
  changePassword,
} from "../controllers/userController.js";

const router = express.Router();

router.use(protect);

router.get("/profile", getProfile);

router.put("/profile", updateProfile);

router.put("/change-password", changePassword);

export default router;