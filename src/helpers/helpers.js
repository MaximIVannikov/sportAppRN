export function numberToHexColor(number) {
	let hexString = number.toString(16);
	while (hexString.length < 6) {
		hexString = '0' + hexString;
	}
	let contrastHex = (parseInt(hexString.slice(-6), 16) ^ 0xffffff).toString(16);
	while (contrastHex.length < 6) {
		contrastHex = '0' + contrastHex;
	}
	return '#' + contrastHex;
}
