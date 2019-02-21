import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, H1, Text, Button, Header, Icon, Spinner, Content, Tabs, Tab, ScrollableTab, TabHeading } from 'native-base';
// import { Facebook } from "expo";
import * as firebase from 'firebase';

import DashboardCard from '../../components/card';

export default class Catagory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrCat: [
                'Random',
                'Plumber',
                'Electrition',
                'Mechanic',
            ],

        };
    }

    render() {
        const { arrCat } = this.state;
        const { arr } = this.props;
        return (
            <Tabs renderTabBar={() => <ScrollableTab />}>
                {
                    arrCat && arrCat.map((v, i) => {
                        return <Tab heading={<TabHeading style={{ backgroundColor: '#00dba0', borderWidth: 0 }}>
                            <Text style={{ color: '#ffffff' }}>{v}</Text>
                        </TabHeading>} key={i}>
                            <Container>

                                <Content>
                                    {arr ? (
                                        arr.map((e, i) => {
                                            if (e.catagory === v) {
                                                return <DashboardCard val={e} key={i} />
                                            }
                                            else if (v === 'Random') {
                                                return <DashboardCard val={e} key={i} />
                                            }
                                        })
                                    ) : (
                                            <View style={{ marginTop: '50%' }}>
                                                <Spinner />
                                            </View>
                                        )}
                                </Content>
                            </Container>
                        </Tab>
                    })
                }
            </Tabs>
        );
    }
}
