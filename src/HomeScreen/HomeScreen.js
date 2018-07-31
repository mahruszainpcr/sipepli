// import React from "react";
// import { StatusBar, AsyncStorage, StyleSheet, View } from "react-native";
// import { Container, Header, Title, Left, Icon, Right, Button, Body, Content, Text, Card, CardItem } from "native-base";
// import Expo from 'expo';
// import GridView from 'react-native-super-grid';

// import Carousel from 'react-native-snap-carousel';
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
//   AsyncStorage.getItem('email', (error, result) => {
//     if (result) {
//       console.log('Dataa =================', result);

//       return fetch('http://172.16.38.7/cbppt/update_token.php', {
//         method: 'POST',
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           token: value,
//           email: result,
//         }),
//       });
//     }
//   });

//   /// Send this to a server
// }
// export default class HomeScreen extends React.Component {
//   constructor(props) {

//     super(props)

//     this.state = {


//     }

//   }
//   _renderItem ({item, index}) {
//     return (  <Content padder>
//           <Card>
//             <CardItem>
//               <Body>
//                 <Text>{ item.title }</Text>
//               </Body>
//             </CardItem>
//           </Card>
//         </Content>
//     );
// }
//   componentDidMount() {

//     getToken();
//     this.listener = Expo.Notifications.addListener(this.handleNotification);
//     AsyncStorage.getItem('email', (error, result) => {
//       if (result) {
//         this.setState({
//           email: result
//         });
//       }
//     });
//     AsyncStorage.getItem('status', (error, result) => {
//       if (result) {
//         this.setState({
//           status: result
//         });
//       }
//     });
//   }
//   componentWillUnmount() {
//     this.listener && this.listener.remove();
//   }

//   render() {
//     const items = [
//       { name: 'TURQUOISE', code: '#1abc9c' }, { name: 'EMERALD', code: '#2ecc71' },
//       { name: 'PETER RIVER', code: '#3498db' }, { name: 'AMETHYST', code: '#9b59b6' },
//       { name: 'WET ASPHALT', code: '#34495e' }, { name: 'GREEN SEA', code: '#16a085' },
//     ];
//     const ENTRIES1 = [
//       {
//           title: 'Beautiful and dramatic Antelope Canyon',
//           subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
//           illustration: 'https://i.imgur.com/UYiroysl.jpg'
//       },
//       {
//           title: 'Earlier this morning, NYC',
//           subtitle: 'Lorem ipsum dolor sit amet',
//           illustration: 'https://i.imgur.com/UPrs1EWl.jpg'
//       },
//       {
//           title: 'White Pocket Sunset',
//           subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
//           illustration: 'https://i.imgur.com/MABUbpDl.jpg'
//       },
//       {
//           title: 'Acrocorinth, Greece',
//           subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
//           illustration: 'https://i.imgur.com/KZsmUi2l.jpg'
//       },
//       {
//           title: 'The lone tree, majestic landscape of New Zealand',
//           subtitle: 'Lorem ipsum dolor sit amet',
//           illustration: 'https://i.imgur.com/2nCt3Sbl.jpg'
//       },
//       {
//           title: 'Middle Earth, Germany',
//           subtitle: 'Lorem ipsum dolor sit amet',
//           illustration: 'https://i.imgur.com/lceHsT6l.jpg'
//       }
//   ];
//     return (
     
//       <Container>
//         {/* <Header style={{paddingTop:20}}>
//           <Left>
//             <Button
//               transparent
//               onPress={() => this.props.navigation.navigate("DrawerOpen")}>
//               <Icon name="menu" />
//             </Button>
//           </Left>
//           <Body>
//             <Title>HomeScreen</Title>
//           </Body>
//           <Right />
//         </Header> */}
//         <Content padder style={{ paddingTop: 40, flex: 0 }}>
//           <Card>
//             <CardItem>
//               <Left>

//                 <Body>
//                   <Text>Selamat Datang, {this.state.email}</Text>
//                   <Text note>di SIPEPLI</Text>
//                 </Body>
//               </Left>
//             </CardItem>
//           </Card>
//            <Carousel
//               ref={(c) => { this._carousel = c; }}
//               data={ENTRIES1}
//               renderItem={this._renderItem}
//               sliderWidth={600}
//               itemWidth={200}
//               inactiveSlideScale={0.95}
//                   inactiveSlideOpacity={1}
//                   enableMomentum={true}
//                   activeSlideAlignment={'start'}
//                   activeAnimationType={'spring'}
//                   activeAnimationOptions={{
//                       friction: 4,
//                       tension: 40
//                   }}
//             />
//           <Text style={{
//             fontSize: 22,
//             fontWeight: '600',
//             paddingLeft: 20,
//             paddingBottom: 20,
//             color: 'black',
//           }}>
//             Paket Yang Anda Miliki
//           </Text>
//           <Card>
//             <CardItem>
//               <Body>
//                 <Text>
//                    //Your text here
//                 </Text>
//               </Body>
//             </CardItem>
//           </Card>
//           <Text style={{
//             fontSize: 22,
//             fontWeight: '600',
//             paddingLeft: 20,
//             paddingBottom: 20,
//             color: 'black',
//           }}>
//             History Camera
//           </Text>
//           <GridView
//             itemDimension={130}
//             items={items}
//             style={styles.gridView}
//             renderItem={item => (
//               <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
//                 <Text style={styles.itemName}>{item.name}</Text>
//                 <Text style={styles.itemCode}>{item.code}</Text>
//               </View>
//             )}
//           />
//           <Button full rounded dark
//             style={{ marginTop: 20 }}
//             onPress={() => this.props.navigation.navigate("Chat")}>
//             <Text>Konfigurasi Data</Text>
//           </Button>
//           <Button full rounded primary
//             style={{ marginTop: 10 }}
//             onPress={() => this.props.navigation.navigate("Profile")}>
//             <Text>Logout</Text>
//           </Button>
//         </Content>
//       </Container>
//     );
//   }
// }
// const styles = StyleSheet.create({
//   gridView: {
//     paddingTop: 25,
//     flex: 1,
//   },
//   itemContainer: {
//     justifyContent: 'flex-end',
//     borderRadius: 5,
//     padding: 10,
//     height: 150,
//   },
//   itemName: {
//     fontSize: 16,
//     color: '#fff',
//     fontWeight: '600',
//   },
//   itemCode: {
//     fontWeight: '600',
//     fontSize: 12,
//     color: '#fff',
//   },
// });
import React, { Component } from 'react';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { StatusBar, AsyncStorage, StyleSheet, View,Dimensions } from "react-native";
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content, Text, Card, CardItem } from "native-base";
import Expo from 'expo';
import Constants from 'expo';
import GridView from 'react-native-super-grid';

// You can import from local files


const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window'
);

function wp(percentage) {
  const value = percentage * viewportWidth / 100;
  return Math.round(value);
}

const slideHeight = viewportHeight * 0.35;
const slideWidth = wp(40);
const itemHorizontalMargin = wp(2);
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
      console.log('Dataa =================', result);

      return fetch('http://mobile-sipepli.riset.pcr.ac.id/update_token.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: value,
          email: result,
        }),
      });
    }
  });

  /// Send this to a server
}
export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

export default class HomeScreen extends Component {
  constructor(props){
    super(props)
    this.fetcthItems()
  }
  state = {
    results: [
    ],
  };
  fetcthItems = () => {
    fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=b573d051ec65413c949e68169923f7ff')
      .then(response => response.json())
      .then(({results}) => this.setState({
        results
      }))
  }
  _renderItem({ item, index }, parallaxProps) {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{
            uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`,
          }}
          containerStyle={styles.item}
          style={styles.item}
          parallaxFactor={0.1}
          {...parallaxProps}
        />
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
      </View>
    );
  }
  _renderItem2 ({item, index}) {
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
  componentDidMount() {

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
  render() {
    const items = [
      { name: 'TURQUOISE', code: '#1abc9c' }, { name: 'EMERALD', code: '#2ecc71' },
      { name: 'PETER RIVER', code: '#3498db' }, { name: 'AMETHYST', code: '#9b59b6' },
      { name: 'WET ASPHALT', code: '#34495e' }, { name: 'GREEN SEA', code: '#16a085' },
    ];
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
      
      <Container>
        
        <Content padder style={{ paddingTop: 40, flex: 0 }}>
          <Card>
            <CardItem>
              <Left>

                <Body>
                  <Text>Selamat Datang, {this.state.email}</Text>
                  <Text note>di SIPEPLI</Text>
                </Body>
              </Left>
            </CardItem>
          </Card>
          <Carousel
          data={this.state.results}
          renderItem={this._renderItem}
          hasParallaxImages={true}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          inactiveSlideScale={0.95}
          inactiveSlideOpacity={0.7}
          activeSlideOffset={20}
          onEndReached={() => console.log('end')}
        />
           
          <Text style={{
            fontSize: 22,
            fontWeight: '600',
            paddingLeft: 20,
            paddingBottom: 20,
            color: 'black',
          }}>
            Paket Yang Anda Miliki
          </Text>
          <Card>
            <CardItem>
              <Body>
              <Carousel
              ref={(c) => { this._carousel = c; }}
              data={ENTRIES1}
              renderItem={this._renderItem2}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              inactiveSlideScale={0.95}
              inactiveSlideOpacity={0.7}
              activeSlideOffset={20}
              onEndReached={() => console.log('end')}
            />
              </Body>
            </CardItem>
          </Card>
          <Text style={{
            fontSize: 22,
            fontWeight: '600',
            paddingLeft: 20,
            paddingBottom: 20,
            color: 'black',
          }}>
            History Camera
          </Text>
          <GridView
            itemDimension={130}
            items={items}
            style={styles.gridView}
            renderItem={item => (
              <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemCode}>{item.code}</Text>
              </View>
            )}
          />
          <Button full rounded dark
            style={{ marginTop: 20 }}
            onPress={() => this.props.navigation.navigate("Chat")}>
            <Text>Konfigurasi Data</Text>
          </Button>
          <Button full rounded primary
            style={{ marginTop: 10 }}
            onPress={() => this.props.navigation.navigate("Profile")}>
            <Text>Logout</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    position: 'absolute',
    alignSelf: 'center',
    fontSize: 30,
    color: 'white',
  },
  item: {
    width: itemWidth,
    height: slideHeight,
    paddingHorizontal: itemHorizontalMargin,
    paddingBottom: 18, // needed for shadow
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'black',
  },
  gridView: {
    paddingTop: 25,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
});

