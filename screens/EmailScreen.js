import React, { Component }  from "react";
import { Alert,ToastAndroid, AsyncStorage,StyleSheet, Platform, TouchableOpacity,AppRegistry, View, StatusBar,ListView ,ActivityIndicator } from "react-native";
import { Container, Body, Content, Header, Left, Right,  Title, Input, Item, Label , Button, Icon, List, ListItem, Text} from "native-base";

export default class EmailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      EmailUser: '',
      Keterangan: '',
      isLoading: true
    }
  }
   
  deleteRow(secId) {
        //alert(secId);
        // rowMap[`${secId}${rowId}`].props.closeRow();
        // const newData = [...this.state.dataSource];
        // newData.splice(rowId, 1);
        // this.setState({ dataSource: newData });
        fetch('http://mobile-sipepli.riset.pcr.ac.id/delete_email.php', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
    
          
            id_email: secId,
    
    
          })
    
        }).then((response) => response.json())
          .then((responseJson) => {
    
            // Showing response message coming from server after inserting records.
            Alert.alert(responseJson);
    
          }).catch((error) => {
            console.error(error);
          });
          }
          
      
    
        
      
 
          fetcthItems(id){
            return fetch('http://mobile-sipepli.riset.pcr.ac.id/list_email.php',{
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
        
              
                id_customer: id,
        
        
              })
          })
            .then((response) => response.json())
            .then((responseJson) => {
              if(responseJson=="Tidak Ada Data"){
                this.setState({
                  isLoading: false,
                  dataSource: "kosong"
                })
              }else{
                let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.setState({
                  isLoading: false,
                  dataSource: ds.cloneWithRows(responseJson),
                }, function() {
                  // In this block you can do something with new state.
                });
              }
              
            })
            .catch((error) => {
              console.error(error);
            });
          }
   
  componentDidMount() {
    AsyncStorage.getItem('cust_id', (error, result) => {
      if (result) {
        this.setState({
          cust_id: result
        });
        this.fetcthItems(result);
      }
    });
    
  }
   
   
  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 100}}>
          <ActivityIndicator />
        </View>
      );
    }
    if (this.state.dataSource=="kosong") {
      return (
        <Container>
                <Header>
                 
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
   
    return (
      <Container>
              <Header>
                
                
                <Body>
                  <Title>Data Email</Title>
                </Body>
               
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
                <Content padder>
                <List
                  leftOpenValue={75}
                  rightOpenValue={-75}
                  dataSource={this.state.dataSource}
                  renderRow={(rowData)  =>
                   <ListItem icon>
                  <Left>
                    <Button style={{ backgroundColor: "green" }}>
                      <Icon active name="logo-whatsapp" />
                    </Button>
                  </Left>
                  <Body>
                    <Text>{rowData.keterangan}</Text>
                  </Body>
                  <Right>
                    <Text>{rowData.email}</Text>
                  </Right>
                </ListItem>}
                  renderLeftHiddenRow={data =>
                    <Button full onPress={() => alert(data.keterangan)}>
                      <Icon active name="information-circle" />
                    </Button>}
                  renderRightHiddenRow={data =>
                    <Button full danger onPress={() => this.deleteRow(data.email_id)}>
                      <Icon active name="trash" />
                    </Button>
                    }
                />
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
    const { cust_id } = this.state;
    
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
        id_user: this.state.cust_id,


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
 