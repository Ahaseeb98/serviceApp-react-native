import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, H1, Text, Button } from 'native-base';

import CwFb from './cwfacebook';
import CwGoogle from './cwgoogle';
console.disableYellowBox = true;
export default class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = { loading: true };
	}

	render() {
		return (
			<Container>
				<View style={styles.title}>
					<H1 style={{ color: 'white', fontSize: 45, fontWeight: '600', padding: 15 }}>WELCOME</H1>
					<H1 style={{ color: 'white', fontSize: 45, fontWeight: '600', padding: 15 }}>TO</H1>
					<H1 style={{ color: 'white', fontSize: 45, fontWeight: '600', padding: 15 }}>SERVICE APP</H1>
				</View>

				<View style={{ flex: 1 }}>
					<View style={styles.logInBtn}>
						<CwFb />
						<Text style={{ margin: 10 }}>or</Text>
						<CwGoogle />
					</View>
				</View>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	title: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#00dba0',
		height: '100%'
	},
	title1: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	logInBtn: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
		// backgroundColor: '#00dba9'
	},
	btn: {
		flexDirection: 'column',
		alignSelf: 'center',
		justifyContent: 'center',
		margin: 10
	}
});
