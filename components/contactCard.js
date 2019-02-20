import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Header, Icon, Button, H1, Card, Body, Thumbnail, CardItem, Left, Right } from 'native-base'

import ContactModal from './contactModal'
export default class ContactCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false
        };
    }
    handleModal() {
		this.setState({
			modalVisible: !this.state.modalVisible
		});
    }

    render() {
        const { profilePic, displayName, contactNo } = this.props.val;
        return (
            <Card>
                <CardItem>
                    <Left>
                        <Thumbnail source={{ uri: profilePic }} />
                        <Body>
                            <Text>{displayName}</Text>
                            <Text note>{contactNo}</Text>
                        </Body>
                    </Left>
                    <Right>
                        <TouchableOpacity light rounded style={{ elevation: 0 }} onPress={() => this.handleModal()}>
                            <Icon name="account-details" type="MaterialCommunityIcons" style={{fontSize: 35}}/>
                        </TouchableOpacity>
                    </Right>
                </CardItem>
                {this.state.modalVisible && <ContactModal handleModal={() => this.handleModal()} val={this.props.val}/>}

            </Card>
        );
    }
}
