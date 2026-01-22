/**
 * Utility functions for the application
 */

/**
 * Format date to ISO string
 * @param {Date} date
 * @returns {string}
 */
export function formatDate(date) {
  return date ? new Date(date).toISOString() : null;
}

/**
 * Generate a unique ID
 * @returns {string}
 */
export function generateId() {
  return crypto.randomUUID();
}

/**
 * Validate email format
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Sanitize input string
 * @param {string} str
 * @returns {string}
 */
export function sanitizeString(str) {
  if (!str) return "";
  return str.trim().replace(/[<>]/g, "");
}

/**
 * Check if value is empty
 * @param {any} value
 * @returns {boolean}
 */
export function isEmpty(value) {
  if (value === null || value === undefined) return true;
  if (typeof value === "string") return value.trim() === "";
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object") return Object.keys(value).length === 0;
  return false;
}

/**
 * Handle async errors
 * @param {Function} fn
 * @returns {Function}
 */
export function asyncHandler(fn) {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (error) {
      console.error("Error:", error.message);
      throw error;
    }
  };
}
