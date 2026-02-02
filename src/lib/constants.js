/**
 * Application Constants
 * Central location for shared constants
 */

// API version - must be synchronized with:
// - src/config/server.js (SERVER_API_VERSION)
// - docs/api-reference.md (API documentation version)
export const API_VERSION = "v1.1.0";

// Database schema version
export const DB_SCHEMA_VERSION = "v1.0.0";

// Pagination defaults
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// Cache TTL (in seconds)
export const CACHE_TTL = 300;

export default {
  API_VERSION,
  DB_SCHEMA_VERSION,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  CACHE_TTL,
};
