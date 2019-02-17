import React, { Component } from 'react';
import { Image, StyleSheet, View, Picker, TimePickerAndroidOpenReturn } from 'react-native';
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
		this.data = this.data.bind(this);
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

	onValueChange2(value) {
		this.setState({
			selected2: value
		});
	}
	handleModal() {
		this.setState({
			modalVisible: !this.state.modalVisible
		});
	}
	data() {
		this.handleModal();
		alert('data');
	}

	handleIndicator() {
    if(this.state.next == 1) {
      this.setState({nextBtn: 'finish'})
    }
		this.setState({ next: 1 + this.state.next });
	}

	render() {
		return (
			<Container>
				<Header style={styles.header}>
					<H1 style={styles.headerText}>Your Service</H1>
					<Button transparent onPress={() => {this.state.nextBtn === "next" ? this.handleIndicator() : alert('add done')}}>
						<Text>{this.state.nextBtn}</Text>
					</Button>
				</Header>
				<Content padded>
					<AddForm next={this.state.next} />
					{/* <H2 style={styles.heading}>
            Add Service 
        </H2> */}
					<View style={styles.inputCont}>
						<Item regular style={styles.input}>
							<Input placeholder="Title" />
						</Item>
						{/* <Item regular  style={styles.input}>
        <Input placeholder='Name your Service' style={{flex: 1}}  />
          </Item> */}
						<Picker
							style={styles.input}
							selectedValue={this.state.language}
							onValueChange={(itemValue, itemIndex) => this.setState({ Catagory: itemValue })}
						>
							<Picker.Item label="Pick a Catagory" value={null} />
							<Picker.Item label="Plumber" value="Plumber" />
							<Picker.Item label="Electrition" value="Electrition" />
							<Picker.Item label="Mechanic" value="Mechanic" />
						</Picker>
						<Form style={styles.input}>
							<Textarea rowSpan={3} bordered placeholder="What kind of service do you provide?" />
						</Form>

						<Button onPress={() => this.handleModal()}>
							<Text>Workplace Location</Text>
						</Button>

						<View style={{ height: 300 }} />
					</View>
				</Content>

				{this.state.modalVisible && <CurrentPosition handleModal={() => this.handleModal()} data={this.data} />}
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
