import React from "react";
import { StyleSheet } from "react-native";
import { Text, Icon , Button} from "native-base";
import {Google} from 'expo';

export default class CwGoogle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
    this.signInWithGoogleAsync = this.signInWithGoogleAsync.bind(this)
  }

  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      var providerData = firebaseUser.providerData;
      for (var i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ===
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid === googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };
  onSignIn = googleUser => {
    console.log('Google Auth Response', googleUser);
    // We need to register an Observer on Firebase Auth to make sure auth is initialized.
    var unsubscribe = firebase.auth().onAuthStateChanged(
      function(firebaseUser) {
        unsubscribe();
        // Check if we are already signed-in Firebase with the correct user.
        if (!this.isUserEqual(googleUser, firebaseUser)) {
          // Build Firebase credential with the Google ID token.
          var credential = firebase.auth.GoogleAuthProvider.credential(
            googleUser.idToken,
            googleUser.accessToken
          );
          // Sign in with credential from the Google user.
          firebase
            .auth()
            .signInAndRetrieveDataWithCredential(credential)
            .then(function(result) {
              console.log('user signed in ');
              if (result.additionalUserInfo.isNewUser) {
                firebase
                  .database()
                  .ref('/google/' + result.user.uid)
                  .set({
                    gmail: result.user.email,
                    profile_picture: result.additionalUserInfo.profile.picture,
                    first_name: result.additionalUserInfo.profile.given_name,
                    last_name: result.additionalUserInfo.profile.family_name,
                    created_at: Date.now()
                  })
                  .then(function(snapshot) {
                    // console.log('Snapshot', snapshot);
                  });
              } else {
                firebase
                  .database()
                  .ref('/users/' + result.user.uid)
                  .update({
                    last_logged_in: Date.now()
                  });
              }
            })
            .catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              // The email of the user's account used.
              var email = error.email;
              // The firebase.auth.AuthCredential type that was used.
              var credential = error.credential;
              // ...
            });
        } else {
          console.log('User already signed-in Firebase.');
        }
      }.bind(this)
    );
  };
  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: '224149067463-rqtdo73s94s6rjt0hh69s6icrdj1to1r.apps.googleusercontent.com',
        behavior: 'web',
        // iosClientId: '', //enter ios client id
        scopes: ['profile', 'email']
      });

      if (result.type === 'success') {
        console.log(result.user)
        // this.onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      // return { error: true };
      console.log(e)
    }
  };

  render() {
    return (      
        <Button iconLeft danger style={styles.btn} onPress={this.signInWithGoogleAsync}>
            <Icon name='logo-google' />
            <Text>Continue with Google</Text>
          </Button>

        // <Button title="login" onPress={this.signInWithGoogleAsync}/>
    );
  }
}


const styles = StyleSheet.create({
  
  btn: {
    alignSelf: 'center',
    margin: 0,
  }
});