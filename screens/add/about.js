import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Item, Picker, Icon } from 'native-base';
export default class About extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	handlePicker(e) {
		this.setState({language: e})
		this.props.value(e, 'catagory')
	}

	render() {
		return (
			<View>
				<Item regular style={styles.input}>
					<Icon name="title" type="MaterialIcons" />
					<Input placeholder="Title" onChangeText={(e) => this.props.value(e, 'title')} />
				</Item>
				<View
					style={{
						borderColor: 'gray',
						borderWidth: 0.3,
						margin: 5,
						paddingRight: 10
					}}
				>
					<Picker
						selectedValue={this.state.language}
						onValueChange={(itemValue, itemIndex) => this.handlePicker(itemValue)}
					>
						<Picker.Item label="Pick a Catagory" value={null} />
						<Picker.Item label="Plumber" value="Plumber" />
						<Picker.Item label="Electrition" value="Electrition" />
						<Picker.Item label="Mechanic" value="Mechanic" />
					</Picker>
				</View>
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
		marginLeft: 5,
		margin: 5
	}
});
