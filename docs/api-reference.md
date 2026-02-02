# Employee Team Management API Reference

## API Information

**Version:** v1.1.0

> **Important:** This version must be synchronized with:
>
> - `src/lib/constants.js` (API_VERSION)
> - `src/config/server.js` (SERVER_API_VERSION)

## Overview

This API provides GraphQL endpoints for managing employees, teams, and departments.

## Base URL

```
http://localhost:4000/graphql
```

## Authentication

Currently, the API uses basic authentication. Include the authorization header with your requests.

## Queries

### Get Employee

```graphql
query GetEmployee($id: ID!) {
  employee(id: $id) {
    id
    firstName
    lastName
    email
    department
    team {
      id
      name
    }
  }
}
```

### Get All Employees

```graphql
query GetEmployees($limit: Int, $offset: Int) {
  employees(limit: $limit, offset: $offset) {
    data {
      id
      firstName
      lastName
      email
    }
    pagination {
      total
      limit
      offset
    }
  }
}
```

### Get Team

```graphql
query GetTeam($id: ID!) {
  team(id: $id) {
    id
    name
    description
    members {
      id
      firstName
      lastName
    }
  }
}
```

## Mutations

### Create Employee

```graphql
mutation CreateEmployee($input: CreateEmployeeInput!) {
  createEmployee(input: $input) {
    id
    firstName
    lastName
    email
  }
}
```

### Update Employee

```graphql
mutation UpdateEmployee($id: ID!, $input: UpdateEmployeeInput!) {
  updateEmployee(id: $id, input: $input) {
    id
    firstName
    lastName
    email
  }
}
```

### Delete Employee

```graphql
mutation DeleteEmployee($id: ID!) {
  deleteEmployee(id: $id) {
    success
    message
  }
}
```

## Error Handling

The API returns standard GraphQL errors with the following structure:

```json
{
  "errors": [
    {
      "message": "Error description",
      "extensions": {
        "code": "ERROR_CODE"
      }
    }
  ]
}
```

## Changelog

### v1.1.0

- Version synchronization across configuration files
- Updated API version in documentation

### v1.0.0

- Initial release
- Employee CRUD operations
- Team management
- Department queries
