import { db } from "../utils/db.server";
import * as UsersService from "../users/users.service";

export const listnotes = async (userUuid: string) => {
  const user = await UsersService.getOneUser(userUuid);

  if (!user) return;

  return await db.notes.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      title: true,
      description: true,
      uuid: true,
      color: true,
      category: true,
      userId: true,
    },
  });
};

export const getTags = async (userUuid: string) => {
  const user = await UsersService.getOneUser(userUuid);

  if (!user) return;

  return await db.notes.findMany({
    where: {
      userId: user.id,
    },
    distinct: ["category"],
    select: {
      category: true,
    },
  });
};

interface UpsertNotePayload {
  category: string;
  title: string;
  description: string;
  color: string;
}

export const createNote = async (
  userUuid: string,
  payload: UpsertNotePayload,
) => {
  let user = await UsersService.getOneUser(userUuid);

  if (!user) {
    user = await UsersService.createUser(userUuid);
  }

  const { color, category, title, description } = payload;

  return await db.notes.create({
    data: {
      title,
      color,
      category,
      description,
      userId: user.id,
    },
  });
};

const findNote = async (uuid: string, userId: number) => {
  return await db.notes.findFirst({
    where: {
      uuid,
      userId,
    },
  });
};

export const updateNote = async (
  userUuid: string,
  payload: UpsertNotePayload,
  noteUuid: string,
) => {
  const user = await UsersService.getOneUser(userUuid);
  if (!user) return;

  const note = await findNote(noteUuid, user.id);
  if (!note) return;

  const { color, category, title, description } = payload;

  return await db.notes.update({
    where: {
      id: note.id,
    },
    data: {
      title,
      color,
      category,
      description,
      userId: user.id,
    },
  });
};

export const deleteNote = async (userUuid: string, noteUuid: string) => {
  const user = await UsersService.getOneUser(userUuid);

  if (!user) return;

  const note = await findNote(noteUuid, user.id);

  if (!note) return;

  return db.notes.delete({
    where: {
      id: note.id,
    },
  });
};
