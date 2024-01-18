import express, { Request, Response } from "express";
import * as NotesService from "./notes.service";

export const notesRouter = express.Router();

notesRouter.get("/", async (req: Request, res: Response) => {
  try {
    const requestedData = req.body;

    const notes = await NotesService.listnotes(requestedData.userUuid);

    if (!notes) {
      throw new Error();
    }

    return res.status(200).json(notes);
  } catch (error) {
    return res.status(500).json();
  }
});
