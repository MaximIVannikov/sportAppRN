import { Pressable, View, Text, StyleSheet } from 'react-native';

export const AppButton = ({ text, onPress, size = 'normal' }) => {
	const isSmall = size === 'small';
	return (
		<Pressable onPress={onPress}>
			<View style={[styles.button, isSmall && styles.smallButton]}>
				<Text style={[styles.text, isSmall && styles.smallText]}>{text}</Text>
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	button: {
		borderRadius: 10,
		borderWidth: 2,
		padding: 8,
	},
	smallButton: {
		padding: 4,
	},
	text: {
		textAlign: 'center',
		fontSize: 14,
	},
	smallText: {
		fontSize: 11,
	},
});
