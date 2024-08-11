import { configureStore } from '@reduxjs/toolkit';
import teamReducer from './slices/teamSlice';
import playerReducer from './slices/playerSlice';

export const store = configureStore({
	reducer: {
		teams: teamReducer,
		players: playerReducer,
	},
});
