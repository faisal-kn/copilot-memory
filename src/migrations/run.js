/**
 * Run database migrations
 */
import { db } from "../lib/db.js";
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function runMigrations() {
  console.log("Running migrations...");

  try {
    // Run employee schema migration
    const employeeSql = readFileSync(
      join(__dirname, "sqls/20231010123456_create_employee_schema_up.sql"),
      "utf8",
    );
    await db.query(employeeSql);
    console.log("✅ Employee schema migration complete");

    // Run auth schema migration
    const authSql = readFileSync(
      join(__dirname, "sqls/20231010123457_create_auth_schema_up.sql"),
      "utf8",
    );
    await db.query(authSql);
    console.log("✅ Auth schema migration complete");

    console.log("All migrations completed successfully!");
  } catch (error) {
    console.error("Migration failed:", error.message);
    throw error;
  } finally {
    await db.end();
  }
}

runMigrations();
