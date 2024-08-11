import { createSlice } from '@reduxjs/toolkit';

const playerSlice = createSlice({
	name: 'players',
	initialState: {
		playerList: [],
		selectedPlayerIds: [],
	},
	reducers: {
		addPlayer: (state, action) => {
			state.playerList.push({ id: Date.now().toString(), name: action.payload.name, photo: action.payload.photo });
		},
		deletePlayer: (state, action) => {
			state.playerList = state.playerList.filter((player) => player.id !== action.payload);
		},
		selectPlayers: (state, action) => {
			if (state.selectedPlayerIds.includes(action.payload)) {
				const index = state.selectedPlayerIds.findIndex((el) => el === action.payload);
				state.selectedPlayerIds.splice(index, 1);
			} else {
				state.selectedPlayerIds.push(action.payload);
			}
		},

		resetSelectedPlayers: (state) => {
			state.selectedPlayerIds = [];
		},

		addPhoto: (state, action) => {
			const player = state.playerList.find((player) => player.id === action.payload.id);
			if (player) {
				player.photo = action.payload.photo;
			}
		},
	},
});

export const { addPlayer, deletePlayer, addPhoto, selectPlayers, resetSelectedPlayers } = playerSlice.actions;
export default playerSlice.reducer;
