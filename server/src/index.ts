import cors from "cors";
import express from "express";
import * as dotenv from "dotenv";
import { notesRouter } from "./notes/notes.router";

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/notes", notesRouter);

app.listen(+process.env.PORT, () => {
  console.log("listening at PORT", process.env.PORT);
});
