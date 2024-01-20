import express, { Request, Response } from "express";
import * as NotesService from "./notes.service";

export const notesRouter = express.Router();

notesRouter.get("/", async (req: Request, res: Response) => {
  try {
    const userUuid = req.query.userUuid as string;

    const notes = await NotesService.listnotes(userUuid);

    if (!notes) {
      throw new Error();
    }

    return res.status(200).json(notes);
  } catch (error) {
    return res.status(500).json();
  }
});

notesRouter.get("/tags", async (req: Request, res: Response) => {
  try {
    const userUuid = req.query.userUuid as string;

    const notes = await NotesService.getTags(userUuid);

    if (!notes) {
      throw new Error();
    }

    return res.status(200).json(notes);
  } catch (error) {
    return res.status(500).json();
  }
});

notesRouter.post("/", async (req: Request, res: Response) => {
  try {
    const requestedData = req.body;

    const note = await NotesService.createNote(
      requestedData.userUuid,
      requestedData.payload
    );

    if (!note) throw new Error();

    return res.status(200).json(note);
  } catch (e) {
    return res.status(500).json();
  }
});

notesRouter.put("/", async (req: Request, res: Response) => {
  try {
    const requestedData = req.body;

    const note = await NotesService.updateNote(
      requestedData.userUuid,
      requestedData.payload,
      requestedData.noteUuid
    );

    if (!note) throw new Error();

    return res.status(200).json(note);
  } catch (e) {
    return res.status(500).json();
  }
});

notesRouter.delete("/", async (req: Request, res: Response) => {
  try {
    const requestedData = req.body;

    await NotesService.deleteNote(
      requestedData.userUuid,
      requestedData.noteUuid
    );

    return res.status(200).json();
  } catch (e) {
    return res.status(500).json();
  }
});
