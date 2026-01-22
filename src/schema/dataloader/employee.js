/**
 * Batch load employees by IDs
 * @param {Object} db - Database connection
 * @param {Array<string>} ids - Array of employee IDs
 * @returns {Promise<Array>} Array of employees in the same order as IDs
 */
export async function employeeLoader(db, ids) {
  const query = `
    SELECT * FROM employees 
    WHERE id = ANY($1::uuid[])
  `;

  const result = await db.query(query, [ids]);
  const employeeMap = new Map(result.rows.map((emp) => [emp.id, emp]));

  return ids.map((id) => employeeMap.get(id) || null);
}
