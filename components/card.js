import React, { Component } from 'react';
import { Image } from 'react-native';
import {
	Card,
	CardItem,
	Thumbnail,
	Text,
	Button,
	Icon,
	Left,
	Body,
} from 'native-base';

import CardDetails from './cardDetails';
export default class DashboardCard extends Component {
	state = {
		modalVisibility: false
	};

  
	handleModal() {
		this.setState({
			modalVisibility: !this.state.modalVisibility
		});
    }

	render() {
    const { title, displayName, imgUrl, profilePic } = this.props.val;
    const {modalVisibility} = this.state;
		return (
			<Card>
				<CardItem>
					<Left>
						<Thumbnail
							source={{
								uri:
									profilePic
							}}
						/>
						<Body>
							<Text>{title}</Text>
							<Text note>{displayName}</Text>
						</Body>
					</Left>
				</CardItem>
				<CardItem cardBody>
					<Image source={{ uri: `${imgUrl}&redirect=false` }} style={{ height: 200, width: null, flex: 1 }} />
				</CardItem>
				<CardItem>
					<Body>
						<Button
							block
							dark
							bordered
							style={{ flex: 1, backgroundColor: '#fff' }}
							onPress={() => this.setState({ modalVisibility: true })}
						>
							<Icon
								active
								name="account-card-details"
								type="MaterialCommunityIcons"
								style={{ fontSize: 35 }}
							/>
							<Text>View Details</Text>
						</Button>
					</Body>
				</CardItem>
        {
          modalVisibility && <CardDetails  handleModal={() => this.handleModal()} val={this.props.val}/>
        }
			</Card>
		);
	}
}
