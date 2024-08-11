import { Button, Image, View, StyleSheet, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useCameraPermissions } from 'expo-camera';
import { useDispatch, useSelector } from 'react-redux';
import { addPhoto } from '../store/slices/playerSlice';
import React, { useState } from 'react';

export default function PhotoPicker({ id, onClose }) {
	const dispatch = useDispatch();
	const player = useSelector((state) => state.players.playerList.find((item) => item.id === id));
	const [image, setImage] = useState(player.photo);
	const [permission, requestPermission] = useCameraPermissions();
	if (!permission) {
		return <View />;
	}

	if (!permission.granted) {
		return (
			<View style={styles.container}>
				<Text style={styles.text}>We need your permission to show the camera</Text>
				<Button onPress={requestPermission} title="grant permission" />
			</View>
		);
	}

	const pickImage = async () => {
		let result = await ImagePicker.launchCameraAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled) {
			setImage(result.assets[0].uri);
			dispatch(addPhoto({ id: id, photo: result.assets[0].uri }));
		}
	};

	return (
		<View style={styles.backgroundModal}>
			<View style={styles.content}>
				{image && <Image source={{ uri: image }} style={styles.image} />}
				<View style={styles.buttonsWrapper}>
					<Button title="Udělat foto" onPress={pickImage} />
					<Button
						title="Zavřít"
						onPress={() => {
							onClose();
							setImage(null);
						}}
					/>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	content: {
		backgroundColor: 'white',
		padding: 20,
	},
	backgroundModal: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: 'rgba(0,0,0,0.5)',
	},
	buttonsWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 10,
	},
	image: {
		height: 200,
		borderWidth: 1,
		borderColor: 'grey',
	},
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	text: {
		textAlign: 'center',
	},
});
