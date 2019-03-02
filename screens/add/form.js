import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Steps from './StepIndicator';
import { Header, H1, Toast, Content } from 'native-base';
import * as firebase from 'firebase'

import About from './about';
import Image from './Image';
import Location from './location';

export default class Fhjhorm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			step: 0,
			titles: [ 'About', 'Image', 'Location' ],
			title: null,
			catagory: null,
			description: null,
			contact: null,
			location: null,
			imgUrl: null
		};
	}

	value = (e, f) => {
		this.setState({ [f]: e });
	};

	func() {
		let {title, catagory, description, contact, location, imgUrl} = this.state;
		firebase.database().ref(`services/`).push({
			title: title,
			catagory: catagory,
			description: description,
			contact: contact,
			location: location,
			imgUrl: imgUrl,
			uid: firebase.auth().currentUser.uid,
			rating: 0,
			noOfRatings: 0
		});
		 this.props.nav();
	}

	handleNext() {

		if (this.props.next === 0 && (this.state.title === null || this.state.catagory === null)) {
			Toast.show({
				text: 'Please fill the form correctly',
				buttonText: 'Okay',
				duration: 3000
			});	
		} 

		else if (this.props.next === 1 && (this.state.contact === null || this.state.description === null)) {
			Toast.show({
				text: 'Please fill the form correctly',
				buttonText: 'Okay',
				duration: 3000
			});
		}

		else if (this.props.next === 2 && (this.state.location === null || this.state.imgUrl === null)) {
			// this.refs.btn.setAttribute("disabled", "disabled");
			Toast.show({
				text: 'Please fill the form correctly',
				buttonText: 'Okay',
				duration: 3000
			});
		}
    else {
			this.props.handleIndicator();
    } 
	}
	render() {
		const { step, titles } = this.state;
		this.props.next == 3 ? this.func() : null;
		return (
			<View style={{ height: '100%' }}>
				<Header style={styles.header}>
					<H1 style={styles.headerText}>Your Service</H1>
					<TouchableOpacity
						onPress={() => this.handleNext()}
						style={{ paddingBottom: 10, paddingTop: 20, paddingLeft: 30, paddingRight: 30 }}
					>
						<Text style={{ color: 'white', fontWeight: 'bold' }}>
							{this.props.next === 2 ? 'Finish' : 'Next'}
						</Text>
					</TouchableOpacity>
				</Header>
				<Text>{'\n'}</Text>
				<Steps style={{ marginTop: 40 }} step={this.props.next} titles={titles} />
				<Content padder>
					{this.props.next == 0 ? <About value={this.value.bind(this)} /> : null}
					{this.props.next == 1 ? <Image value={this.value.bind(this)} /> : null}
					{this.props.next == 2 ? <Location value={this.value.bind(this)} /> : null}
				</Content>
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
