import React from "react";
import { AppRegistry, Image, ImageBackground,StatusBar } from "react-native";
import { Container, Content, Text, List, ListItem } from "native-base";
const routes = ["Home", "Chat", "Profile","Login","Dashboard"];
export default class SideBar extends React.Component {
  render() {
    return (
      <Container>
        <Content>
          <ImageBackground
            source={{
              uri: "http://wopethemes.com/demo/hypertext/wp-content/uploads/2013/06/slide3-bg.png"
            }}
            style={{
              height: 120,
              alignSelf: "stretch",
              justifyContent: "center",
              alignItems: "center"
            }}>
            <Image
              square
              style={{ height: 80, width: 70 }}
              source={{
                uri: "https://images.vexels.com/media/users/3/139217/isolated/preview/6b9a4ae0da82766a7f626d2fa9ca2498-lion-flat-logo-safari-by-vexels.png"
              }}
            />
          </ImageBackground>
          <List
            dataArray={routes}
            renderRow={data => {
              return (
                <ListItem
                  button
                  onPress={() => this.props.navigation.navigate(data)}>
                  <Text>{data}</Text>
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>
    );
  }
}