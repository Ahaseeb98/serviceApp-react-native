import React from "react";
import { StyleSheet } from "react-native";
import { Container, H1, Text, Button, Header, Icon } from "native-base";
// import { Facebook } from "expo";
import * as firebase from 'firebase';

import DashboardCard from '../../components/card'
export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  render() {
    return (
      <Container>
          <Header style={styles.header}>
              <H1 style={styles.headerText}>
                  Dashboard
              </H1>
              <Button transparent onPress={() => this.props.navigation.openDrawer()}>
              <Icon active name="dehaze" type="MaterialIcons" />
              </Button>
          </Header>

          <Container>
            <Button onPress={() => firebase.auth().signOut()}>
            <Text>logout</Text></Button>
              <DashboardCard/>
          </Container>
      </Container>
    );
  }
}


const styles = StyleSheet.create({
  header: {
      backgroundColor: '#00dba0',
  },
  headerText: {
      color: 'white',
      flex: 1,
      flexDirection: 'row',
      padding: 12,
      fontWeight: '500'
  }
});