import Dashboard from '../screens/dashboard/dashboard';

import { Facebook } from "expo";
import * as firebase from 'firebase';

// import Login from '../screens/Login';
// import Dashboard from '../screens/Dashboard';
import {createDrawerNavigator, createMaterialTopTabNavigator, createStackNavigator, createAppContainer} from 'react-navigation';
import {View, ScrollView, TouchableOpacity, Text, SafeAreaView, DrawerItems, StyleSheet} from 'react-native'

const StackNavigator = createStackNavigator({
    Home: {
        screen: Dashboard
    },
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

const DrawerWithLogoutButton = (props) => (
  <ScrollView contentContainerStyle={{flex: 1,  flexDirection: 'column', justifyContent: 'space-between' }}>
    <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
      <DrawerItems {...props} />
    </SafeAreaView>
    <TouchableOpacity onPress={() => firebase.auth().signOut()}>
      <View style={styles.item}>
        <View style={styles.iconContainer}>
          {/* <Image source={require('./img/logout.png')} style={styles.icon}></Image> */}
        </View>
        <Text style={styles.label}>Logout</Text>
      </View>
    </TouchableOpacity>
  </ScrollView>
);


  const MyDrawerNavigator = createDrawerNavigator({
    Home: {
        screen: StackNavigator
    },
    Logout: {
        screen: DrawerWithLogoutButton
    },
    // Dashboard: {
    //     screen: Dashboard
    // }

  });
  
const Navigator = createAppContainer(MyDrawerNavigator);

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    margin: 16,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, .87)',
  },
  iconContainer: {
    marginHorizontal: 16,
    width: 24,
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  }
});

export default Navigator;