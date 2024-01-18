import { db } from "../utils/db.server";

export const getOneUser = async (uuid: string) => {
  return db.user.findFirst({
    where: {
      uuid,
    },
  });
};
