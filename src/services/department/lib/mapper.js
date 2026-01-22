/**
 * Map database row to Department GraphQL type
 * @param {Object} row - Database row
 * @returns {Object} Mapped department object
 */
export function mapDepartmentRow(row) {
  if (!row) return null;

  return {
    id: row.id,
    name: row.name,
    description: row.description,
    budget: row.budget ? parseFloat(row.budget) : null,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
