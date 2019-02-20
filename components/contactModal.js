import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Modal, Alert } from 'react-native';
import { Fab, Icon, Button, Spinner, Content } from 'native-base';
import firebase from 'firebase';
import DashboardCard from './card'

class ContactModal extends Component {
    constructor() {
        super();
        this.state = {
            arr: null
        }
    }

    componentDidMount() {
        let arr = []
        let that = this;
        let obj = null
        firebase.database().ref('services/').once('value', e => {
            console.log('chal rha he sain')
            e.forEach(function (childSnapshot) {
                var childKey = childSnapshot.key;
                var childData = childSnapshot.val();
                if(childSnapshot.val().uid === that.props.val.key) {
                    console.log('added', childSnapshot.val().uid , that.props.val.key)
                    let x = {
                        childKey: childKey
                    }
                    obj = {
                        ...childSnapshot.val(),
                        ...that.props.val,
                        ...x
                    };
                    arr.push(obj)
                    that.func(arr);

                }
                else {
                    console.log('ni mila kuch bhi')
                }
            })
        })
    }

    func = (arr) => {
		// console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxx')
		this.setState({ arr: arr });
	};


    render() {
        const { displayName, contactNo } = this.props.val;
        const { arr } = this.state;
        console.log(arr)
        return (
            <View>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={true}
                    onRequestClose={() => {
                        this.props.handleModal();
                    }}
                >
                    <View style={styles.header}>
                        <View>
                            <Text style={styles.headerContent}>{displayName}</Text>
                            <Text style={{ margin: 0, color: 'white' }}>{contactNo}</Text>
                        </View>
                        <Button light onPress={() => this.props.handleModal()} style={styles.fab}>
                            <Icon name="cross" type="Entypo" style={{ color: 'white' }} />
                        </Button>
                    </View>

                    <Content>
                        {arr ? (
                            arr.map((e, i) => {
                                return <DashboardCard val={e} key={i} />;
                            })
                        ) : (
                                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
                                    <Spinner />
                                </View>
                            )}
                    </Content>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#00dba4',
        width: '100%',
        alignItems: 'flex-start',
        padding: 10
    },
    headerContent: {
        fontSize: 25,
        fontWeight: '500',
        color: 'white',
        width: '70%',
        margin: 0
    },
    fab: {
        position: 'absolute',
        top: 7,
        right: 7,
        elevation: 0,
        backgroundColor: '#00dba4'
    },
});

export default ContactModal;
