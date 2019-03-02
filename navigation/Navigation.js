import Dashboard from '../screens/dashboard/dashboard';
import AddBuisness from '../screens/add/addBuisness';
import {createDrawerNavigator, createMaterialTopTabNavigator,DrawerItems, createStackNavigator, createAppContainer} from 'react-navigation';
import CardDetails from "../components/cardDetails";
import Contact from "../screens/contacts";

const StackNavigator = createStackNavigator({
    Home: {
        screen: Dashboard
    },
    YourBuisness: {
      screen: AddBuisness
    },
    CardDetails: {
        screen: CardDetails
    }
},
{
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
 })

  const MyDrawerNavigator = createDrawerNavigator({
    Home: StackNavigator,
    YourBuisness: AddBuisness,
    Contacts: Contact
  });
  
const Navigator = createAppContainer(MyDrawerNavigator);
export default Navigator;