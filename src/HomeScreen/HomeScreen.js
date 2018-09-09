
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
  AsyncStorage.getItem('cust_id', (error, result) => {
    if (result) {
      console.log('Dataa =================', result);
    }
  });
  

  /// Send this to a server
}
export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

export default class HomeScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      pergerakanLiar : [],
      parkirLiar: [],
      email:''
    }
    
    
    
  }
  fetcthItems = (id) => {
    fetch('http://mobile-sipepli.riset.pcr.ac.id/list_pergerakan_liar.php',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

      
        id_customer: id,


      })
  })
      .then(response => response.json())
      .then(({results}) => this.setState({
        pergerakanLiar:results
      }))
  }
  fetcthItemsParkirLiar = (id) => {
    fetch('http://mobile-sipepli.riset.pcr.ac.id/list_parkir_liar.php',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

      
        id_customer: id,


      })
  })
      .then(response => response.json())
      .then(({results}) => this.setState({
        parkirLiar:results
      }))
  }
  _renderItemParkirLiar({ item, index }, parallaxProps) {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{
            uri: `https://sipepli.riset.pcr.ac.id${item.park_img}`,
          }}
          containerStyle={styles.item}
          style={styles.item}
          parallaxFactor={0.1}
          {...parallaxProps}
        />
        <Text style={styles.title} numberOfLines={2}>
          {item.park_time}
        </Text>
      </View>
    );
  }
  _renderItemPergerakanLiar({ item, index }, parallaxProps) {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{
            uri: `https://sipepli.riset.pcr.ac.id${item.mot_img}`,
          }}
          containerStyle={styles.item}
          style={styles.item}
          parallaxFactor={0.1}
          {...parallaxProps}
        />
        <Text style={styles.title} numberOfLines={2}>
          {item.mot_time}
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
this.fetcthItems()
    getToken();
   this.listener = Expo.Notifications.addListener(this.handleNotification);
    AsyncStorage.getItem('email', (error, result) => {
      if (result) {
        this.setState({
          email: result
        });
      }
    });
    AsyncStorage.getItem('cust_id', (error, result) => {
      if (result) {
        this.setState({
          cust_id: result
        });
        this.fetcthItems(result);
        this.fetcthItemsParkirLiar(result)
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
    const paket = [
      { name: 'Paket Hemat',keterangan:'Terdiri dari 2 CCTV Indoor', code: '#1abc9c' }, { name: 'Paket Baru', keterangan:'Terdiri dari 2 CCTV Indoor',code: '#2ecc71' },
      { name: 'Paket Eksklusif',keterangan:'Paket Eksklusif', code: '#3498db' }
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
      }
  ];
    return (
      
      <Container>
        <Header>
          <Left/>
          <Body>
            <Title>SIPEPLI</Title>
          </Body>
          <Right />
        </Header>
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
          <Text style={{
            fontSize: 22,
            fontWeight: '600',
            paddingLeft: 20,
            paddingBottom: 20,
            color: 'black',
          }}>
            Paket Sipepli
          </Text>
          <GridView
            itemDimension={130}
            items={paket}
            style={styles.gridView}
            renderItem={item => (
              <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemCode}>{item.keterangan}</Text>
              </View>
            )}
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
            History Parkir Liar
          </Text>
          <Carousel
          data={this.state.parkirLiar}
          renderItem={this._renderItemParkirLiar}
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
            History Pergerakan Liar
          </Text>
          <Carousel
          data={this.state.pergerakanLiar}
          renderItem={this._renderItemPergerakanLiar}
          hasParallaxImages={true}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          inactiveSlideScale={0.95}
          inactiveSlideOpacity={0.7}
          activeSlideOffset={20}
          onEndReached={() => console.log('end')}
        />
           
          
      
          <Button full rounded dark
            style={{ marginTop: 20 }}
            onPress={() => this.props.navigation.navigate("Chat")}  style={{ marginBottom:10}}>
            <Text>Konfigurasi Data</Text>
          </Button>
          <Button full rounded primary
            style={{ marginTop: 10 }}
            onPress={this.logoutFunction} style={{ marginBottom:40}}>
            <Text>Logout</Text>
          </Button>
        </Content>
      </Container>
    );
  }
  logoutFunction = ()  => {
    const { email } = this.state;
    fetch('http://mobile-sipepli.riset.pcr.ac.id/logout.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        email: email

      })

    }).then((response) => response.json())
      .then((responseJson) => {

        // Showing response message coming from server after inserting records.
        AsyncStorage.setItem('email', '');
        AsyncStorage.setItem('cust_id', '');
        AsyncStorage.setItem('status', "Logout");
        this.props.navigation.navigate('Login');
        // console.log(responseJson);
        // console.log(responseJson.cust_id);

      }).catch((error) => {
        console.error(error);
      });
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

