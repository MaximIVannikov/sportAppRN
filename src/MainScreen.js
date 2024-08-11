import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { TeamsBlock } from './Blocks/TeamsBlock';
import PlayersBlock from './Blocks/PlayersBlock';
import { AppButton } from './components/AppButton';
import { assignPlayersToTeam, resetSelectedTeam } from './store/slices/teamSlice';
import SaveModal from './components/SaveModal';
import { useDispatch, useSelector } from 'react-redux';
import { resetSelectedPlayers } from './store/slices/playerSlice';

export default function MainScreen() {
	const [isSaveModalVisible, setSaveModalVisible] = useState(false);

	const dispatch = useDispatch();
	const selectedPlayers = useSelector((state) => state.players.selectedPlayerIds);
	const selectedTeamId = useSelector((state) => state.teams.selectedTeamId);

	const handleAssignPlayers = () => {
		dispatch(assignPlayersToTeam({ teamId: selectedTeamId, playerIds: selectedPlayers }));
		dispatch(resetSelectedPlayers());
		dispatch(resetSelectedTeam());
	};
	return (
		<View style={styles.mainContainer}>
			<View style={styles.buttonsContainer}>
				<View style={styles.buttonItem}>
					<AppButton text={'Přiřadit označeného hráče označenému týmu'} onPress={handleAssignPlayers} />
				</View>
				<View style={styles.buttonItem}>
					<AppButton text={`"Uložit"`} onPress={() => setSaveModalVisible(true)} />
				</View>
			</View>
			<View style={styles.content}>
				<View style={styles.teamsBlock}>
					<Text style={styles.header}>Týmy</Text>
					<TeamsBlock />
				</View>
				<View style={styles.playersBlock}>
					<Text style={styles.header}>Hráči</Text>
					<PlayersBlock />
				</View>
			</View>

			<SaveModal visible={isSaveModalVisible} onClose={() => setSaveModalVisible(false)} />
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		fontSize: 35,
		fontWeight: '700',
	},
	mainContainer: {
		padding: 40,
		flex: 1,
	},
	content: {
		flexDirection: 'row',
		flex: 6,
	},
	buttonItem: {
		width: '45%',
		height: 120,
	},

	buttonsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignContent: 'space-between',
		flex: 1,
	},
	teamsBlock: {
		padding: 10,
		width: '50%',
		backgroundColor: '#fff',
	},
	playersBlock: {
		padding: 10,
		width: '50%',
		backgroundColor: '#fff',
	},
});
