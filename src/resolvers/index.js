import Query from "./Query";
import Mutation from "./Mutation";
import User from "./User";
import Subscription from "./Subscription";
import { extractFragmentReplacements } from "prisma-binding";

const resolvers = {
  Query,
  Mutation, //Subscription,
  User
};

const fragmentReplacements = extractFragmentReplacements(resolvers);

export { fragmentReplacements, resolvers };
