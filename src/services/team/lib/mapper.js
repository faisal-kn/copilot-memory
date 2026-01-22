/**
 * Map database row to Team GraphQL type
 * @param {Object} row - Database row
 * @returns {Object} Mapped team object
 */
export function mapTeamRow(row) {
  if (!row) return null;

  return {
    id: row.id,
    name: row.name,
    description: row.description,
    leaderId: row.leader_id,
    leader_id: row.leader_id, // Keep for dataloader
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
