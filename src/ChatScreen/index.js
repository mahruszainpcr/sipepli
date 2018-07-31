import React, { Component } from "react";
import LucyChat from "./LucyChat.js";
import JadeChat from "./JadeChat.js";
import NineChat from "./NineChat.js";
import { TabNavigator } from "react-navigation";
import { Button, Text, Icon, Footer, FooterTab } from "native-base";
export default (MainScreenNavigator = TabNavigator(
  {
    LucyChat: { screen: LucyChat },
    JadeChat: { screen: JadeChat },
    NineChat: { screen: NineChat }
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
              onPress={() => props.navigation.navigate("LucyChat")}>
              <Icon name="logo-whatsapp" />
              <Text>No WA</Text>
            </Button>
            <Button
              vertical
              active={props.navigationState.index === 2}
              onPress={() => props.navigation.navigate("NineChat")}>
              <Icon name="md-mail" />
              <Text>E-Mail</Text>
            </Button>
            <Button
              vertical
              active={props.navigationState.index === 1}
              onPress={() => props.navigation.navigate("JadeChat")}>
              <Icon name="md-camera" />
              <Text>Kamera</Text>
            </Button>
            
          </FooterTab>
        </Footer>
      );
    }
  }
));