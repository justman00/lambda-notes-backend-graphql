import Query from "./Query";
import Mutation from "./Mutation";
import User from "./User";
import Subscription from "./Subscription";
import Note from "./Note";
import { extractFragmentReplacements } from "prisma-binding";

const resolvers = {
  Query,
  Mutation, //Subscription,
  User,
  Note
};

const fragmentReplacements = extractFragmentReplacements(resolvers);

export { fragmentReplacements, resolvers };
