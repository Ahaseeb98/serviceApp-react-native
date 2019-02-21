import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, Alert, Modal } from 'react-native';
import { Constants, MapView, Permissions, Location } from 'expo';
import { Button, Icon, Text, Spinner } from 'native-base';

// Using a local version here because we need it to import MapView from 'expo'
import MapViewDirections from './directonSupport';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 24.8607;
const LONGITUDE = 67.0011;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = 'AIzaSyCYvMpmVhFc0ydILEuXGJNYNGFnBoKPCL8';

export default class Directions extends Component {

    constructor(props) {
        super(props);

        this.state = {
            coordinates: null
            // [
            //     {
            //         latitude: 24.8950218,
            //         longitude: 67.1077335,
            //     },
            //     {
            //         latitude: 24.8735,
            //         longitude: 67.0157,
            //     },
            // ],
        };

        this.mapView = null;
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
        this.setState({
            coordinates: [
                {
                    latitude: this.props.val.location.latitude,
                    longitude: this.props.val.location.longitude,
                },
                {
                    latitude: lat,
                    longitude: long,
                }
            ]
        })
    }

    componentWillMount() {
        this._getLocationAsync();

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
        )

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

    onMapPress = (e) => {
        if (this.state.coordinates.length == 2) {
            this.setState({
                coordinates: [
                    e.nativeEvent.coordinate,
                ],
            });
        } else {
            this.setState({
                coordinates: [
                    ...this.state.coordinates,
                    e.nativeEvent.coordinate,
                ],
            });
        }
    }

    onReady = (result) => {
        this.mapView.fitToCoordinates(result.coordinates, {
            edgePadding: {
                right: (width / 20),
                bottom: (height / 20),
                left: (width / 20),
                top: (height / 20),
            }
        });
    }

    onError = (errorMessage) => {
        Alert.alert(errorMessage);
    }

    render() {

        return (
            <View style={styles.container}>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={true}
                    onRequestClose={() => {
                        this.props.handleDirections();
                    }}
                >
                    <View style={styles.header}>
                        <Text style={styles.headerContent}>Directions</Text>
                        <Button light onPress={() => this.props.handleDirections()} style={styles.fab}>
                            <Icon name="cross" type="Entypo" style={{ color: 'white' }} />
                        </Button>
                    </View>
                    {
                        this.state.coordinates

                            ?
                            <MapView
                                initialRegion={
                                    this.state.region
                                }
                                style={{ flex: 1, flexDirection: 'column' }}
                                ref={c => this.mapView = c} // eslint-disable-line react/jsx-no-bind
                                // onPress={this.onMapPress}
                                loadingEnabled={true}
                            >
                                {this.state.coordinates.map((coordinate, index) =>
                                    <MapView.Marker key={`coordinate_${index}`} coordinate={coordinate} /> // eslint-disable-line react/no-array-index-key
                                )}
                                {(this.state.coordinates.length === 2) && (
                                    <MapViewDirections
                                        origin={this.state.coordinates[0]}
                                        destination={this.state.coordinates[1]}
                                        apikey={GOOGLE_MAPS_APIKEY}
                                        strokeWidth={3}
                                        strokeColor="hotpink"
                                        onReady={this.onReady}
                                        onError={this.onError}
                                    />
                                )}
                            </MapView>

                            :

                            <Spinner />

                    }

                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
    },
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
    }
});