import React from 'react';
import { Container} from 'native-base';
import AppNavigator from '../../navigation/Navigation';

export default class Navigator extends React.Component {
	constructor(props) {
		super(props);
		this.state = { loading: true };
	}

	render() {
		return (
			<Container>
				<AppNavigator />
			</Container>
		);
	}
}
