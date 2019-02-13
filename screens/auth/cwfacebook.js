import React from "react";
import { StyleSheet } from "react-native";
import { Text, Button, Icon } from "native-base";

import { Facebook } from "expo";
import * as firebase from 'firebase';

export default class CwFb extends React.Component {
  constructor(props) {
    super(props);
  }

  async signInAsync() {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      "764054500621418",
      {
        permissions: ["public_profile", "email"]
      }
    );

    
    if (type === "success") { 
      const credential = firebase.auth.FacebookAuthProvider.credential(token)
      firebase
        .auth()
        .signInAndRetrieveDataWithCredential(credential)
        .then(userCredential => {
          firebase
            .database()
            .ref(`/users/${userCredential.user.uid}/`)
            .set(userCredential.user)
            console.log('login hogaya')
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      console.log("type === cancel");
    }
  }

  render() {
    return (      
        <Button iconLeft primary style={styles.btn} onPress={() => this.signInAsync()}>
            <Icon name='logo-facebook' />
            <Text>Continue with Facebook</Text>
          </Button>
    );
  }
}


const styles = StyleSheet.create({
  
    btn: {
        alignSelf: 'center',
        margin: 0,
      }
});