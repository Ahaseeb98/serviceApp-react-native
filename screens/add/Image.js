import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Textarea, Form, Item, Input, Icon } from 'native-base';

export default class Image extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<View>
				<Form style={styles.input}>
					<Textarea rowSpan={3} bordered placeholder="What kind of service do you provide?"  onChangeText={(e) => this.props.value(e, "description")}/>
				</Form>
				<Item regular style={styles.input}>
					<Icon name="contact" />
					<Input placeholder="Contact"  onChangeText={(e) => this.props.value(e, "contact")}/>
				</Item>
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
