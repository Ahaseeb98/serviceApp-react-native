import React, { Component } from 'react';
import { View, Text, Modal, StyleSheet, ImageBackground } from 'react-native';
import { Icon, Button, Card, CardItem, Body, Container, Content, Tabs, Tab, ScrollableTab, TabHeading } from 'native-base';
import { Rating, AirbnbRating } from 'react-native-ratings';

import Directions from './directions'
import ChatModal from './chatModal';
import RatingModal from './ratingModal'
export default class CardDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalVisibility: true,
			ChatModalVisibility: false,
			directions: false,
			ratingModal: false
		};
	}

	handleDirections() {
		this.setState({
			directions: !this.state.directions
		});
	}

	handleModal() {
		this.setState({
			ChatModalVisibility: !this.state.ChatModalVisibility
		});
	}

	
	handleRating() {
		this.setState({
			ratingModal: !this.state.ratingModal
		});
	}

	render() {
		const { title, displayName, contact, imgUrl, photoUrl, description, catagory } = this.props.val;
		const { ChatModalVisibility, directions, ratingModal } = this.state;
		return (
			<Modal
				animationType="slide"
				transparent={false}
				visible={this.state.modalVisibility}
				onRequestClose={() => {
					this.props.handleModal();
				}}
			>
				<View style={{ flex: 1 }}>
					<View style={styles.header}>
						<Text style={styles.headerContent}>{title}</Text>
						<Button light onPress={() => this.props.handleModal()} style={styles.fab}>
							<Icon name="cross" type="Entypo" style={{ color: 'white' }} />
						</Button>
					</View>
					<View>
						<ImageBackground
							source={{ uri: imgUrl }}
							style={{ width: '100%', height: 170, justifyContent: 'flex-end' }}
						>
							<Text
								style={{
									color: 'white',
									fontSize: 35,
									fontWeight: '700',
									textShadowColor: 'rgba(0, 0, 0, 0.75)',
									textShadowOffset: { width: -1, height: 1 },
									textShadowRadius: 10,
									marginTop: 100
								}}
							>
								{displayName}
							</Text>
							<View style={{ flexDirection: 'row' }}>
								<Icon name="phone" type="Entypo" style={{ fontSize: 20, color: 'white' }} />
								<Text
									style={{
										color: 'white',
										// fontSize: 25,
										fontWeight: '700',
										textShadowColor: 'rgba(0, 0, 0, 0.75)',
										textShadowOffset: { width: -1, height: 1 },
										textShadowRadius: 10,
										flex: 1
									}}
								>
									: {contact}
								</Text>

								<Text
									style={{
										color: 'white',
										// fontSize: 25,
										fontWeight: '700',
										textShadowColor: 'rgba(0, 0, 0, 0.75)',
										textShadowOffset: { width: -1, height: 1 },
										textShadowRadius: 10,
										flex: 1
									}}
								>
									Catagory: {catagory}
								</Text>
							</View>
						</ImageBackground>
					</View>
					<Content padder>
						<View>
							<View style={styles.details}>
								<CardItem style={{ margin: 0 }}>
									<Body>
										<Text style={{ fontSize: 18, fontWeight: '600', width: '100%' }}>Details:</Text>
										<Text style={{ fontSize: 15 }}>
											{'           '}
											{description}
										</Text>
									</Body>
								</CardItem>
							</View>

							<View style={{ flexDirection: 'row' }}>
								{/* <CardItem> */}
								<Button info block iconRight style={{ flex: 1, margin: 3 }} onPress={() => this.handleModal()}>
									<Icon name="chat" type="Entypo" />
									<Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>Chat</Text>
								</Button>

								<Button success block iconRight style={{ flex: 1, margin: 3 }} onPress={() => this.handleDirections()}>
									<Icon name="map" type="Entypo" />
									<Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>Direction</Text>
								</Button>
								{/* </CardItem> */}
							</View>
							<Button block iconRight style={{ flex: 1, margin: 3, backgroundColor: '#eef8ff' }} onPress={() => this.handleRating()}>
								<Icon style={{ color: 'black', fontSize: 25, fontWeight: '600' }} name="star-outlined" type="Entypo" />
								<Text style={{ color: 'black', fontSize: 20, fontWeight: '400' }}>Rate  This Service</Text>
							</Button>
						</View>

					</Content>
				</View>



				{/* chat modal */}
				{ratingModal && <RatingModal handleModal={() => this.handleRating()} val={this.props.val} />}

				{ChatModalVisibility && <ChatModal handleModal={() => this.handleModal()} val={this.props.val} />}
				{
					directions && <Directions val={this.props.val} handleDirections={() => this.handleDirections()} />
				}
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
		fontSize: 30,
		fontWeight: '500',
		color: 'white',
		width: '70%'
	},
	fab: {
		position: 'absolute',
		top: 10,
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
