import { employeeQueries } from "../models/queries.js";
import { mapEmployeeRow } from "../lib/mapper.js";

/**
 * Get employee by ID
 */
export async function getEmployeeById(db, id) {
  const result = await db.query(employeeQueries.getById, [id]);
  return result.rows[0] ? mapEmployeeRow(result.rows[0]) : null;
}

/**
 * Get all employees with pagination and search
 */
export async function getAllEmployees(db, pagination, search) {
  const { limit, offset } = pagination;

  let query = employeeQueries.getAll;
  let countQuery = employeeQueries.countAll;
  const params = [limit, offset];
  const countParams = [];

  if (search) {
    query = employeeQueries.search;
    countQuery = employeeQueries.countSearch;
    const searchPattern = `%${search}%`;
    params.unshift(searchPattern);
    countParams.push(searchPattern);
  }

  const [itemsResult, countResult] = await Promise.all([
    db.query(query, params),
    db.query(countQuery, countParams),
  ]);

  return {
    items: itemsResult.rows.map(mapEmployeeRow),
    totalCount: parseInt(countResult.rows[0].count, 10),
  };
}

/**
 * Get employees by team
 */
export async function getEmployeesByTeam(db, teamId, pagination) {
  const { limit, offset } = pagination;

  const [itemsResult, countResult] = await Promise.all([
    db.query(employeeQueries.getByTeam, [teamId, limit, offset]),
    db.query(employeeQueries.countByTeam, [teamId]),
  ]);

  return {
    items: itemsResult.rows.map(mapEmployeeRow),
    totalCount: parseInt(countResult.rows[0].count, 10),
  };
}

/**
 * Get employees by department
 */
export async function getEmployeesByDepartment(db, department, pagination) {
  const { limit, offset } = pagination;

  const [itemsResult, countResult] = await Promise.all([
    db.query(employeeQueries.getByDepartment, [department, limit, offset]),
    db.query(employeeQueries.countByDepartment, [department]),
  ]);

  return {
    items: itemsResult.rows.map(mapEmployeeRow),
    totalCount: parseInt(countResult.rows[0].count, 10),
  };
}

/**
 * Get employee statistics
 */
export async function getEmployeeStats(db) {
  const result = await db.query(employeeQueries.getStats);
  const stats = result.rows[0];

  return {
    totalEmployees: parseInt(stats.total_employees, 10),
    activeEmployees: parseInt(stats.active_employees, 10),
    totalTeams: parseInt(stats.total_teams, 10),
    averageSalary: parseFloat(stats.average_salary) || null,
  };
}
