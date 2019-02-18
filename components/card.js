import React, { Component } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
export default class DashboardCard extends Component {
  render() {
    const {title, displayName, contact, imgUrl, photoUrl, description, catagory} = this.props.val;
    return (
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: 'http://www.personalbrandingblog.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640-300x300.png'}} />
                {/* <Thumbnail source={{uri: `${photoUrl}/picture?type=small`}} /> */}
                <Body>
                  <Text>{title}</Text>
                  <Text note>{displayName}</Text>
                </Body>
              </Left>
             
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri: `${imgUrl}&redirect=false`}} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Body>
              <Button block dark bordered style={{flex: 1, backgroundColor: '#fff'}}>
                  <Icon active name="account-card-details" type="MaterialCommunityIcons" style={{fontSize: 35}}/>
                  <Text>View Details</Text>
                </Button>
              </Body>
            </CardItem>
          </Card>
    );
  }
}