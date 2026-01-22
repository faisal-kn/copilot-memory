import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import dotenv from "dotenv";

import { typeDefs } from "./schema/index.js";
import { resolvers } from "./schema/resolvers/index.js";
import { createDataLoaders } from "./schema/dataloader/index.js";
import { db } from "./lib/db.js";

dotenv.config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: process.env.PORT || 4000 },
  context: async ({ req }) => {
    return {
      db,
      loaders: createDataLoaders(db),
      // Add auth context here if needed
    };
  },
});

console.log(`🚀 Server ready at ${url}`);
console.log(`📝 GraphQL Playground available at ${url}`);
