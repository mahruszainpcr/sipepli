import React from 'react';
import { StyleSheet, Text, View,AsyncStorage } from 'react-native';
import { Font } from 'expo';
import AppIntroSlider from 'react-native-app-intro-slider';
import {
  StackNavigator,DrawerNavigator
} from 'react-navigation';

import Register from './screens/Register'
import Slide from './screens/Slide'
import Login from './screens/Login'
import Testing from './screens/Testing'
import Testing2 from './screens/Testing2'
import Dashboard from './screens/Dashboard'
import * as firebase from 'firebase';
import HomeScreens from "./src/HomeScreen/index.js";
import HomeScreen from './src/HomeScreen/HomeScreen';
import MainScreenNavigator from "./src/ChatScreen/index.js";
import Profile from "./src/ProfileScreen/index.js";
import SideBar from "./src/SideBar/SideBar.js";
export default class App extends React.Component {
  static navigationOptions = {
    header: null, 
  };
  constructor(){
        super();
        this.state = {firstLaunch: null};
    }
    componentDidMount(){
        AsyncStorage.getItem("alreadyLaunched").then(value => {
            if(value == null){
                 AsyncStorage.setItem('alreadyLaunched', true); // No need to wait for `setItem` to finish, although you might want to handle errors
                 this.setState({firstLaunch: true});
            }
            else{
                 this.setState({firstLaunch: false});
            }}) // Add some error handling, also you can simply do this.setState({fistLaunch: value == null})
            Font.loadAsync({
              'Roboto': require('native-base/Fonts/Roboto.ttf'),
              'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
              'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf'),
            });
    }
  render() {
    if(this.state.firstLaunch === null){
           return null; // This is the 'tricky' part: The query to AsyncStorage is not finished, but we have to present something to the user. Null will just render nothing, so you can also put a placeholder of some sort, but effectively the interval between the first mount and AsyncStorage retrieving your data won't be noticeable to the user.
       }else if(this.state.firstLaunch == true){
            return (    <HomeScreenRouter /> );
            //return ( <Home/>);
       }else{
           return (    <Home/> );
       }
   
  }
}
const slideScreenTrack = StackNavigator(
  {
    MainScreen: {
      screen: Slide,
    }
  },
  {
   headerMode: 'none',
  }
);
const loginScreenTrack = StackNavigator(
  {
    MainScreen: {
      screen: Login,
    }
  },
  {
   headerMode: 'none',
  }
);
const dashboardScreenTrack = StackNavigator(
  {
    MainScreen: {
      screen: Dashboard,
    }
  },
  {
   headerMode: 'none',
  }
);

const homeScreenTrack = StackNavigator(
  {
    SecondScreen: {
      screen: Register,
    }
  },
  {
    // navigationOptions: ({ navigation }) => ({
    //   initialRouteName: 'Home',
    //   headerMode: 'screen',
    //   headerTitle: 'Form Registration',
    //   drawerLabel: 'Second Screen',
    // }),
    headerMode: 'none',
  }
);
const HomeScreenRouter = DrawerNavigator(
  {
    Slide:{screen:slideScreenTrack},
    Home: { screen: HomeScreen },
    Chat: { screen: MainScreenNavigator },
    Testing: {screen: Testing},
    Profile: { screen: Profile },
    DrawerOpen: { screen: SideBar },
    Register: {  name: 'Register',screen: homeScreenTrack },
    Login: loginScreenTrack,
    Dashboard: {  name: 'Dashboard',screen: dashboardScreenTrack },
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);
// const AppNav = DrawerNavigator({
//   Slide: {  name: 'Slide',screen: slideScreenTrack },
//   Register: {  name: 'Register',screen: homeScreenTrack },
//   Login: loginScreenTrack,
//   Dashboard: {  name: 'Dashboard',screen: dashboardScreenTrack },
// });
// import React from 'react';
// import { View } from 'react-native';
// import styles from './screens/Styles';
// import TaskInput from './screens/TaskInput';
// import TaskList from './screens/TaskList';

// const App = () => (
//   <View style={styles.App}>
//     <TaskInput />
//     <TaskList />
//   </View>
// );

// export default App;