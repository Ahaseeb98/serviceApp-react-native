import React, { Component } from 'react';
import { View, Text, Modal, KeyboardAvoidingView, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Icon, Body, Item, Input } from 'native-base';

import Example from './sendChat';

class ChatModal extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { title, displayName, contact, imgUrl, photoUrl, description, catagory } = this.props.val;
		return (
			<Modal
				animationType="slide"
				transparent={false}
				visible={this.state.true}
				onRequestClose={() => {
					this.props.handleModal();
				}}
			>
				<View>
					<View style={styles.header}>
						<View>
							<Text style={styles.headerContent}>{displayName}</Text>
							<Text style={{ margin: 0, color: 'white' }}>{catagory}</Text>
						</View>
						<Button light onPress={() => this.props.handleModal()} style={styles.fab}>
							<Icon name="cross" type="Entypo" style={{ color: 'white' }} />
						</Button>
					</View>
				</View>
				<Example val={this.props.val}/>
			</Modal>
		);
	}
}

const styles = StyleSheet.create({
	header: {
		backgroundColor: '#00dba4',
		width: '100%',
		alignItems: 'flex-start',
		padding: 10
	},
	headerContent: {
		fontSize: 25,
		fontWeight: '500',
		color: 'white',
		width: '70%',
		margin: 0
	},
	fab: {
		position: 'absolute',
		top: 7,
		right: 7,
		elevation: 0,
		backgroundColor: '#00dba4'
	},
	details: {
		// flex: 1,
		margin: 0
	},
	chatBtn: {
		paddingTop: 12,
		paddingBottom: 12,
		paddingLeft: 30,
		paddingRight: 30,
		backgroundColor: 'pink',
		borderRadius: 3
	}
});

export default ChatModal;
