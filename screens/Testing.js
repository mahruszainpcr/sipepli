import React, { Component } from 'react'
import { Card } from 'react-native-elements'
import {
  Image,
  ImageBackground,
  Linking,
  ListView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Badge } from 'native-base';
import Tab1 from './Login';
import Tab2 from './Register';
import Tab3 from './Dashboard';
const styles = StyleSheet.create({
    cardContainer: {
      backgroundColor: '#FFF',
      borderWidth: 0,
      flex: 1,
      margin: 0,
      padding: 0,
    },
    container: {
      flex: 1,
    },
    emailContainer: {
      backgroundColor: '#FFF',
      flex: 1,
      paddingTop: 30,
    },
    headerBackgroundImage: {
      paddingBottom: 20,
      paddingTop: 35,
    },
    headerContainer: {},
    headerColumn: {
      backgroundColor: 'transparent',
      ...Platform.select({
        ios: {
          alignItems: 'center',
          elevation: 1,
          marginTop: -1,
        },
        android: {
          alignItems: 'center',
        },
      }),
    },
    placeIcon: {
      color: 'white',
      fontSize: 26,
    },
    scroll: {
      backgroundColor: '#FFF',
    },
    telContainer: {
      backgroundColor: '#FFF',
      flex: 1,
      paddingTop: 30,
    },
    userAddressRow: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    userCityRow: {
      backgroundColor: 'transparent',
    },
    userCityText: {
      color: '#A5A5A5',
      fontSize: 15,
      fontWeight: '600',
      textAlign: 'center',
    },
    userImage: {
      borderColor: 'green',
      borderRadius: 85,
      borderWidth: 3,
      height: 170,
      marginBottom: 15,
      width: 170,
    },
    userNameText: {
      color: '#FFF',
      fontSize: 22,
      fontWeight: 'bold',
      paddingBottom: 8,
      textAlign: 'center',
    },
  })

class Testing extends React.Component {
  constructor(props) {

    super(props)

    this.state = {

    }
    
  }
  
  render() {
  
 
  
    return (
        <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <Card containerStyle={styles.cardContainer}>
        <View style={styles.headerContainer}>
        <ImageBackground
          style={styles.headerBackgroundImage}
          blurRadius={10}
          source={{
            uri: 'http://www.sdjgjx.com/up/pc/background%20hd.jpg',
          }}
        >
          <View style={styles.headerColumn}>
            <Image
              style={styles.userImage}
              source={{
                uri: 'http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/sign-check-icon.png',
              }}
            />
            <Text style={styles.userNameText}>Muhammad Mahrus Zain</Text>
            <View style={styles.userAddressRow}>
              <View>
              <Icon type="SimpleLineIcons" name="location-pin" 
                  underlayColor="transparent"
                  iconStyle={styles.placeIcon}
                  onPress={this.onPressPlace} style={{color:'white'}} />
              </View>
              <View style={styles.userCityRow}>
                <Text style={styles.userCityText}>
                  Pekanbaru, Indonesia
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
      </Card>
      <FooterTab>
            <Button vertical>
              <Icon name="apps" />
              <Text>Apps</Text>
            </Button>
            <Button vertical>
              <Icon name="camera" />
              <Text>Camera</Text>
            </Button>
            <Button vertical active onPress={() => this.props.navigation.navigate('Testing')}>
              <Icon active name="navigate" />
              <Text>Navigate</Text>
            </Button>
            <Button vertical>
              <Icon name="person" onPress={() => this.props.navigation.navigate('Testing2')}/>
              <Text>Contact</Text>
            </Button>
          </FooterTab>
        </View>
        {/* <Tabs tabBarUnderlineStyle={{ backgroundColor: '#f65857' }}>
          <Tab  heading={ <TabHeading><Icon type="SimpleLineIcons" name="user" /><Text></Text></TabHeading>}>
            <Tab1 />
          </Tab>
          <Tab heading={ <TabHeading><Icon type="SimpleLineIcons" name="present" /><Text></Text></TabHeading>}>
            <Tab1 />
          </Tab>
          <Tab heading={ <TabHeading><Icon type="SimpleLineIcons" name="phone" /><Text></Text></TabHeading>}>
            <Tab1 />
          </Tab>
          <Tab heading={ <TabHeading><Icon type="SimpleLineIcons" name="camrecorder" /><Text></Text></TabHeading>}>
            <Tab1 />
          </Tab>
          </Tabs> */}
          
      </ScrollView>
    );
  }


 
}


  
export default Testing;
