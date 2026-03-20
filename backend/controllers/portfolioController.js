import UserPortfolio from "../models/UserPortfolio.js";

// Get all portfolios
export const getAllPortfolios = async (req, res) => {
  try {
    const portfolios = await UserPortfolio.find();
    res.json(portfolios);
  } catch (err) {
    console.error("getAllPortfolios error:", err);
    res.status(500).json({ error: "Server error. Please try again." });
  }
};

// Get a single portfolio by username
export const getPortfolio = async (req, res) => {
  try {
    const portfolio = await UserPortfolio.findOne({
      username: req.params.username.toLowerCase(),
    });

    if (!portfolio) {
      return res.status(404).json({ error: "Portfolio not found" });
    }

    res.json(portfolio);
  } catch (err) {
    console.error("getPortfolio error:", err);
    res.status(500).json({ error: "Server error. Please try again." });
  }
};

// Create a new portfolio
export const createPortfolio = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ error: "Username is required." });
    }

    const existing = await UserPortfolio.findOne({
      username: username.toLowerCase(),
    });

    if (existing) {
      return res.status(409).json({
        error: "Username already taken. Please choose another.",
      });
    }

    // Fixed: ensure username is saved lowercase
    const portfolio = new UserPortfolio({
      ...req.body,
      username: username.toLowerCase(),
    });

    await portfolio.save();

    res.status(201).json({
      message: "Portfolio created successfully",
      portfolio,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ error: messages.join(", ") });
    }

    console.error("createPortfolio error:", err);
    res.status(500).json({ error: "Server error. Please try again." });
  }
};

// Update a portfolio by username
export const updatePortfolio = async (req, res) => {
  try {
    const portfolio = await UserPortfolio.findOneAndUpdate(
      { username: req.params.username.toLowerCase() },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!portfolio) {
      return res.status(404).json({ error: "Portfolio not found" });
    }

    res.json({
      message: "Portfolio updated successfully",
      portfolio,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ error: messages.join(", ") });
    }

    console.error("updatePortfolio error:", err);
    res.status(500).json({ error: "Server error. Please try again." });
  }
};

// Delete a portfolio by username
export const deletePortfolio = async (req, res) => {
  try {
    const portfolio = await UserPortfolio.findOneAndDelete({
      username: req.params.username.toLowerCase(),
    });

    if (!portfolio) {
      return res.status(404).json({ error: "Portfolio not found" });
    }

    res.json({ message: "Portfolio deleted successfully" });
  } catch (err) {
    console.error("deletePortfolio error:", err);
    res.status(500).json({ error: "Server error. Please try again." });
  }
};