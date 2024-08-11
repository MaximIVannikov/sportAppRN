import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTeam, selectTeam } from '../store/slices/teamSlice';
import React, { useState } from 'react';
import TeamModal from '../components/TeamModal';
import { AppButton } from '../components/AppButton';
import AddTeamModal from '../components/AddTeamModal';
import { numberToHexColor } from '../helpers/helpers';

export const TeamsBlock = () => {
	const teams = useSelector((state) => state.teams.teamList);
	const selectedTeamId = useSelector((state) => state.teams.selectedTeamId);
	const dispatch = useDispatch();
	const [isTeamAddModalVisible, setTeamAddModalVisible] = useState(false);
	const [isTeamModalVisible, setTeamModalVisible] = useState(false);
	return (
		<View style={styles.wrapper}>
			<FlatList
				data={teams}
				renderItem={({ item }) => (
					<TouchableOpacity onPress={() => dispatch(selectTeam(item.id))}>
						<View style={[styles.teamItemWrapper, { borderColor: numberToHexColor(item.id), borderWidth: selectedTeamId === item.id ? 4 : 2 }]}>
							<View style={styles.textWrapper}>
								<Text style={{ fontWeight: selectedTeamId === item.id ? 'bold' : 'normal' }}>{item.name}</Text>
							</View>
							<View style={styles.buttonWrapper}>
								<AppButton
									size="small"
									text="zobrazit tým"
									onPress={() => {
										dispatch(selectTeam(item.id));
										setTeamModalVisible(true);
									}}
								/>
								<AppButton size="small" text="smazat" onPress={() => dispatch(deleteTeam(item.id))} />
							</View>
						</View>
					</TouchableOpacity>
				)}
				keyExtractor={(item) => item.id}
			/>
			<AppButton onPress={() => setTeamAddModalVisible(true)} text="Přidat tým" />
			<TeamModal visible={isTeamModalVisible} onClose={() => setTeamModalVisible(false)} />
			<AddTeamModal visible={isTeamAddModalVisible} onClose={() => setTeamAddModalVisible(false)} />
		</View>
	);
};

const styles = StyleSheet.create({
	wrapper: {},
	teamItemWrapper: {
		width: '100%',
		marginVertical: 5,
		flexDirection: 'row',
		padding: 5,
	},
	textWrapper: {
		width: '40%',
	},
	buttonWrapper: {
		justifyContent: 'space-around',
		height: 60,
	},
});
