import { TeamService } from "../../services/team/index.js";
import {
  parsePagination,
  createPaginationResponse,
} from "../../lib/pagination.js";

export const teamResolvers = {
  Query: {
    team: async (_, { id }, { db }) => {
      return TeamService.getById(db, id);
    },

    teams: async (_, { pagination, search }, { db }) => {
      const paginationParams = parsePagination(pagination);
      const { items, totalCount } = await TeamService.getAll(
        db,
        paginationParams,
        search,
      );
      return createPaginationResponse(items, totalCount, paginationParams);
    },
  },

  Mutation: {
    createTeam: async (_, { input }, { db }) => {
      return TeamService.create(db, input);
    },

    updateTeam: async (_, { id, input }, { db }) => {
      return TeamService.update(db, id, input);
    },

    deleteTeam: async (_, { id }, { db }) => {
      return TeamService.delete(db, id);
    },

    addMemberToTeam: async (_, { teamId, employeeId }, { db }) => {
      return TeamService.addMember(db, teamId, employeeId);
    },

    removeMemberFromTeam: async (_, { teamId, employeeId }, { db }) => {
      return TeamService.removeMember(db, teamId, employeeId);
    },
  },

  Team: {
    leader: async (team, _, { loaders }) => {
      if (!team.leader_id) return null;
      return loaders.employeeLoader.load(team.leader_id);
    },

    members: async (team, _, { db }) => {
      return TeamService.getMembers(db, team.id);
    },

    memberCount: async (team, _, { db }) => {
      return TeamService.getMemberCount(db, team.id);
    },
  },
};
