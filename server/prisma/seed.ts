import { randomUUID } from "crypto";
import { db } from "../src/utils/db.server";

type User = {
  uuid: string;
  name: string;
};

type Notes = {
  category?: string;
  title: string;
  description?: string;
  color: string;
};

const getUsers = (): User[] => {
  return [
    {
      uuid: randomUUID(),
      name: "John Doe",
    },
    {
      uuid: randomUUID(),
      name: "Sally Craig",
    },
  ];
};

const getNotes = (): Notes[] => {
  return [
    {
      title: "Daily task",
      description: "Not anything today",
      color: "#042109",
      category: "todo",
    },
    {
      title: "Grocery Stuff",
      description: "Carrot, tomato, potato",
      color: "#0421f9",
      category: "buy",
    },
  ];
};

const seed = async () => {
  await Promise.all(
    getUsers().map((user) => {
      return db.user.create({
        data: {
          uuid: user.uuid,
          name: user.name,
        },
      });
    }),
  );
  const user = await db.user.findFirst({
    where: {
      name: "John Doe",
    },
  });

  await Promise.all(
    getNotes().map((note) => {
      if (!user) return;

      return db.notes.create({
        data: {
          title: note.title,
          description: note.description,
          color: note.color,
          category: note.category,
          userId: user.id,
        },
      });
    }),
  );
};

seed();
