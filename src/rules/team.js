/**
 * Team Business Rules
 */

export const teamRules = {
  /**
   * Minimum team members
   */
  MIN_MEMBERS: 1,

  /**
   * Maximum team members
   */
  MAX_MEMBERS: 50,

  /**
   * Can team be deleted
   */
  canDelete: (team, memberCount) => {
    if (memberCount > 0) {
      return {
        allowed: false,
        reason:
          "Cannot delete team with existing members. Remove all members first.",
      };
    }
    return { allowed: true };
  },

  /**
   * Can add member to team
   */
  canAddMember: (team, currentMemberCount) => {
    if (currentMemberCount >= teamRules.MAX_MEMBERS) {
      return {
        allowed: false,
        reason: `Team has reached maximum capacity of ${teamRules.MAX_MEMBERS} members`,
      };
    }
    return { allowed: true };
  },

  /**
   * Validate team name
   */
  isValidName: (name) => {
    return name && name.trim().length > 0 && name.length <= 100;
  },
};
