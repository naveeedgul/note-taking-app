import express from "express";
import {
  createNote,
  deleteNote,
  getNotes,
} from "../controllers/noteController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", authenticateToken, createNote);
router.get("/", authenticateToken, getNotes);
router.delete("/:id", authenticateToken, deleteNote);

export default router;
