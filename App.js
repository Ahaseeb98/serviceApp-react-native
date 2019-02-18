import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Root } from 'native-base';
import { AppLoading } from 'expo';
import * as firebase from 'firebase';
import ApiKeys from './config/init';

import Login from './screens/auth/login';
import Navigator from './screens/dashboard/index';
// console.disableYellowBox = true;
export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { loading: true, user: false };

		if (!firebase.apps.length) {
			firebase.initializeApp(ApiKeys.FirebaseConfig);
		}
	}
	componentDidMount() {
		firebase.auth().onAuthStateChanged((user) => {
			if (user != null) {
				this.setState({ user: user });
				firebase.database().ref(`/users/${user.uid}/`).update(user.providerData[0]);
				// console.log('login hogaya');
			} else {
				this.setState({ user: null });
			}
		});
	}

	async componentWillMount() {
		await Expo.Font.loadAsync({
			Roboto: require('native-base/Fonts/Roboto.ttf'),
			Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
			Ionicons: require('@expo/vector-icons/fonts/Ionicons.ttf')
		});
		this.setState({ loading: false });
	}

	render() {
		const { user } = this.state;
		// console.log('ok', user);
		if (
			this.state.loading
			//  && !user
		) {
			return <AppLoading />;
		}

		return (
			<Root>
				<Container style={styles.container}>
					{user === null ? <Login /> : <Navigator />}
					{/* <Navigator/> */}
				</Container>
			</Root>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		marginTop: 25
	}
});
