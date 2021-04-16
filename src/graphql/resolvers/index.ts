import merge from "lodash.merge";
import { UserResolvers } from "./User";
import { viewerResolvers } from "./Viewer";
import { listingResolvers } from "./Listing";
import { bookingResolvers } from "./Booking";

export const resolvers = merge(
  viewerResolvers,
  UserResolvers,
  listingResolvers,
  bookingResolvers
);
