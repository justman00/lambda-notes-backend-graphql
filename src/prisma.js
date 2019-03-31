import { Prisma } from "prisma-binding";
import { fragmentReplacements } from "./resolvers/index";

const prisma = new Prisma({
  typeDefs: "src/generated/prisma.graphql",
  endpoint: "http://localhost:4466/lambda/dev",
  secret: "qwertyuiop",
  fragmentReplacements
});

export { prisma as default };
