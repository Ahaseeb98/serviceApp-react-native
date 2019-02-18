import React, { Component } from 'react';
import { Image, StyleSheet, View, Picker, TimePickerAndroidOpenReturn, AsyncStorage } from 'react-native';
import { Container, Header, Content, Input, Item, H1, Button, Icon, H2, Form, Textarea, Text } from 'native-base';
import CurrentPosition from './mapModal';
import { Constants, Location, Permissions } from 'expo';

import AddForm from './form';
export default class AddBuisness extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selected2: undefined,
			modalVisible: false,
			next: 0,
			nextBtn: 'next'
		};
	}

	componentWillMount() {
		this._getLocationAsync();
	}

	_getLocationAsync = async () => {
		let { status } = await Permissions.askAsync(Permissions.LOCATION);
		if (status !== 'granted') {
			this.setState({
				errorMessage: 'Permission to access location was denied'
			});
		}

		let location = await Location.getCurrentPositionAsync({});
		this.setState({ location });
	};

	
	handleIndicator = () => {
		this.setState({ next: 1 + this.state.next });
  };
  
  nav() {
	this.props.navigation.navigate('Home')
  }

	render() {
		return (
			<Container>
				<Content padded>
					<AddForm next={this.state.next} handleIndicator={() => this.handleIndicator()} nav={() => this.nav()}/>
				</Content>
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
	},
	inputCont: {
		flex: 1,
		flexDirection: 'column'
	},
	heading: {
		flex: 1,
		alignSelf: 'center',
		padding: 15,
		textDecorationLine: 'underline',
		textDecorationStyle: 'solid'
	},
	input: {
		margin: 5
	}
});
