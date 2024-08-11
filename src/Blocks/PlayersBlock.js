import { AppButton } from '../components/AppButton';
import React, { useRef, useState } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addPlayer, deletePlayer, selectPlayers } from '../store/slices/playerSlice';
import PhotoPicker from '../components/PhotoPicker';
import { numberToHexColor } from '../helpers/helpers';

export default function PlayersBlock() {
	const [playerName, setPlayerName] = useState('');
	const players = useSelector((state) => state.players.playerList);
	const teams = useSelector((state) => state.teams.teamList);
	const dispatch = useDispatch();
	const selectedPlayerIds = useSelector((state) => state.players.selectedPlayerIds);
	const [isPlayerAddModalVisible, setPlayerAddModalVisible] = useState(false);
	const [isPhotoModalVisible, setPhotoModalVisible] = useState(false);
	const actualId = useRef(0);
	const handleAddPlayer = async () => {
		if (playerName.trim()) {
			dispatch(addPlayer({ name: playerName, photo: null }));
			setPlayerName('');
			setPlayerAddModalVisible(false);
		}
	};

	const colorByTeam = (id) => {
		for (const team of teams) {
			if (team.players.includes(id)) {
				return numberToHexColor(team.id);
			}
		}
		return '#fff';
	};
	return (
		<View>
			<FlatList
				data={players}
				renderItem={({ item }) => (
					<TouchableOpacity onPress={() => dispatch(selectPlayers(item.id))}>
						<View style={[styles.playerItemWrapper, { borderColor: colorByTeam(item.id), borderWidth: selectedPlayerIds.includes(item.id) ? 4 : 2 }]}>
							<View style={styles.textWrapper}>
								<Text style={{ fontWeight: selectedPlayerIds.includes(item.id) ? 'bold' : 'normal' }}>{item.name}</Text>
							</View>

							<View style={styles.buttonWrapper}>
								<AppButton
									text="foto"
									size="small"
									onPress={() => {
										setPhotoModalVisible(true);
										actualId.current = item.id;
									}}
								/>
								<AppButton text="smazat" size="small" onPress={() => dispatch(deletePlayer(item.id))} />
							</View>
						</View>
					</TouchableOpacity>
				)}
				keyExtractor={(item) => item.id}
			/>

			<AppButton onPress={() => setPlayerAddModalVisible(true)} text="Přidat hráče" />

			<Modal visible={isPlayerAddModalVisible} transparent={true} animationType="slide">
				<View style={styles.backgroundContainer}>
					<View style={styles.addModalContent}>
						<TextInput value={playerName} style={styles.input} onChangeText={setPlayerName} placeholder="Zadej jméno hráče" />
						<View style={styles.buttonsContainer}>
							<Button title="Přidat" onPress={handleAddPlayer} />
							<Button title="Zavřít" onPress={() => setPlayerAddModalVisible(false)} />
						</View>
					</View>
				</View>
			</Modal>
			<Modal visible={isPhotoModalVisible} transparent={true} animationType="slide">
				<PhotoPicker id={actualId.current} onClose={() => setPhotoModalVisible(false)} />
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	backgroundContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,0.5)',
	},
	addModalContent: {
		width: 300,
		backgroundColor: 'white',
		padding: 20,
	},
	playerItemWrapper: {
		width: '100%',
		marginVertical: 5,
		flexDirection: 'row',
		padding: 5,
	},
	textWrapper: {
		width: '60%',
	},
	buttonWrapper: {
		justifyContent: 'space-around',
		height: 60,
	},

	buttonsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 10,
	},
	input: {
		borderBottomColor: 'grey',
		borderBottomWidth: 2,
		height: 30,
	},
});
