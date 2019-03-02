import React, { Component } from 'react';
import { View, Modal } from 'react-native';
import {Card, Text, CardItem, Button} from 'native-base'

import {AirbnbRating} from 'react-native-ratings'
import firebase from 'firebase'

export default class RatingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    rating(e) {
        firebase.database().ref(`services/${this.props.val.childKey}`).update({rating: this.props.val.rating + e, noOfRatings:  this.props.val.noOfRatings + 1})
        console.log(this.props.val.rating, e)
    }

    render() {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={true}
                onRequestClose={() => {
                    this.props.handleModal();
                }}
            >
            <View style={{flex: 1}}></View>
            <View style={{flex: 2, flexDirection: 'row',justifyContent: "center", height: 300}}>
            <Card style={{padding: 50}}>
                <CardItem style={{textAlign: 'center'}}>
                    <AirbnbRating
								count={5}
								reviews={['Terrible', "Bad", "OK", "Good", "Very Good"]}
								defaultRating={this.props.val.rating/this.props.val.noOfRatings}
								size={25}
                                onFinishRating={(e) => this.rating(e)}
							/>
               </CardItem>
               <Text>{'\n'}</Text>
               <Button light block onPress={() => this.props.handleModal()}>
                        <Text>
                            Submit
                        </Text>
                    </Button>
            </Card>

            </View>
            <View style={{flex: 1}}>

            </View>
            
            </Modal>
        );
    }
}
