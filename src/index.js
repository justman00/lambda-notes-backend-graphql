import { GraphQLServer, PubSub } from "graphql-yoga";
import { fragmentReplacements, resolvers } from "./resolvers/index";
import prisma from "./prisma";

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context(request) {
    return {
      prisma,
      pubsub,
      request
    };
  },
  fragmentReplacements
});

server.start({ port: process.env.PORT || 4000 }, () =>
  console.log("Server is running")
);
