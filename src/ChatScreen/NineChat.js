import React from "react";
import { Alert, AppRegistry, View, StatusBar } from "react-native";
import { Container, Body, Content, Header, Left, Right, Icon, Title, Input, Item, Label, Button, Text } from "native-base";
import HomeScreen from "../HomeScreen";
export default class NineChat extends React.Component {
  constructor(props) {

    super(props)

    this.state = {
      EmailUser: '',
      Keterangan: '',


    }

  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Data Email</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Item floatingLabel style={{ marginTop: 20 }}>
            <Label>Masukkan Email</Label>
            <Input onChangeText={EmailUser => this.setState({ EmailUser })}/>
          </Item>
          <Item floatingLabel style={{ marginTop: 20 }}>
            <Label>Keterangan (Pemilik Email)</Label>
            <Input onChangeText={Keterangan => this.setState({ Keterangan })}/>
          </Item>
          <Button rounded danger
            style={{ marginTop: 20, alignSelf: "center" }}
            onPress={this.UserRegistrationFunction}>
            <Text>Simpan Data</Text>
          </Button>
        </Content>
      </Container>
    );
  }
  validateEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  UserRegistrationFunction = () => {


    const { EmailUser } = this.state;
    const { Keterangan } = this.state;
    
    if(EmailUser==''){
      ToastAndroid.show('No Wa anda masih kosong', ToastAndroid.LONG);
    }else if(Keterangan==''){
      ToastAndroid.show('Keterangan anda masih kosong', ToastAndroid.LONG);      
    }else{
      if(!this.validateEmail(EmailUser)){
        ToastAndroid.show('Email anda tidak valid', ToastAndroid.LONG);
      }else{
        fetch('http://mobile-sipepli.riset.pcr.ac.id/insert_email.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        email: EmailUser,

        keterangan: Keterangan,
        id_user: 1,


      })

    }).then((response) => response.json())
      .then((responseJson) => {

        // Showing response message coming from server after inserting records.
        Alert.alert(responseJson);

      }).catch((error) => {
        console.error(error);
      });
      }
  

    }
  

  }
}