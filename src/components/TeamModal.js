import React from 'react';
import { Modal, View, Text, FlatList, Image, Button, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const TeamModal = ({ visible, onClose }) => {
	const selectedTeamId = useSelector((state) => state.teams.selectedTeamId);
	const team = useSelector((state) => state.teams.teamList.find((t) => t.id === selectedTeamId));
	const players = useSelector((state) => state.players.playerList.filter((p) => team?.players.includes(p.id)));

	return (
		<Modal visible={visible} transparent={true} animationType="slide">
			<View style={styles.backgroundModal}>
				<View style={styles.content}>
					<View style={styles.header}>
						<Text>Tým: </Text>
						<Text>{team?.name}</Text>
					</View>
					<FlatList
						data={players}
						renderItem={({ item }) => (
							<View style={styles.playerItem}>
								<Text>{item.name}</Text>
								{item.photo && <Image source={{ uri: item.photo }} style={styles.photo} />}
							</View>
						)}
						keyExtractor={(item) => item.id}
					/>
					<Button title="Zavřít" onPress={onClose} />
				</View>
			</View>
		</Modal>
	);
};

export default TeamModal;

const styles = StyleSheet.create({
	header: {
		justifyContent: 'space-between',
		flexDirection: 'row',
	},
	photo: {
		width: 50,
		height: 50,
		borderWidth: 1,
		borderColor: 'grey',
	},
	playerItem: {
		marginVertical: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	backgroundModal: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,0.5)',
	},
	content: {
		width: 300,
		backgroundColor: 'white',
		padding: 20,
	},
});
