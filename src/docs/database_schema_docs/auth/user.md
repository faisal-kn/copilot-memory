# User Table

## Overview

The `users` table stores authentication information for system users.

## Schema

| Column            | Type         | Constraints                  | Description                          |
| ----------------- | ------------ | ---------------------------- | ------------------------------------ |
| id                | UUID         | PRIMARY KEY                  | Unique identifier for the user       |
| email             | VARCHAR(255) | NOT NULL, UNIQUE             | User's email address                 |
| password_hash     | VARCHAR(255) | NOT NULL                     | Hashed password                      |
| role              | VARCHAR(50)  | NOT NULL, DEFAULT 'employee' | User role (admin, manager, employee) |
| is_active         | BOOLEAN      | DEFAULT true                 | Whether user account is active       |
| last_login        | TIMESTAMP    | NULLABLE                     | Last login timestamp                 |
| login_attempts    | INTEGER      | DEFAULT 0                    | Failed login attempt count           |
| last_attempt_time | TIMESTAMP    | NULLABLE                     | Last login attempt timestamp         |
| created_at        | TIMESTAMP    | DEFAULT NOW()                | Record creation timestamp            |
| updated_at        | TIMESTAMP    | DEFAULT NOW()                | Record last update timestamp         |

## Indexes

- `idx_users_email` - Index on email for login lookups
- `idx_users_role` - Index on role for filtering

## Related Tables

### user_permissions

| Column     | Type         | Constraints     | Description               |
| ---------- | ------------ | --------------- | ------------------------- |
| id         | UUID         | PRIMARY KEY     | Unique identifier         |
| user_id    | UUID         | FK to users(id) | Reference to user         |
| permission | VARCHAR(100) | NOT NULL        | Permission name           |
| created_at | TIMESTAMP    | DEFAULT NOW()   | Record creation timestamp |

### refresh_tokens

| Column     | Type         | Constraints      | Description               |
| ---------- | ------------ | ---------------- | ------------------------- |
| id         | UUID         | PRIMARY KEY      | Unique identifier         |
| user_id    | UUID         | FK to users(id)  | Reference to user         |
| token      | VARCHAR(500) | NOT NULL, UNIQUE | Refresh token             |
| expires_at | TIMESTAMP    | NOT NULL         | Token expiration          |
| created_at | TIMESTAMP    | DEFAULT NOW()    | Record creation timestamp |

## Example Queries

```sql
-- Get user with permissions
SELECT u.*, array_agg(up.permission) as permissions
FROM users u
LEFT JOIN user_permissions up ON u.id = up.user_id
WHERE u.email = 'user@example.com'
GROUP BY u.id;

-- Check for locked out users
SELECT * FROM users
WHERE login_attempts >= 5
AND last_attempt_time > NOW() - INTERVAL '15 minutes';
```
