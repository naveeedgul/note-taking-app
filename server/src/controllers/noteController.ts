import { Request, Response } from "express";
import Note from "../models/note";

export const createNote = async (req: Request, res: Response) => {
  const { content } = req.body;
  const userId = (req as any).user.id;
  try {
    const note = await Note.create({ userId, content });
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ message: "Error creating note" });
  }
};

export const getNotes = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  try {
    const notes = await Note.find({ userId }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching notes" });
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const noteId = req.params.id;
  try {
    const note = await Note.findOneAndDelete({ _id: noteId, userId });
    if (!note) return res.status(404).json({ message: "Note not found" });
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting note" });
  }
};
