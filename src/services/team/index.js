import {
  getTeamById,
  getAllTeams,
  getTeamMembers,
  getTeamMemberCount,
} from "./controllers/get.js";
import {
  createTeam,
  updateTeam,
  deleteTeam,
  addMember,
  removeMember,
} from "./controllers/mutate.js";

export const TeamService = {
  // Queries
  getById: getTeamById,
  getAll: getAllTeams,
  getMembers: getTeamMembers,
  getMemberCount: getTeamMemberCount,

  // Mutations
  create: createTeam,
  update: updateTeam,
  delete: deleteTeam,
  addMember,
  removeMember,
};
