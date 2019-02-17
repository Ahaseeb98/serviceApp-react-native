import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Modal, Alert } from 'react-native';
import { Fab, Icon } from 'native-base';
import { MapView } from 'expo';

const { width, height } = Dimensions.get('window');

class CurrentPosition extends Component {
	constructor() {
		super();
		this.state = {
			region: {
				latitude: '',
				longitude: '',
				latitudeDelta: '',
				longitudeDelta: '',
				accuracy: ''
			},
			finalPostion: null
		};
	}

	calDelta(lat, long, accuracy) {
		const oneDegreeOfLatitudeInMeters = 111.32 * 1000;
		const latDelta = accuracy / oneDegreeOfLatitudeInMeters;
		const longDelta = accuracy / (oneDegreeOfLatitudeInMeters * Math.cos(lat * (Math.PI / 180)));

		this.setState({
			// modalVisible: false,
			region: {
				latitude: lat,
				longitude: long,
				latitudeDelta: latDelta,
				longitudeDelta: longDelta,
				accuracy: accuracy
			},
			modalVisible: true
		});
	}

	componentWillMount() {
		this.watchID = navigator.geolocation.watchPosition(
			(position) => {
				const lat = position.coords.latitude;
				const long = position.coords.longitude;
				const accuracy = position.coords.accuracy;

				this.calDelta(lat, long, accuracy);
			},
			(error) => {
				console.log(error.message);
			},
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		);
	}

	componentWillUnmount() {
		navigator.geolocation.clearWatch(this.watchID);
	}

	marker() {
		return {
			latitude: this.state.region.latitude,
			longitude: this.state.region.longitude
		};
	}

	render() {
		console.log(this.state.region);
		return (
			<View style={styles.container}>
				<Modal
					animationType="slide"
					transparent={false}
					visible={this.state.modalVisible}
					onRequestClose={() => {
						this.props.handleModal();
					}}
				>
					{this.state.region.latitude ? (
						<MapView
							// provider={PROVIDER_GOOGLE}
							style={styles.map}
							mapType="satellite"
							initialRegion={this.state.region}
							minZoomLevel={10}
							maxZoomLevel={20}
							showsCompass
						>
							<MapView.Marker
								coordinate={this.marker()}
								title="You"
								description="You are here!"
								pinColor="green"
								draggable
								onDragEnd={(coordinate, position) => this.setState({finalPostion: coordinate.nativeEvent})}
							/>
						</MapView>
					) : (
						<Text>cordinates not found</Text>
					)}

					<Fab
						active={this.state.active}
						direction="up"
						containerStyle={{}}
						style={{ backgroundColor: '#5067FF' }}
						position="bottomRight"
						onPress={() => this.props.data(this.state.finalPostion === null ? this.state.region : this.state.finalPostion, 'location')}
					>
						<Icon name="share" />
					</Fab>
				</Modal>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center'
	},
	map: {
		width: width,
		height: height,
		flex: 1
	}
});

export default CurrentPosition;
