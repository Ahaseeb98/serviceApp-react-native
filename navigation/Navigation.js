import React from "react";
import Dashboard from '../screens/dashboard/dashboard';
import AddBuisness from '../screens/add/addBuisness';
import Form from '../screens/add/form';
 
import { Facebook } from "expo";
import * as firebase from 'firebase';

// import Login from '../screens/Login';
// import Dashboard from '../screens/Dashboard';
import {createDrawerNavigator, createMaterialTopTabNavigator,DrawerItems, createStackNavigator, createAppContainer} from 'react-navigation';
import {View, ScrollView, TouchableOpacity, Text, SafeAreaView, StyleSheet, Alert, Image} from 'react-native'

const StackNavigator = createStackNavigator({
    Home: {
        screen: Form
    },
    YourBuisness: {
      screen: AddBuisness
    }
    // Login: {
    //     screen: Login
    // },
    // Dashboard: {
    //     screen: Dashboard
    // }

},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
 })

// const TabNavigator = createMaterialTopTabNavigator({
//     Home: StackNavigator,
//     Login: Login,
//   });



  const MyDrawerNavigator = createDrawerNavigator({
    Home: Dashboard,
    YourBuisness: AddBuisness,
    // Form: Form
  });
  
const Navigator = createAppContainer(MyDrawerNavigator);
export default Navigator;