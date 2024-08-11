import React from 'react';
import { Modal, View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const SaveModal = ({ visible, onClose }) => {
	const teams = useSelector((state) => state.teams.teamList);
	const players = useSelector((state) => state.players.playerList);
	const data = JSON.stringify({ teams, players }, null, 2);

	return (
		<Modal visible={visible} transparent={true} animationType="slide">
			<View style={styles.backgroundModal}>
				<View style={styles.contentModal}>
					<ScrollView>
						<Text>{data}</Text>
					</ScrollView>
					<Button title="Zavřít" onPress={onClose} />
				</View>
			</View>
		</Modal>
	);
};

export default SaveModal;

const styles = StyleSheet.create({
	backgroundModal: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,0.5)',
	},
	contentModal: {
		width: 300,
		backgroundColor: 'white',
		padding: 20,
	},
});
