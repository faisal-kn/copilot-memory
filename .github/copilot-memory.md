# Copilot Memory - Project Context

This file contains important context that Copilot should remember when reviewing PRs and making code suggestions.

## Critical Version Synchronization

The following files MUST have matching version numbers. Any PR that modifies one must modify all:

| File                    | Variable             | Current |
| ----------------------- | -------------------- | ------- |
| `src/lib/constants.js`  | `API_VERSION`        | v1.0.0  |
| `src/config/server.js`  | `SERVER_API_VERSION` | v1.0.0  |
| `docs/api-reference.md` | Version header       | v1.0.0  |

**Automated check exists in `src/index.js` that warns on mismatch.**

## Database-to-GraphQL Mapping Pattern

### ALWAYS check mapper files when modifying entities

Each entity has a mapper that converts snake_case DB columns to camelCase GraphQL fields:

- `src/services/employee/lib/mapper.js`
- `src/services/team/lib/mapper.js`
- `src/services/department/lib/mapper.js`

### Mapper Template

```javascript
export function mapEntityRow(row) {
  return {
    // GraphQL fields (camelCase)
    fieldName: row.db_column_name,
    // Keep snake_case for DataLoader compatibility
    foreign_key: row.foreign_key,
  };
}
```

## Query Patterns to Enforce

### Parameterized Queries (REQUIRED)

```javascript
// ✅ CORRECT
db.query("SELECT * FROM employees WHERE id = $1", [id]);

// ❌ NEVER DO THIS (SQL Injection vulnerability)
db.query(`SELECT * FROM employees WHERE id = '${id}'`);
```

### Pagination Pattern

```javascript
// All list queries should use this pattern
const paginationParams = parsePagination(pagination);
const { items, totalCount } = await Service.getAll(db, paginationParams);
return createPaginationResponse(items, totalCount, paginationParams);
```

## Business Rules to Validate in PRs

### Employee Rules

- [ ] Salary validated: 0 ≤ salary ≤ 10,000,000
- [ ] Inactive employees cannot be team leaders
- [ ] Inactive employees cannot be assigned to teams

### Team Rules

- [ ] Max 50 members per team
- [ ] Cannot delete teams with members (must remove members first)
- [ ] Team names max 100 characters

### Global Rules

- [ ] Names max 100 characters
- [ ] Descriptions max 500 characters
- [ ] Pagination: max 100 items/page, default 20

## Common PR Issues to Watch For

1. **Missing `.js` extension in imports** - ES Modules require explicit extensions
2. **DataLoader not used for nested resolvers** - Causes N+1 query issues
3. **Validation missing in mutation controllers** - Always validate in `operations/validate.js`
4. **COALESCE not used for partial updates** - Allows null values to overwrite existing data
5. **Missing `updated_at = NOW()` in UPDATE queries**
6. **Hard-coded pagination limits** - Use constants from `src/lib/constants.js`

## File Ownership Guidelines

| Path Pattern                  | Responsibility              |
| ----------------------------- | --------------------------- |
| `src/schema/*`                | GraphQL types and resolvers |
| `src/services/*/controllers/` | Business logic              |
| `src/services/*/models/`      | Raw SQL queries             |
| `src/services/*/operations/`  | Input validation            |
| `src/services/*/lib/`         | Mappers and utilities       |
| `src/rules/`                  | Business rule definitions   |
| `docs/`                       | API documentation           |

## Migration Guidelines

When adding new database features:

1. Create new migration file: `src/migrations/sqls/YYYYMMDDHHMMSS_description_up.sql`
2. Create rollback file: `src/migrations/sqls/YYYYMMDDHHMMSS_description_down.sql`
3. Add JavaScript migration loader in `src/migrations/`
4. Update documentation in `src/docs/database_schema_docs/`

## Testing Checklist for PRs

- [ ] GraphQL queries return expected shape
- [ ] Mutations validate all required fields
- [ ] Error messages are descriptive
- [ ] Pagination works correctly (first page, last page, out of bounds)
- [ ] DataLoaders cache properly (no duplicate DB calls)
- [ ] Foreign key constraints don't break on delete operations
