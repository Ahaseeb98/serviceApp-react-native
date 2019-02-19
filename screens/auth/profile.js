import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Container, Text, Header, H1, Button, Icon,Item, Input } from 'native-base';
import { AppLoading } from 'expo';
import * as firebase from 'firebase';
import { ImagePicker, Permissions } from 'expo';

import Navigator from '../../navigation/Navigation'
// console.disableYellowBox = true;
export default class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = { image: null , profile: false};

	}
	async componentDidMount() {
		const status = await Permissions.askAsync(Permissions.CAMERA_ROLL);
		if (status === 'granted') {
		  return 
		} else {
		  throw new Error('Location permission not granted');
		}
	  }

	onChooseImagePress = async () => {
		const {
			status: cameraRollPerm
		  } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
	  
		  // only if user allows permission to camera roll
		  if (cameraRollPerm === 'granted') {
			const pickerResult = await ImagePicker.launchImageLibraryAsync({
			  allowsEditing: true,
			  aspect: [4, 3],
			});
	
			console.log('uri', pickerResult.uri)
			if (!pickerResult.cancelled) {
			  this.setState({image: pickerResult.uri})
				this.UploadImage(pickerResult.uri)
				  .then(() => {
					// Alert.alert("Success");
					console.log('image uploaded')
				  })
				  .catch((error) => {
					Alert.alert(error);
				  });
			  }
		}
	  
		// let result = await ImagePicker.launchCameraAsync();
		//let result = await ImagePicker.launchImageLibraryAsync();
	
	   
	  }
	
	  
	async  UploadImage(uri) {
		// Why are we using XMLHttpRequest? See:
		// https://github.com/expo/expo/issues/2402#issuecomment-443726662
		const blob = await new Promise((resolve, reject) => {
		  const xhr = new XMLHttpRequest();
		  xhr.onload = function() {
			resolve(xhr.response);
		  };
		  xhr.onerror = function(e) {
			console.log(e);
	
			reject(new TypeError('Network request failed'));
		  };
		  xhr.responseType = 'blob';
		  xhr.open('GET', uri, true);
		  xhr.send(null);
		});
	  
		let name= 'IMG_'+Math.floor((Math.random() * 100099090) + 1)+"_"+(new Date()).toLocaleTimeString().replace(/\:|PM| /g,'R')
	
		const ref = firebase
		  .storage()
		  .ref('/TOKENAPP/')
		  .child(`${name}`)
		const snapshot = await ref.put(blob);
	  
		// We're done with the blob, close and release it
		blob.close();
	  
		const url = await snapshot.ref.getDownloadURL();
		console.log(url)
		this.setState({image: url})
	  }

	  updateProfile() {
		  const {contact, image} = this.state;
		  if(contact && image) {
			firebase.database().ref('users/' + firebase.auth().currentUser.uid).update({
				contactNo: contact,
				profilePic: image
			})
			this.setState({profile: true})
		  }
		  else {
			  alert('fill the form correctly')
		  }
	  }

	  
	render() {
		const { profile } = this.state;
		if(profile) {
			return <Navigator/>
		}
		else {
			return (
				<Container>
					<Header style={styles.header}>
						<H1 style={styles.headerText}>Profile</H1>
						<Button transparent onPress={() => this.updateProfile()}>
							<Icon active name="done" type="MaterialIcons" />
						</Button>
					</Header>
	
					<Image
						style={{ width: 200, height: 200, borderRadius: 100, alignSelf: "center", margin: 20, }}
						source={{ uri: this.state.image ? this.state.image : 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
					/>
					<Button onPress={() => this.onChooseImagePress()} style={{alignSelf: 'center'}}>
						<Icon name="image" type="Entypo" />
						<Text>
							Choose your profile pic
				</Text>
					</Button>
					<Item regular style={{width: '74%', alignSelf: "center", marginTop: 20}}>
						<Icon name="contact" />
						<Input placeholder="Contact"  onChangeText={(e) => this.setState({contact: e})}/>
					</Item>
				</Container>
			);
		}
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
	}
});
