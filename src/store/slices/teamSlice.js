import { createSlice } from '@reduxjs/toolkit';

const teamSlice = createSlice({
	name: 'teams',
	initialState: {
		teamList: [],
		selectedTeamId: null,
	},
	reducers: {
		addTeam: (state, action) => {
			state.teamList.push({ id: Date.now().toString(), name: action.payload, players: [] });
		},
		deleteTeam: (state, action) => {
			state.teamList = state.teamList.filter((team) => team.id !== action.payload);
			if (state.selectedTeamId === action.payload) {
				state.selectedTeamId = null;
			}
		},
		selectTeam: (state, action) => {
			if (state.selectedTeamId === action.payload) {
				state.selectedTeamId = null;
			} else {
				state.selectedTeamId = action.payload;
			}
		},
		resetSelectedTeam: (state) => {
			state.selectedTeamId = null;
		},
		assignPlayersToTeam: (state, action) => {
			const { teamId, playerIds } = action.payload;
			const team = state.teamList.find((t) => t.id === teamId);

			if (team) {
				for (let i = 0; i < state.teamList.length; i++) {
					let teamInList = state.teamList[i];

					for (let j = 0; j < playerIds.length; j++) {
						const playerId = playerIds[j];

						if (teamInList.id !== teamId && teamInList.players.includes(playerId)) {
							const index = teamInList.players.findIndex((i) => i === playerId);
							if (index !== -1) {
								teamInList.players.splice(index, 1);
							}
						}
					}
				}

				team.players = Array.from(new Set([...team.players, ...playerIds]));
			}
		},
	},
});

export const { addTeam, deleteTeam, selectTeam, assignPlayersToTeam, resetSelectedTeam } = teamSlice.actions;
export default teamSlice.reducer;
