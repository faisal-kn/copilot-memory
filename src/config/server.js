/**
 * Server Configuration
 * Configuration settings for the GraphQL server
 */

// Server API version - must be synchronized with:
// - src/lib/constants.js (API_VERSION)
// - docs/api-reference.md (API documentation version)
export const SERVER_API_VERSION = "v1.0.0";

// Server settings
export const PORT = process.env.PORT || 4000;
export const HOST = process.env.HOST || "localhost";

// GraphQL settings
export const GRAPHQL_PATH = "/graphql";
export const INTROSPECTION_ENABLED = process.env.NODE_ENV !== "production";
export const PLAYGROUND_ENABLED = process.env.NODE_ENV !== "production";

// Rate limiting
export const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
export const RATE_LIMIT_MAX_REQUESTS = 100;

export default {
  SERVER_API_VERSION,
  PORT,
  HOST,
  GRAPHQL_PATH,
  INTROSPECTION_ENABLED,
  PLAYGROUND_ENABLED,
  RATE_LIMIT_WINDOW_MS,
  RATE_LIMIT_MAX_REQUESTS,
};
