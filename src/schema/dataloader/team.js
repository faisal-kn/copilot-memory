/**
 * Batch load teams by IDs
 * @param {Object} db - Database connection
 * @param {Array<string>} ids - Array of team IDs
 * @returns {Promise<Array>} Array of teams in the same order as IDs
 */
export async function teamLoader(db, ids) {
  const query = `
    SELECT * FROM teams 
    WHERE id = ANY($1::uuid[])
  `;

  const result = await db.query(query, [ids]);
  const teamMap = new Map(result.rows.map((team) => [team.id, team]));

  return ids.map((id) => teamMap.get(id) || null);
}
