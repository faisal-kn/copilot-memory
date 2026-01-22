# Department Table

## Overview

The `departments` table stores information about organizational departments.

## Schema

| Column      | Type           | Constraints      | Description                          |
| ----------- | -------------- | ---------------- | ------------------------------------ |
| id          | UUID           | PRIMARY KEY      | Unique identifier for the department |
| name        | VARCHAR(100)   | NOT NULL, UNIQUE | Department name                      |
| description | TEXT           | NULLABLE         | Department description               |
| budget      | DECIMAL(15, 2) | NULLABLE         | Department budget                    |
| created_at  | TIMESTAMP      | DEFAULT NOW()    | Record creation timestamp            |
| updated_at  | TIMESTAMP      | DEFAULT NOW()    | Record last update timestamp         |

## Indexes

- `idx_departments_name` - Index on name for quick lookups

## Relationships

- Employees reference departments via the `department` field (by name, not FK)

## Example Queries

```sql
-- Get all departments
SELECT * FROM departments ORDER BY name;

-- Get department with employee count
SELECT d.*, COUNT(e.id) as employee_count
FROM departments d
LEFT JOIN employees e ON e.department = d.name
GROUP BY d.id;

-- Get department budget utilization
SELECT d.name, d.budget,
       SUM(e.salary) as total_salaries,
       d.budget - SUM(e.salary) as remaining_budget
FROM departments d
LEFT JOIN employees e ON e.department = d.name
GROUP BY d.id;
```
