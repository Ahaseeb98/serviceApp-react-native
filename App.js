import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Root } from 'native-base';
import { AppLoading } from 'expo';
import * as firebase from 'firebase';
import ApiKeys from './config/init';
import Profile from './screens/auth/profile';

import Login from './screens/auth/login';
import Navigator from './screens/dashboard/index';
// console.disableYellowBox = true;
export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { loading: true, user: false, confirm: null };

		if (!firebase.apps.length) {
			firebase.initializeApp(ApiKeys.FirebaseConfig);
		}
	}
	componentDidMount() {
		let that = this;
		firebase.auth().onAuthStateChanged((user) => {
			if (user != null) {
				this.setState({ user: user.uid });
				firebase.database().ref(`/users/${user.uid}/`).update(user.providerData[0]);
				that.confirm()
				// console.log('login hogaya');
			} else {
				this.setState({ user: null });
			}
		});
	}

	confirm() {
		firebase.database().ref('users/' + this.state.user).once('value', e => {
			console.log(e.val(), e.val().profilePic)
			if(e.val().contactNo && e.val().profilePic) {
				this.setState({confirm: true})
			}
			else {
				this.setState({confirm: false})
			}
		})
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
		const { user, confirm } = this.state;
		console.log('ok', confirm);
		if (
			this.state.loading
			 && !user
			 && confirm === null
		) {
			return <AppLoading />;
		}

		return (
			<Root>
				<Container style={styles.container}>
					{user === null ? <Login /> : confirm === false ? <Profile/> : <Navigator />}
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
