/**
 * Global Business Rules
 * Rules that apply across the entire application
 */

export const globalRules = {
  /**
   * Maximum string length for names
   */
  MAX_NAME_LENGTH: 100,

  /**
   * Maximum string length for descriptions
   */
  MAX_DESCRIPTION_LENGTH: 500,

  /**
   * Minimum password length
   */
  MIN_PASSWORD_LENGTH: 8,

  /**
   * Default pagination limit
   */
  DEFAULT_PAGE_LIMIT: 10,

  /**
   * Maximum pagination limit
   */
  MAX_PAGE_LIMIT: 100,

  /**
   * Validate that a value is within allowed range
   */
  isWithinRange: (value, min, max) => {
    return value >= min && value <= max;
  },

  /**
   * Check if string exceeds max length
   */
  exceedsMaxLength: (str, maxLength) => {
    return str && str.length > maxLength;
  },
};
