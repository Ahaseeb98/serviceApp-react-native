import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, H1, Button, Header, Icon } from 'native-base';
import * as firebase from 'firebase';

import Catagory from './catagory'
export default class Dashboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			arr: null
		};
	}

	componentDidMount() {
		var that = this;
		let arr = [];
		let obj = null;
		firebase.database().ref('services/').once('value', (e) => {
			e.forEach(function (childSnapshot) {
				var childKey = childSnapshot.key;
				var childData = childSnapshot.val();
				// console.log(childData);
				firebase.database().ref('users/' + childData.uid).once('value', (f) => {
					// console.log(f.key, f.val());
					let keyObj = null;
					let lolObj = null

					lolObj = {
						childKey: childKey
					}

					keyObj = {
						key: f.key,
					};
					obj = {
						...childData,
						...f.val(),
						...keyObj,
						...lolObj
					};
					arr.push(obj);
					// console.log(arr)
					that.func(arr);
				});
			});
		});
	}

	func = (arr) => {
		// console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxx')
		this.setState({ arr: arr });
	};

	render() {
		const { arr } = this.state;
		// console.log('aho', arr)
		return (
			<Container>
				<Header style={styles.header} hasTabs>
					<H1 style={styles.headerText}>Dashboard</H1>
					<Button transparent onPress={() => this.props.navigation.openDrawer()}>
						<Icon active name="dehaze" type="MaterialIcons" />
					</Button>
				</Header>
				<Catagory arr={this.state.arr}/>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	header: {
		backgroundColor: '#00dba0'
	},
	headerText: {
		color: 'white',
		flex: 1,
		flexDirection: 'row',
		padding: 12,
		fontWeight: '500'
	}
});
