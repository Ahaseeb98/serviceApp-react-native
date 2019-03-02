import React, { Component } from 'react';
import { Container, Content} from 'native-base';
import { Location, Permissions } from 'expo';

import AddForm from './form';
export default class AddBuisness extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selected2: undefined,
			modalVisible: false,
			next: 0,
			nextBtn: 'next'
		};
	}

	componentWillMount() {
		this._getLocationAsync();
	}

	_getLocationAsync = async () => {
		let { status } = await Permissions.askAsync(Permissions.LOCATION);
		if (status !== 'granted') {
			this.setState({
				errorMessage: 'Permission to access location was denied'
			});
		}

		let location = await Location.getCurrentPositionAsync({});
		this.setState({ location });
	};

	
	handleIndicator = () => {
		this.setState({ next: 1 + this.state.next });
  };
  
  nav() {
	this.props.navigation.navigate('Home')
  }

	render() {
		return (
			<Container>
				<Content padded>
					<AddForm next={this.state.next} handleIndicator={() => this.handleIndicator()} nav={() => this.nav()}/>
				</Content>
			</Container>
		);
	}
}
