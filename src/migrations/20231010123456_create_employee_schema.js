import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const up = async (db) => {
  const sql = readFileSync(
    join(__dirname, "sqls/20231010123456_create_employee_schema_up.sql"),
    "utf8",
  );
  await db.query(sql);
};

export const down = async (db) => {
  const sql = readFileSync(
    join(__dirname, "sqls/20231010123456_create_employee_schema_down.sql"),
    "utf8",
  );
  await db.query(sql);
};
