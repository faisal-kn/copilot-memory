# GitHub Copilot Instructions for Employee Team Management API

This document provides context and guidelines for GitHub Copilot when working with this codebase.

## Project Overview

This is a **GraphQL API** for Employee Team Management built with:

- **Node.js 22** (ES Modules)
- **Apollo Server 4** for GraphQL
- **PostgreSQL** with raw SQL via Knex
- **DataLoader** for N+1 query optimization

## Architecture Patterns

### Service Layer Pattern

Each domain entity follows this structure:

```
src/services/<entity>/
├── index.js           # Service exports
├── controllers/
│   ├── get.js         # Read operations
│   └── mutate.js      # Create/Update/Delete operations
├── lib/
│   └── mapper.js      # DB row to GraphQL type mapping
├── models/
│   ├── queries.js     # SQL SELECT queries
│   └── mutations.js   # SQL INSERT/UPDATE/DELETE
├── operations/
│   └── validate.js    # Input validation
└── rpc/
    └── index.js       # RPC handlers
```

### Naming Conventions

#### Database (snake_case)

- Tables: `employees`, `teams`, `departments`
- Columns: `first_name`, `last_name`, `team_id`, `created_at`

#### JavaScript/GraphQL (camelCase)

- Variables: `firstName`, `lastName`, `teamId`
- Functions: `getEmployeeById`, `createEmployee`

#### Mapper Functions

Always map between DB snake_case and JS camelCase in `lib/mapper.js`:

```javascript
return {
  firstName: row.first_name,
  teamId: row.team_id,
  team_id: row.team_id, // Keep for dataloader compatibility
};
```

## Key Files to Sync

When changing API versions, update ALL of these:

1. `src/lib/constants.js` - `API_VERSION`
2. `src/config/server.js` - `SERVER_API_VERSION`
3. `docs/api-reference.md` - Version header

## Code Standards

### Imports

- Use ES Module syntax (`import`/`export`)
- Always include `.js` extension in relative imports
- Use named exports for services and utilities

### Database Queries

- Use parameterized queries with `$1, $2` placeholders
- Always sanitize input before queries
- Use `COALESCE` for partial updates
- Include `created_at` and `updated_at` timestamps

### GraphQL Resolvers

- Use DataLoaders for nested entity resolution
- Apply pagination for list queries using `parsePagination`
- Return proper response shapes with `createPaginationResponse`

### Validation

- Validate in `operations/validate.js` files
- Throw descriptive error messages
- Use utility functions from `src/lib/utils.js`

## Business Rules

### Employee Rules (src/rules/employee.js)

- Salary range: 0 - 10,000,000
- Inactive employees cannot be team leaders
- Inactive employees cannot be assigned to teams

### Team Rules (src/rules/team.js)

- Max 50 members per team
- Cannot delete teams with existing members
- Team names max 100 characters

### Global Rules (src/rules/global.js)

- Max name length: 100 characters
- Max description length: 500 characters
- Pagination: max 100 items per page, default 10

## Testing Guidelines

When adding new features:

1. Add appropriate SQL migrations in `src/migrations/sqls/`
2. Update schema in `src/schema/index.js`
3. Add resolvers in `src/schema/resolvers/`
4. Create service layer following existing pattern
5. Add validation rules
6. Update documentation in `docs/`

## PR Review Checklist

- [ ] Database column names use snake_case
- [ ] JS/GraphQL uses camelCase
- [ ] Mapper functions properly convert between formats
- [ ] Parameterized queries used (no string concatenation)
- [ ] Pagination applied for list queries
- [ ] Validation exists for mutations
- [ ] API version synced across all required files
- [ ] DataLoaders used for nested entity resolution
- [ ] Proper error handling with descriptive messages
