# Employee Team Management GraphQL API

A Node.js GraphQL API for managing employees, teams, and departments.

## Tech Stack

- **Runtime:** Node.js 22 (see `.nvmrc`)
- **API:** Apollo Server 4 (GraphQL)
- **Database:** PostgreSQL with Knex
- **Optimization:** DataLoader for N+1 query prevention

## Quick Start

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Run database migrations
npm run db:migrate

# Seed database (optional)
npm run db:seed

# Start development server
npm run dev
```

## Available Scripts

| Command              | Description                              |
| -------------------- | ---------------------------------------- |
| `npm start`          | Start production server                  |
| `npm run dev`        | Start development server with watch mode |
| `npm run db:migrate` | Run database migrations                  |
| `npm run db:seed`    | Seed database with sample data           |
| `npm run db:setup`   | Run migrations and seed data             |

## Project Structure

```
src/
├── config/          # Server configuration
├── dbFunctions/     # Database function helpers
├── docs/            # Database schema documentation
├── lib/             # Shared utilities and constants
├── migrations/      # Database migrations
├── rules/           # Business rules
├── schema/          # GraphQL schema, resolvers, dataloaders
└── services/        # Domain services (employee, team, department)
```

## API Documentation

See [docs/api-reference.md](docs/api-reference.md) for full API documentation.

## Environment Variables

| Variable                   | Description                          | Default       |
| -------------------------- | ------------------------------------ | ------------- |
| `HOST`                     | Server host                          | `localhost`   |
| `PORT`                     | Server port                          | `4000`        |
| `DATABASE_URL`             | PostgreSQL connection string         | -             |
| `NODE_ENV`                 | Environment (development/production) | `development` |

## Version Sync

When updating API version, ensure these files are synchronized:

- `src/lib/constants.js` (API_VERSION)
- `src/config/server.js` (SERVER_API_VERSION)
- `docs/api-reference.md` (Version header)

## License

MIT
