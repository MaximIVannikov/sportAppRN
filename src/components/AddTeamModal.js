import React, { useState } from 'react';
import { Modal, View, TextInput, Button, StyleSheet } from 'react-native';
import { addTeam } from '../store/slices/teamSlice';
import { useDispatch } from 'react-redux';

const AddTeamModal = ({ visible, onClose }) => {
	const [teamName, setTeamName] = useState('');
	const dispatch = useDispatch();

	const handleAddTeam = () => {
		if (teamName.trim()) {
			dispatch(addTeam(teamName));
			setTeamName('');
			onClose();
		}
	};

	return (
		<Modal visible={visible} transparent={true} animationType="slide">
			<View style={styles.backgroundModal}>
				<View style={styles.contentModal}>
					<TextInput style={styles.input} value={teamName} onChangeText={setTeamName} placeholder="Zadej název týmu" />
					<View style={styles.buttonsContainer}>
						<Button title="Přidat" onPress={handleAddTeam} />
						<Button title="Zavřít" onPress={onClose} />
					</View>
				</View>
			</View>
		</Modal>
	);
};

export default AddTeamModal;

const styles = StyleSheet.create({
	contentModal: {
		width: 300,
		backgroundColor: 'white',
		padding: 20,
	},
	backgroundModal: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,0.5)',
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
