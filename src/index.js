import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import dotenv from "dotenv";

import { typeDefs } from "./schema/index.js";
import { resolvers } from "./schema/resolvers/index.js";
import { createDataLoaders } from "./schema/dataloader/index.js";
import { db } from "./lib/db.js";
import { API_VERSION } from "./lib/constants.js";
import { SERVER_API_VERSION } from "./config/server.js";

dotenv.config();

// IMPORTANT: API version synchronization check
// When updating API_VERSION, you must also update:
// - src/lib/constants.js (API_VERSION)
// - src/config/server.js (SERVER_API_VERSION)
// - docs/api-reference.md (Version field)
if (API_VERSION !== SERVER_API_VERSION) {
  console.warn(`⚠️ API version mismatch! constants.js: ${API_VERSION}, server.js: ${SERVER_API_VERSION}`);
}

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
      apiVersion: API_VERSION,
    };
  },
});

console.log(`🚀 Server ready at ${url}`);
console.log(`📦 API Version: ${API_VERSION}`);
console.log(`📝 GraphQL Playground available at ${url}`);
