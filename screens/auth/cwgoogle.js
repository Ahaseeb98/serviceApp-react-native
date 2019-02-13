import React from "react";
import { StyleSheet } from "react-native";
import { Text, Button, Icon } from "native-base";

export default class CwGoogle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  render() {
    return (      
        <Button iconLeft danger style={styles.btn}>
            <Icon name='logo-google' />
            <Text>Continue with Google</Text>
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