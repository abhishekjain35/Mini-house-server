import { IResolvers } from "apollo-server-express";
import { UserArgs } from "./types";
import { Database, User } from "../../../lib/types";

export const UserResolvers: IResolvers = {
  Query: {
    user: async (
      _root: undefined,
      { id }: UserArgs,
      { db }: { db: Database }
    ): Promise<User> => {
      try {
        const user = await db.users.findOne({ _id: id });
        if (!user) {
          throw new Error("User can't be found");
        }
        return user;
      } catch (err) {
        throw new Error(`Failed to query user: ${err}`);
      }
    },
  },
};
