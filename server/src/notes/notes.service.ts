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
    },
  });
};
