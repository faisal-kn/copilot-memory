import knex from "knex";
import dotenv from "dotenv";

dotenv.config();

// Single Knex instance for all database operations
export const knexDb = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  },
  pool: {
    min: 2,
    max: 10,
    acquireTimeoutMillis: 30000,
    idleTimeoutMillis: 30000,
  },
});

// Legacy db interface for backward compatibility
// Wraps knexDb.raw() to provide db.query() interface
export const db = {
  query: async (text, params = []) => {
    const result = await knexDb.raw(text, params);
    return { rows: result.rows || result };
  },
};

// API version for database schema compatibility
export const DB_API_VERSION = "v1.0.0";

// Test database connection
knexDb
  .raw("SELECT NOW()")
  .then(() => console.log("✅ Database connected successfully"))
  .catch((err) => console.error("❌ Database connection error:", err.message));

export default db;
