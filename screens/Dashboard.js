import React from "react";
import { StatusBar,AsyncStorage,View } from "react-native";
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content,Text, Card, CardItem } from "native-base";
import HomeScreen from "../src/HomeScreen/HomeScreen";
import MainScreenNavigator from "../src/ChatScreen/index.js";
import Profile from "../src/ProfileScreen/index.js";
import SideBar from "../src/SideBar/SideBar.js";
import { DrawerNavigator } from "react-navigation";
import Expo from 'expo';
import Carousel from 'react-native-snap-carousel';
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
  AsyncStorage.getItem('email', (error, result) => {
    if (result) {
      console.log('Dataa =================',result);
      
      return fetch('http://mobile-sipepli.riset.pcr.ac.id/update_token.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: value,
          email:result,
        }),
      });
    }
});


 
  /// Send this to a server
}
class Dashboard extends React.Component {
  constructor(props) {

    super(props)

    this.state = {


    }
    
  }
  _renderItem ({item, index}) {
    return (  <Content padder>
          <Card>
            <CardItem>
              <Body>
                <Text>{ item.title }</Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
    );
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
    AsyncStorage.getItem('cust_id', (error, result) => {
      if (result) {
          this.setState({
            cust_id: result
          });
          console.log('Cust_id =================',result);
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
      this.props.navigation.navigate('NotifPergerakan', {
        id: data.id,
        gambar:data.gambar,
        deskripsi:data.deskripsi,
        lokasi:data.lokasi,
        waktu:data.waktu,
        keterangan:data.keterangan,
        otherParam: 'anything you want here',
      })
    }
    
  };
  componentWillUnmount() {
    this.listener && this.listener.remove();
  }

  // handleNotification = ({ origin, data }) => {
  //   console.log(
  //     `Push notification ${origin} with data: ${JSON.stringify(data)}`,
  //   );
  //   console.log(data.someData);
  //   if(origin=='selected'){
  //     this.props.navigation.navigate('NotifPergerakan', {
  //       id: data.id,
  //       gambar:data.gambar,
  //       deskripsi:data.deskripsi,
  //       lokasi:data.lokasi,
  //       waktu:data.waktu,
  //       keterangan:data.keterangan,
  //       otherParam: 'anything you want here',
  //     })
  //   }
    
  // };
  render() {
  
    const ENTRIES1 = [
      {
          title: 'Beautiful and dramatic Antelope Canyon',
          subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
          illustration: 'https://i.imgur.com/UYiroysl.jpg'
      },
      {
          title: 'Earlier this morning, NYC',
          subtitle: 'Lorem ipsum dolor sit amet',
          illustration: 'https://i.imgur.com/UPrs1EWl.jpg'
      },
      {
          title: 'White Pocket Sunset',
          subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
          illustration: 'https://i.imgur.com/MABUbpDl.jpg'
      },
      {
          title: 'Acrocorinth, Greece',
          subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
          illustration: 'https://i.imgur.com/KZsmUi2l.jpg'
      },
      {
          title: 'The lone tree, majestic landscape of New Zealand',
          subtitle: 'Lorem ipsum dolor sit amet',
          illustration: 'https://i.imgur.com/2nCt3Sbl.jpg'
      },
      {
          title: 'Middle Earth, Germany',
          subtitle: 'Lorem ipsum dolor sit amet',
          illustration: 'https://i.imgur.com/lceHsT6l.jpg'
      }
  ];
  
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
  //   <View >
  //   <Text >Ini Dashboard</Text>
  //   <Text >
  //                 Nama: {this.state.email}{'\n'}
  //                 Hobi: {this.state.status}
  //             </Text>
  // </View>
  <Container>
        {/* <Header style={{marginTop:20}}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>HomeScreen</Title>
          </Body>
          <Right />
        </Header> */}
        <Carousel
              ref={(c) => { this._carousel = c; }}
              data={ENTRIES1}
              renderItem={this._renderItem}
              sliderWidth={600}
              itemWidth={200}
              inactiveSlideScale={0.95}
                  inactiveSlideOpacity={1}
                  enableMomentum={true}
                  activeSlideAlignment={'start'}
                  activeAnimationType={'spring'}
                  activeAnimationOptions={{
                      friction: 4,
                      tension: 40
                  }}
            />
        <Content padder>
          <Card>
            <CardItem>
              <Body>
                <Text>Selamat Datang Di Sipepli (Sistem Pendeteksi Parkir Liar)</Text>
              </Body>
            </CardItem>
          </Card>
          <Button full rounded dark
            style={{ marginTop: 10 }}
            onPress={() => this.props.navigation.navigate("Chat")}>
            <Text>Konfigurasi Data</Text>
          </Button>
          <Button full rounded primary
            style={{ marginTop: 10 }}
            onPress={() => this.props.navigation.navigate("Profile")}>
            <Text>Goto Profiles</Text>
          </Button>
        </Content>
      </Container>
  

    );
  }


 
}


  
export default Dashboard;

// import React from "react";
// import { StatusBar,AsyncStorage,View } from "react-native";
// import { Container, Header, Title, Left, Icon, Right, Button, Body, Content,Text, Card, CardItem } from "native-base";
// import HomeScreen from "../src/HomeScreen/HomeScreen";
// import MainScreenNavigator from "../src/ChatScreen/index.js";
// import Profile from "../src/ProfileScreen/index.js";
// import SideBar from "../src/SideBar/SideBar.js";
// import { DrawerNavigator } from "react-navigation";
// import Expo from 'expo';
// async function getToken() {
//   // Remote notifications do not work in simulators, only on device
//   if (!Expo.Constants.isDevice) {
//     return;
//   }
//   let { status } = await Expo.Permissions.askAsync(
//     Expo.Permissions.NOTIFICATIONS,
//   );
//   if (status !== 'granted') {
//     return;
//   }
//   let value = await Expo.Notifications.getExpoPushTokenAsync();
//   console.log('Our token', value);
//   /// Send this to a server
// }
// class Dashboard extends React.Component {
//   constructor(props) {

//     super(props)

//     this.state = {


//     }
    
//   }
//   componentDidMount(){
//     getToken();
//     this.listener = Expo.Notifications.addListener(this.handleNotification);
//     AsyncStorage.getItem('email', (error, result) => {
//         if (result) {
//             this.setState({
//                 email: result
//             });
//         }
//     });
//     AsyncStorage.getItem('status', (error, result) => {
//         if (result) {
//             this.setState({
//                 status: result
//             });
//         }
//     });
//   }
 

//   handleNotification = ({ origin, data }) => {
//     console.log(
//       `Push notification ${origin} with data: ${JSON.stringify(data)}`,
//     );
//     console.log(data.someData);
//     if(origin=='selected'){
//       this.props.navigation.navigate('NotifPergerakan', {
//                 id: data.id,
//                 gambar:data.gambar,
//                 deskripsi:data.deskripsi,
//                 lokasi:data.lokasi,
//                 waktu:data.waktu,
//                 keterangan:data.keterangan,
//                 otherParam: 'anything you want here',
//               })
//     }
    
//   };
//   render() {
  
 
  
//     return (
      
    
//     // <View>
//     //     <Text>
//     //       Welcome to Demo AsyncStorage!
//     //     </Text>
//     //     <Text >
//     //                 Nama: {this.state.email}{'\n'}
//     //                 Hobi: {this.state.status}
//     //             </Text>

        

//     //   </View>
//     // <Container>
//     //     <Header>
//     //       <Left>
//     //         <Button
//     //           transparent
//     //           onPress={() => this.props.navigation.navigate("DrawerOpen")}>
//     //           <Icon name="menu" />
//     //         </Button>
//     //       </Left>
//     //       <Body>
//     //         <Title>HomeScreen</Title>
//     //       </Body>
//     //       <Right />
//     //     </Header>
//     //     <Content padder>
//     //       <Card>
//     //         <CardItem>
//     //           <Body>
//     //             <Text>Chat App to talk some awesome people!</Text>
//     //           </Body>
//     //         </CardItem>
//     //       </Card>
//     //       <Button full rounded dark
//     //         style={{ marginTop: 10 }}
//     //         onPress={() => this.props.navigation.navigate("Chat")}>
//     //         <Text>Chat With People</Text>
//     //       </Button>
//     //       <Button full rounded primary
//     //         style={{ marginTop: 10 }}
//     //         onPress={() => this.props.navigation.navigate("Profile")}>
//     //         <Text>Goto Profiles</Text>
//     //       </Button>
//     //     </Content>
//     //   </Container>
//     // <HomeScreen/>
//     <View >
//     <Text >Dashboard</Text>
//     <Text >
//                   Nama: {this.state.email}{'\n'}
//                   Hobi: {this.state.status}
//               </Text>
//   </View>
  

//     );
//   }


 
// }


  
// export default Dashboard;
