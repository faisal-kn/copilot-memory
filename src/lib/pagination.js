/**
 * Pagination utilities
 */

/**
 * Default pagination values
 */
export const DEFAULT_PAGE = 1;
export const DEFAULT_LIMIT = 10;
export const MAX_LIMIT = 100;

/**
 * Parse pagination parameters
 * @param {Object} params
 * @returns {Object}
 */
export function parsePagination(params = {}) {
  const page = Math.max(1, parseInt(params.page) || DEFAULT_PAGE);
  const limit = Math.min(
    MAX_LIMIT,
    Math.max(1, parseInt(params.limit) || DEFAULT_LIMIT),
  );
  const offset = (page - 1) * limit;

  return { page, limit, offset };
}

/**
 * Create pagination response
 * @param {Array} items
 * @param {number} totalCount
 * @param {Object} pagination
 * @returns {Object}
 */
export function createPaginationResponse(items, totalCount, pagination) {
  const { page, limit } = pagination;
  const totalPages = Math.ceil(totalCount / limit);

  return {
    items,
    pagination: {
      currentPage: page,
      totalPages,
      totalCount,
      limit,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    },
  };
}

/**
 * Build SQL pagination clause
 * @param {Object} pagination
 * @returns {string}
 */
export function buildPaginationClause(pagination) {
  const { limit, offset } = pagination;
  return `LIMIT ${limit} OFFSET ${offset}`;
}
