import { teamQueries } from "../models/queries.js";
import { mapTeamRow } from "../lib/mapper.js";
import { mapEmployeeRow } from "../../employee/lib/mapper.js";

/**
 * Get team by ID
 */
export async function getTeamById(db, id) {
  const result = await db.query(teamQueries.getById, [id]);
  return result.rows[0] ? mapTeamRow(result.rows[0]) : null;
}

/**
 * Get all teams with pagination and search
 */
export async function getAllTeams(db, pagination, search) {
  const { limit, offset } = pagination;

  let query = teamQueries.getAll;
  let countQuery = teamQueries.countAll;
  const params = [limit, offset];
  const countParams = [];

  if (search) {
    query = teamQueries.search;
    countQuery = teamQueries.countSearch;
    const searchPattern = `%${search}%`;
    params.unshift(searchPattern);
    countParams.push(searchPattern);
  }

  const [itemsResult, countResult] = await Promise.all([
    db.query(query, params),
    db.query(countQuery, countParams),
  ]);

  return {
    items: itemsResult.rows.map(mapTeamRow),
    totalCount: parseInt(countResult.rows[0].count, 10),
  };
}

/**
 * Get team members
 */
export async function getTeamMembers(db, teamId) {
  const result = await db.query(teamQueries.getMembers, [teamId]);
  return result.rows.map(mapEmployeeRow);
}

/**
 * Get team member count
 */
export async function getTeamMemberCount(db, teamId) {
  const result = await db.query(teamQueries.countMembers, [teamId]);
  return parseInt(result.rows[0].count, 10);
}
