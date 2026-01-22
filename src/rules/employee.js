/**
 * Employee Business Rules
 */

export const employeeRules = {
  /**
   * Minimum salary
   */
  MIN_SALARY: 0,

  /**
   * Maximum salary (for validation)
   */
  MAX_SALARY: 10000000,

  /**
   * Maximum team size
   */
  MAX_TEAM_SIZE: 50,

  /**
   * Can employee be assigned to team
   */
  canAssignToTeam: (employee, team) => {
    if (!employee.isActive) {
      return {
        allowed: false,
        reason: "Inactive employees cannot be assigned to teams",
      };
    }
    return { allowed: true };
  },

  /**
   * Can employee be promoted to leader
   */
  canBeLeader: (employee) => {
    if (!employee.isActive) {
      return {
        allowed: false,
        reason: "Inactive employees cannot be team leaders",
      };
    }
    return { allowed: true };
  },

  /**
   * Validate salary
   */
  isValidSalary: (salary) => {
    return (
      salary >= employeeRules.MIN_SALARY && salary <= employeeRules.MAX_SALARY
    );
  },
};
