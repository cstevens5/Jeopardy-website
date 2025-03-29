import express from "express";
import Clue from "../models/Clue.js";

const router = express.Router();

// get clue by id
router.get("/clue/:id", async (req, res) => {
  try {
    const clue = await Clue.findOne({ id: req.params.id });
    res.status(200).json(clue);
  } catch (err) {
    console.error("Error retrieving clue: ", err);
    res.status(500);
  }
});

// route to get all clues by game id
router.get("/game/:id", async (req, res) => {
  try {
    const clues = await Clue.find({ game_id: req.params.id });
    res.status(200).json(clues);
  } catch (err) {
    console.error("Error fetching clues: ", err);
    res.status(500);
  }
});

export default router;
