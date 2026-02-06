---
description: "Best practices for implementing model SQL queries/mutations"
applyTo: '**/models/**/*.js'
---

## Purpose

Model files contain raw SQL statements for database operations. They are split into two categories: queries (read operations) and mutations (write operations).

## File Structure

Each service must have two model files:

- `queries.js` - Contains all SELECT statements
- `mutations.js` - Contains all INSERT, UPDATE, and DELETE statements

## SQL Query Rules

### Query Structure
- You should use knex's `raw` method to execute raw SQL queries.
- Always use knex query builder for dynamic queries to prevent SQL injection.

### Column Naming

- Use snake_case for all database column names
- Match column names exactly as defined in the database schema

### Pagination

- All list queries must support pagination with `LIMIT` and `OFFSET`
- Include a corresponding count query for each paginated query
- Place `LIMIT` as the second-to-last parameter and `OFFSET` as the last parameter

### Ordering

- Include `ORDER BY` clause for consistent result ordering
- Default to `ORDER BY created_at DESC` for most queries

### Search Queries

- Use `ILIKE` for case-insensitive pattern matching
- Place search parameter before pagination parameters

## Query File Rules

- Export a single object named `<entity>Queries`
- Include `getById`, `getAll`, and `countAll` as minimum required queries
- Add search and filter queries as needed
- Use template literals for multi-line SQL readability

## Mutation File Rules

- Export a single object named `<entity>Mutations`
- Include `create`, `update`, and `delete` as minimum required mutations
- Use `RETURNING *` to return the affected row after INSERT and UPDATE operations
- Use `COALESCE` in UPDATE statements to allow partial updates
- Always update `updated_at = NOW()` on modification operations

## Parameter Ordering Conventions

### For SELECT queries

1. Filter/search parameters first
2. `LIMIT` parameter second-to-last
3. `OFFSET` parameter last

### For UPDATE queries

1. Record ID as first parameter (`$1`)
2. Field values in subsequent parameters
3. Match the order of fields in the SET clause

### For INSERT queries

1. Field values in the order they appear in the column list
2. Match the order of columns in the INSERT statement

## Naming Conventions

| Item            | Convention                         |
| --------------- | ---------------------------------- |
| Query object    | `<entity>Queries` (camelCase)      |
| Mutation object | `<entity>Mutations` (camelCase)    |
| Query keys      | camelCase describing the operation |
| Table names     | snake_case, plural                 |
| Column names    | snake_case                         |

## Checklist

- [ ] All queries use parameterized placeholders
- [ ] No string concatenation for dynamic values
- [ ] List queries include pagination support
- [ ] Count queries exist for paginated queries
- [ ] UPDATE statements use COALESCE for optional fields
- [ ] INSERT and UPDATE use RETURNING \* clause
- [ ] Column names match database schema exactly
