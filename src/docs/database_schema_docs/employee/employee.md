# Employee Table

## Overview

The `employees` table stores information about all employees in the organization.

## Schema

| Column     | Type           | Constraints      | Description                          |
| ---------- | -------------- | ---------------- | ------------------------------------ |
| id         | UUID           | PRIMARY KEY      | Unique identifier for the employee   |
| first_name | VARCHAR(100)   | NOT NULL         | Employee's first name                |
| last_name  | VARCHAR(100)   | NOT NULL         | Employee's last name                 |
| email      | VARCHAR(255)   | NOT NULL, UNIQUE | Employee's email address             |
| phone      | VARCHAR(20)    | NULLABLE         | Employee's phone number              |
| position   | VARCHAR(100)   | NOT NULL         | Job title/position                   |
| department | VARCHAR(100)   | NULLABLE         | Department name                      |
| salary     | DECIMAL(12, 2) | NULLABLE         | Employee's salary                    |
| hire_date  | TIMESTAMP      | DEFAULT NOW()    | Date when employee was hired         |
| is_active  | BOOLEAN        | DEFAULT true     | Whether employee is currently active |
| team_id    | UUID           | FK to teams(id)  | Reference to the team                |
| created_at | TIMESTAMP      | DEFAULT NOW()    | Record creation timestamp            |
| updated_at | TIMESTAMP      | DEFAULT NOW()    | Record last update timestamp         |

## Indexes

- `idx_employees_email` - Index on email for quick lookups
- `idx_employees_team_id` - Index on team_id for team queries
- `idx_employees_department` - Index on department for filtering
- `idx_employees_is_active` - Index on is_active for filtering active employees

## Relationships

- **team**: Many-to-One relationship with `teams` table via `team_id`

## Example Queries

```sql
-- Get all active employees
SELECT * FROM employees WHERE is_active = true;

-- Get employees by department
SELECT * FROM employees WHERE department = 'Engineering';

-- Get employees with their team info
SELECT e.*, t.name as team_name
FROM employees e
LEFT JOIN teams t ON e.team_id = t.id;
```
