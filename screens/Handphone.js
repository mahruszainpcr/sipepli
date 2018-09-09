import React, { Component }  from "react";
import { Alert,ToastAndroid, AsyncStorage,StyleSheet, Platform, TouchableOpacity,AppRegistry, View, StatusBar,ListView ,ActivityIndicator } from "react-native";
import { Container, Body, Content, Header, Left, Right,  Title, Input, Item, Label , Button, Icon, List, ListItem, Text} from "native-base";

export default class Handphone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      NoWa: '',
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
        fetch('http://mobile-sipepli.riset.pcr.ac.id/delete_wa.php', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
    
          
            id_wa: secId,
    
    
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
    return fetch('http://mobile-sipepli.riset.pcr.ac.id/list_wa.php',{
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
                    <Title>Data No Handphone</Title>
                  </Body>
                  
                </Header>
                <Content padder>
                  <Item floatingLabel style={{ marginTop: 20 }}>
                    <Label>Masukkan No Handphone</Label>
                    <Input onChangeText={NoWa => this.setState({ NoWa })}/>
                  </Item>
                  <Item floatingLabel style={{ marginTop: 20 }}>
                    <Label>Keterangan (Pemilik No Handphone)</Label>
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
                  <Title>Data WA</Title>
                </Body>
               
              </Header>
              <Content padder>
                <Item floatingLabel style={{ marginTop: 20 }}>
                  <Label>Masukkan No WA</Label>
                  <Input onChangeText={NoWa => this.setState({ NoWa })}/>
                </Item>
                <Item floatingLabel style={{ marginTop: 20 }}>
                  <Label>Keterangan (Pemilik No WA)</Label>
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
                    <Text>{rowData.cell_no}</Text>
                  </Right>
                </ListItem>}
                  renderLeftHiddenRow={data =>
                    <Button full onPress={() => alert(data.keterangan)}>
                      <Icon active name="information-circle" />
                    </Button>}
                  renderRightHiddenRow={data =>
                    <Button full danger onPress={() => this.deleteRow(data.id)}>
                      <Icon active name="trash" />
                    </Button>
                    }
                />
              </Content>
            </Container>
    );
  }
  UserRegistrationFunction = () => {


        const { NoWa } = this.state;
        const { Keterangan } = this.state;
        const { cust_id } = this.state;
    
        if(NoWa==''){
          ToastAndroid.show('No Wa anda masih kosong', ToastAndroid.LONG);
        }else if(Keterangan==''){
          ToastAndroid.show('Keterangan anda masih kosong', ToastAndroid.LONG);      
        }else{
          if(isNaN(NoWa)||NoWa.length!=12){
            ToastAndroid.show('No HP anda tidak valid', ToastAndroid.LONG);
          }else{
            fetch('http://mobile-sipepli.riset.pcr.ac.id/insert_wa.php', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
    
            no_wa: NoWa,
    
            keterangan: Keterangan,
            id_user: cust_id,
    
    
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
   
 