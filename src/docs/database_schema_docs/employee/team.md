# Team Table

## Overview

The `teams` table stores information about teams within the organization.

## Schema

| Column      | Type         | Constraints         | Description                    |
| ----------- | ------------ | ------------------- | ------------------------------ |
| id          | UUID         | PRIMARY KEY         | Unique identifier for the team |
| name        | VARCHAR(100) | NOT NULL            | Team name                      |
| description | TEXT         | NULLABLE            | Team description               |
| leader_id   | UUID         | FK to employees(id) | Reference to the team leader   |
| created_at  | TIMESTAMP    | DEFAULT NOW()       | Record creation timestamp      |
| updated_at  | TIMESTAMP    | DEFAULT NOW()       | Record last update timestamp   |

## Indexes

- `idx_teams_name` - Index on name for quick lookups

## Relationships

- **leader**: One-to-One relationship with `employees` table via `leader_id`
- **members**: One-to-Many relationship with `employees` table (employees reference teams)

## Example Queries

```sql
-- Get all teams with member count
SELECT t.*, COUNT(e.id) as member_count
FROM teams t
LEFT JOIN employees e ON e.team_id = t.id
GROUP BY t.id;

-- Get team with leader details
SELECT t.*,
       l.first_name as leader_first_name,
       l.last_name as leader_last_name
FROM teams t
LEFT JOIN employees l ON t.leader_id = l.id;

-- Get team members
SELECT e.* FROM employees e
WHERE e.team_id = 'team-uuid-here';
```
