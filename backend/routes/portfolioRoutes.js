import express from "express";
import {
  getAllPortfolios,
  getPortfolio,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
} from "../controllers/portfolioController.js";

const router = express.Router();

// GET /api/portfolios         — get all portfolios
router.get("/", getAllPortfolios);

// GET /api/portfolios/:username — get one by username
router.get("/:username", getPortfolio);

// POST /api/portfolios        — create new portfolio
router.post("/", createPortfolio);

// PUT /api/portfolios/:username — update by username
router.put("/:username", updatePortfolio);

// DELETE /api/portfolios/:username — delete by username
router.delete("/:username", deletePortfolio);

export default router;