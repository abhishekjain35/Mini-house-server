import merge from "lodash.merge";
import { UserResolvers } from "./User";
import { viewerResolvers } from "./Viewer";
export const resolvers = merge(viewerResolvers, UserResolvers);
