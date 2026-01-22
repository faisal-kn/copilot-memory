-- Drop indexes
DROP INDEX IF EXISTS idx_employees_email;

DROP INDEX IF EXISTS idx_employees_team_id;

DROP INDEX IF EXISTS idx_employees_department;

DROP INDEX IF EXISTS idx_employees_is_active;

DROP INDEX IF EXISTS idx_teams_name;

DROP INDEX IF EXISTS idx_departments_name;

-- Drop foreign key constraints
ALTER TABLE employees
DROP CONSTRAINT IF EXISTS fk_employee_team;

ALTER TABLE teams
DROP CONSTRAINT IF EXISTS fk_team_leader;

-- Drop tables
DROP TABLE IF EXISTS departments;

DROP TABLE IF EXISTS teams;

DROP TABLE IF EXISTS employees;