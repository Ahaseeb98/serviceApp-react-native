import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import firebase from 'firebase';
export default class Example extends React.Component {
	state = {
		messages: []
	};

	componentWillMount() {
        firebase.database().ref('messages/').on('child_added', e => {
            if(((e.val().cUser === firebase.auth().currentUser.uid) && (e.val().receiverUser === this.props.val.key)) || ((e.val().cUser === this.props.val.key) && (e.val().receiverUser === firebase.auth().currentUser.uid))) {
                this.setState((previousState) => ({
                    messages: GiftedChat.append(previousState.messages, e.val())
                }));
            }
           
        })
		
	}

	onfirebase(messages) {
        let customDetails = {
            serviceKey: this.props.val.childKey,
            cUser: firebase.auth().currentUser.uid,
            receiverUser: this.props.val.key
        }
        let finalMsg = {
            ...messages[0],
            ...customDetails
        }
        console.log('message', messages[0])
        firebase.database().ref('messages/').push(finalMsg);
        this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, messages)
        }));
	}

	render() {
		return (
			<GiftedChat
				// style={{ height: 500 }}
				messages={this.state.messages}
				onSend={(messages) => this.onfirebase(messages)}
				user={{
					_id: firebase.auth().currentUser.uid
				}}
			/>
		);
	}
}
