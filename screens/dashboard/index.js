import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, H1, Text, Button, Header } from 'native-base';
import { Facebook } from 'expo';
import * as firebase from 'firebase';
import AppNavigator from '../../navigation/Navigation';

import DashboardCard from '../../components/card';
export default class Navigator extends React.Component {
	constructor(props) {
		super(props);
		this.state = { loading: true };
	}

	render() {
		return (
			<Container>
				<AppNavigator />
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	header: {
		backgroundColor: 'green'
	},
	headerText: {
		color: 'white',
		flex: 1,
		flexDirection: 'row',
		padding: 10
	}
});
