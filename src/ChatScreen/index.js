import React, { Component } from "react";
import Handphone from "../../screens/Handphone";
import EmailScreen from "../../screens/EmailScreen";
import Paket from "../../screens/Paket";
import Jadwal from "../../screens/Jadwal";
import { TabNavigator } from "react-navigation";
import { Button, Text, Icon, Footer, FooterTab } from "native-base";
export default (MainScreenNavigator = TabNavigator(
  {
    Handphone: { screen: Handphone },
    EmailScreen: { screen: EmailScreen },
    Paket: { screen: Paket },
    Jadwal: { screen: Jadwal }
  },
  {
    tabBarPosition: "bottom",
    swipeEnabled: false,       
    tabBarComponent: props => {
      return (
        <Footer>
          <FooterTab>
            <Button
              vertical
              active={props.navigationState.index === 0}
              onPress={() => props.navigation.navigate("Handphone")}>
              <Icon name="logo-whatsapp" />
              <Text>No WA</Text>
            </Button>
            <Button
              vertical
              active={props.navigationState.index === 1}
              onPress={() => props.navigation.navigate("EmailScreen")}>
              <Icon name="md-mail" />
              <Text>E-Mail</Text>
            </Button>
            <Button
              vertical
              active={props.navigationState.index === 2}
              onPress={() => props.navigation.navigate("Paket")}>
              <Icon name="md-camera" />
              <Text>Kamera</Text>
            </Button>
            <Button
              vertical
              active={props.navigationState.index === 3}
              onPress={() => props.navigation.navigate("Jadwal")}>
              <Icon name="md-time" />
              <Text>Jadwal</Text>
            </Button>
            
          </FooterTab>
        </Footer>
      );
    }
  }
));