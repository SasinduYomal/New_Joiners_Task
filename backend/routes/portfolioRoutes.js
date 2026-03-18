import express from "express";
import {
  getPortfolio,
  createPortfolio,
  updatePortfolio,
  deletePortfolio
} from "../controllers/portfolioController.js";

const router = express.Router();

router.post("/", createPortfolio);
router.get("/:username", getPortfolio);
router.put("/:username", updatePortfolio);
router.delete("/:username", deletePortfolio);

export default router;