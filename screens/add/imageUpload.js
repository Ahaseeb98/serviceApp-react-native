import React from 'react';
import { Image, StyleSheet, View, Alert } from 'react-native';
import {Button, Icon, Text} from 'native-base'
import { ImagePicker, Permissions } from 'expo';
import * as firebase from 'firebase';
console.disableYellowBox = true;
export default class ImageUpload extends React.Component {
  state = {
    image: null
  }
  static navigationOptions = {
    header: null,
  };

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
    this.props.data(url, 'imgUrl')
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{width: 200, height: 200, borderRadius: 20}}
          source={{uri: this.state.image ? this.state.image : 'https://www.churchtrac.com/articles/apple/uploads/2017/09/Antu_insert-image.svg_-846x846.png'}}
        />
        <Button  onPress={this.onChooseImagePress}>
        <Icon name="image" type="Entypo"/>
            <Text>
                Choose an image for your Service
            </Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, alignItems: "center", marginBottom: 20}
})