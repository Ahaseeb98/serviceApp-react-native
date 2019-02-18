import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Icon } from 'native-base';
import CurrentPosition from './mapModal';
import ImageUpload from './imageUpload'

export default class Image extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selected2: undefined,
			modalVisible: false,
			next: 0
		};
		this.data = this.data.bind(this);
	}

	data(e, f) {
		if(f === 'location') {
			this.handleModal();
		}
        this.props.value(e, f)
	}

	handleModal() {
		this.setState({
			modalVisible: !this.state.modalVisible
		});
    }

	render() {
		return (
			<View>
				<ImageUpload data={this.data}/>
				<Button onPress={() => this.handleModal()}>
				<Icon name="map" type="Feather" />
					<Text>Workplace Location</Text>
				</Button>

				{this.state.modalVisible && <CurrentPosition handleModal={() => this.handleModal()} data={this.data} />}
			</View>
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
