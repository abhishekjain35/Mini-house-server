import { IResolvers } from "apollo-server-express";
import { ObjectId } from "mongodb";
import { Listing, Database } from "../../../lib/types";
import { ListingArgs } from "./types";

export const listingResolvers: IResolvers = {
  Query: {
    listing: async (
      _root: undefined,
      { id }: ListingArgs,
      { db }: { db: Database }
    ): Promise<Listing> => {
      try {
        const res = await db.listings.findOne({ _id: new ObjectId(id) });

        if (!res) {
          throw new Error("listing can't be found");
        }

        return res;
      } catch (error) {
        throw new Error(`Failed to query listing: ${error}`);
      }
    },
  },
  Listing: {
    id: (listing: Listing): string => {
      return listing._id.toString();
    },
  },
};
