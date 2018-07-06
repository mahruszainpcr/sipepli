import React from "react";
import { StatusBar,AsyncStorage,View } from "react-native";
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content,Text, Card, CardItem } from "native-base";
import HomeScreen from "../src/HomeScreen/HomeScreen";
import MainScreenNavigator from "../src/ChatScreen/index.js";
import Profile from "../src/ProfileScreen/index.js";
import SideBar from "../src/SideBar/SideBar.js";
import { DrawerNavigator } from "react-navigation";
import Expo from 'expo';
async function getToken() {
  // Remote notifications do not work in simulators, only on device
  if (!Expo.Constants.isDevice) {
    return;
  }
  let { status } = await Expo.Permissions.askAsync(
    Expo.Permissions.NOTIFICATIONS,
  );
  if (status !== 'granted') {
    return;
  }
  let value = await Expo.Notifications.getExpoPushTokenAsync();
  console.log('Our token', value);
  /// Send this to a server
}
class Dashboard extends React.Component {
  constructor(props) {

    super(props)

    this.state = {


    }
    
  }
  componentDidMount(){
    getToken();
    this.listener = Expo.Notifications.addListener(this.handleNotification);
    AsyncStorage.getItem('email', (error, result) => {
        if (result) {
            this.setState({
                email: result
            });
        }
    });
    AsyncStorage.getItem('status', (error, result) => {
        if (result) {
            this.setState({
                status: result
            });
        }
    });
  }
  componentWillUnmount() {
    this.listener && this.listener.remove();
  }

  handleNotification = ({ origin, data }) => {
    console.log(
      `Push notification ${origin} with data: ${JSON.stringify(data)}`,
    );
    console.log(data.someData);
    if(origin=='selected'){
      this.props.navigation.navigate('Register')
    }
    
  };
  render() {
  
 
  
    return (
      
    
    // <View>
    //     <Text>
    //       Welcome to Demo AsyncStorage!
    //     </Text>
    //     <Text >
    //                 Nama: {this.state.email}{'\n'}
    //                 Hobi: {this.state.status}
    //             </Text>

        

    //   </View>
    // <Container>
    //     <Header>
    //       <Left>
    //         <Button
    //           transparent
    //           onPress={() => this.props.navigation.navigate("DrawerOpen")}>
    //           <Icon name="menu" />
    //         </Button>
    //       </Left>
    //       <Body>
    //         <Title>HomeScreen</Title>
    //       </Body>
    //       <Right />
    //     </Header>
    //     <Content padder>
    //       <Card>
    //         <CardItem>
    //           <Body>
    //             <Text>Chat App to talk some awesome people!</Text>
    //           </Body>
    //         </CardItem>
    //       </Card>
    //       <Button full rounded dark
    //         style={{ marginTop: 10 }}
    //         onPress={() => this.props.navigation.navigate("Chat")}>
    //         <Text>Chat With People</Text>
    //       </Button>
    //       <Button full rounded primary
    //         style={{ marginTop: 10 }}
    //         onPress={() => this.props.navigation.navigate("Profile")}>
    //         <Text>Goto Profiles</Text>
    //       </Button>
    //     </Content>
    //   </Container>
    // <HomeScreen/>
    <View >
    <Text >Dashboard</Text>
    <Text >
                  Nama: {this.state.email}{'\n'}
                  Hobi: {this.state.status}
              </Text>
  </View>
  

    );
  }


 
}


  
export default Dashboard;
