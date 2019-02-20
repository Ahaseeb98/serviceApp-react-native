import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Header, Icon, Button, H1, Card, Body, Thumbnail, CardItem, Left, Right } from 'native-base'
import { Permissions, Contacts } from 'expo'
import firebase from 'firebase'

import ContactCard from '../components/contactCard';
export default class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }



    async showFirstContactAsync() {
        // Ask for permission to query contacts.
        const permission = await Permissions.askAsync(Permissions.CONTACTS);

        if (permission.status !== 'granted') {
            console.log('denied')
            return;
        }
        else {
            let arr = []
            let that = this
            console.log('chal raha he')
            try {
                const contacts = await Contacts.getContactsAsync({
                    fields: [
                        Contacts.PHONE_NUMBERS,
                    ],
                    pageSize: 100,
                });
                if (contacts.total > 0) {
                    //    console.log(contacts.data[0])
                    contacts.data.map((v) => {
                        //    console.log(v.phoneNumbers[0].number)
                        arr.push(v.phoneNumbers[0].number.replace(/\s+/g, ''))
                    })
            that.setState({ arr: arr })
                    // console.log(arr)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }


    async componentDidMount() {
        await this.showFirstContactAsync()
        this.x()
    }

    x() {
        console.log('rook ja sain')
        let x = []
        let a = null;
        firebase.database().ref('users/').once('value', e => {
            (e).forEach(y => {

                for (var i = 0; i < this.state.arr.length - 1; i++) {

                    if (this.state.arr[i] === y.val().contactNo) {
                        a = {
                            key: y.key
                        }
                        console.log(y.key)
                        let b = {
                            ...y.val(),
                            ...a
                        }
                        x.push(b)
                        // console.log(this.state.arr[i], y.val().contactNo)
                        console.log('----------')
                    }
                    else {
                        // console.log('esa to hota hi')
                    }
                }
            });
            this.setState({ finalArr: x })
        })
    }

    render() {
        const { finalArr } = this.state;
        console.log('final', finalArr)
        return (
            <View>
                <Header style={styles.header}>
                    <H1 style={styles.headerText}>Contacts</H1>
                    <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                        <Icon active name="dehaze" type="MaterialIcons" />
                    </Button>
                </Header>

                {
                    finalArr && finalArr.map((e, f) => {
                        return <ContactCard val={e} key={f}/>
                    })
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#00dba0'
    },
    headerText: {
        color: 'white',
        flex: 1,
        flexDirection: 'row',
        padding: 12,
        fontWeight: '500'
    }
});

