/**
 * Authentication Business Rules
 */

export const authRules = {
  /**
   * Session timeout in milliseconds (24 hours)
   */
  SESSION_TIMEOUT: 24 * 60 * 60 * 1000,

  /**
   * Token expiry in seconds (1 hour)
   */
  TOKEN_EXPIRY: 60 * 60,

  /**
   * Refresh token expiry in seconds (7 days)
   */
  REFRESH_TOKEN_EXPIRY: 7 * 24 * 60 * 60,

  /**
   * Maximum login attempts before lockout
   */
  MAX_LOGIN_ATTEMPTS: 5,

  /**
   * Lockout duration in milliseconds (15 minutes)
   */
  LOCKOUT_DURATION: 15 * 60 * 1000,

  /**
   * Check if user is locked out
   */
  isLockedOut: (loginAttempts, lastAttemptTime) => {
    if (loginAttempts < authRules.MAX_LOGIN_ATTEMPTS) {
      return false;
    }
    const timeSinceLastAttempt =
      Date.now() - new Date(lastAttemptTime).getTime();
    return timeSinceLastAttempt < authRules.LOCKOUT_DURATION;
  },

  /**
   * Password requirements
   */
  passwordRequirements: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumber: true,
    requireSpecialChar: true,
  },

  /**
   * Validate password strength
   */
  isStrongPassword: (password) => {
    const {
      minLength,
      requireUppercase,
      requireLowercase,
      requireNumber,
      requireSpecialChar,
    } = authRules.passwordRequirements;

    if (password.length < minLength) return false;
    if (requireUppercase && !/[A-Z]/.test(password)) return false;
    if (requireLowercase && !/[a-z]/.test(password)) return false;
    if (requireNumber && !/[0-9]/.test(password)) return false;
    if (requireSpecialChar && !/[!@#$%^&*(),.?":{}|<>]/.test(password))
      return false;

    return true;
  },
};
