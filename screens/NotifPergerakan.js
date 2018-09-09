import React from "react";
import { StatusBar,AsyncStorage,View,Image } from "react-native";
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
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
class NotifPergerakan extends React.Component {
  constructor(props) {

    super(props)

    this.state = {


    }
    
  }
  componentDidMount(){
   
    getToken();
    // this.listener = Expo.Notifications.addListener(this.handleNotification);
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
      this.props.navigation.navigate('Chat')
    }
    
  };
  render() {
   
    const { navigation } = this.props;
    const itemId = navigation.getParam('id', 'NO-ID');
    const waktu = navigation.getParam('waktu', 'NO-ID');
    const lokasi = navigation.getParam('lokasi', 'NO-ID');
    const keterangan = navigation.getParam('keterangan', 'NO-ID');
    const gambar = navigation.getParam('gambar', 'NO-ID');
    const deskripsi = navigation.getParam('deskripsi', 'NO-ID');
    
    // if(itemId==1){
    //     link_gambar='https://sipepli.riset.pcr.ac.id/images/captobject/parking/'+gambar;
    // }else if(itemId==2){
    //     link_gambar='https://sipepli.riset.pcr.ac.id/images/captobject/motion/'+gambar;
    // }  
 return (
      
        <Container>
      <Icon name="md-arrow-back" onPress={ () => {this.props.navigation.navigate('Home') } }  style={{marginTop:30}}/>
        <Content>
          
          <Card>
            <CardItem>
              <Left>
                {/* <Thumbnail source={{uri: 'Image URL'}} /> */}
                <Body>
                  <Text>{deskripsi }</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri: 'https://sipepli.riset.pcr.ac.id/images/captobject/'+gambar}} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent>
                  <Icon active name="md-navigate" />
                  <Text>{lokasi}</Text>
                </Button>
              </Left>
              <Left>
                <Button transparent>
                  <Icon active name="md-camera" />
                  <Text>{keterangan}</Text>
                </Button>
              </Left>
              <Left>
                <Button transparent>
                  <Icon active name="md-clock" />
                  <Text>{waktu}</Text>
                </Button>
              </Left>
              {/* <Right transparent>
                <Icon active name="md-clock" />
                <Text>11h ago</Text>
              </Right> */}
            </CardItem>
          </Card>
        </Content>
      </Container>
  

    );
  }


 
}


  
export default NotifPergerakan;
