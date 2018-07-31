import React, { Component } from "react";
import HomeScreen from "./HomeScreen.js";
import MainScreenNavigator from "../ChatScreen/JadeChat.js";
import Profile from "../ProfileScreen/index.js";
import SideBar from "../SideBar/SideBar.js";
import { DrawerNavigator } from "react-navigation";
const HomeScreenRouter = DrawerNavigator(
  {
    Home: { screen: HomeScreen },
    Home: { screen: HomeScreen },
    Chat: { screen: MainScreenNavigator },
    Profile: { screen: Profile },
    DrawerOpen: { screen: SideBar } 
  },
  {
    contentComponent: props => <SideBar {...props} />
  }
);
export default HomeScreenRouter;