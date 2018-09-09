import React, { Component } from "react";
import { Image,Alert, AsyncStorage,ToastAndroid, StyleSheet, Platform, TouchableOpacity, AppRegistry, View, StatusBar, ListView, ActivityIndicator } from "react-native";
import { Container, Body, CheckBox, Content, Header, Left, Right, Title, Input, Item, Label, Button, Icon, List, ListItem, Text } from "native-base";
import DatePicker from 'react-native-datepicker'
import { Col, Row, Grid } from "react-native-easy-grid";
import SelectMultiple from 'react-native-select-multiple'

const renderLabel = (label, style) => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image style={{width: 42, height: 42}} source={{uri: 'https://dummyimage.com/100x100/52c25a/fff&text=S'}} />
        <View style={{marginLeft: 10}}>
          <Text style={style}>{label}</Text>
        </View>
      </View>
    )
  }
  
export default class Paket extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            timeAwal: "2018-9-9",
            selectedPaket: [],
            datanya: []
        }
    }

    deleteRow(secId) {
        //alert(secId);
        // rowMap[`${secId}${rowId}`].props.closeRow();
        // const newData = [...this.state.dataSource];
        // newData.splice(rowId, 1);
        // this.setState({ dataSource: newData });
        fetch('http://mobile-sipepli.riset.pcr.ac.id/delete_schedule.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({


                s_id: secId,


            })

        }).then((response) => response.json())
            .then((responseJson) => {

                // Showing response message coming from server after inserting records.
                Alert.alert(responseJson);

            }).catch((error) => {
                console.error(error);
            });
    }


    



    getSchedule() {
        return fetch('http://mobile-sipepli.riset.pcr.ac.id/list_schedule.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({


                id_customer: 1,


            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                
                if (responseJson == "Tidak Ada Data") {
                    this.setState({
                        isLoading: false,
                        dataSource: "kosong"
                    })
                } else {
                   
                    let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
                    this.setState({
                        isLoading: false,
                        dataSource: ds.cloneWithRows(responseJson),
                    }, function () {
                        // In this block you can do something with new state.
                    });
                   // console.log(this.state.datanya);
                }

            })
            .catch((error) => {
                console.error(error);
            });
      }
      getPaket() {
        return fetch('http://mobile-sipepli.riset.pcr.ac.id/list_paket.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                
                if (responseJson == "Tidak Ada Data") {
                    this.setState({ datanya:responseJson
                    });
                } else {
                    this.setState({ datanya:responseJson
                    });
                   
                   console.log(this.state.datanya);
                }

            })
            .catch((error) => {
                console.error(error);
            });
      }
    componentDidMount() {
        this.getSchedule();
        this.getPaket();
        AsyncStorage.getItem('cust_id', (error, result) => {
            if (result) {
              this.setState({
                cust_id: result
              });
            }
          });
       
            
    }
    fetchData = async () => {
        return fetch('http://mobile-sipepli.riset.pcr.ac.id/list_paket.php')
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            isLoading: false,
            datanya: responseJson
          }, function() {
            // In this block you can do something with new state.
          });
        })
        .catch((error) => {
          console.error(error);
        });
        
      };
   

    onSelectionsChange = (selectedPaket) => {
      // selectedPaket is array of { label, value }
      this.setState({ selectedPaket })
      console.log(this.state.selectedPaket)
    }
    
    
    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, paddingTop: 100 }}>
                    <ActivityIndicator />
                </View>
            );
        }
        if (this.state.dataSource == "kosong") {
            return (
                <Container>
                <Header>


                    <Body>
                        <Title>Data Paket</Title>
                    </Body>

                </Header>
                <Content padder >

                    <Row style={{ marginBottom: 20 }}><Col>
                    <Label style={{ marginBottom: 20 }}>Tanggal Pemesanan</Label>
                        <DatePicker

                            date={this.state.timeAwal}
                            showIcon={false}
                            is24Hour={true}
                            mode="date"
                            placeholder="select date"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{


                                // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(timeAwal) => { this.setState({ timeAwal: timeAwal }) }}
                        />
                    </Col>

                    </Row>
                    <Row>
                    <Label style={{ marginBottom: 20 }}>Pilihan Paket</Label>
                        
                    </Row>
                    <Row style={{ marginBottom: 20 }}>
                    <SelectMultiple
                                items={this.state.datanya}
                                selectedItems={this.state.selectedPaket}
                                onSelectionsChange={this.onSelectionsChange} />
                    </Row>
                    <Row style={{ marginBottom: 20 }}>
                        <Button rounded danger
                            style={{ alignSelf: "center" }}
                            onPress={this.UserRegistrationFunction}>
                            <Text>Simpan Data</Text>
                        </Button>
                    </Row>
                    
                </Content>

            </Container>
            );
        }

        return (

            <Container>
                <Header>


                    <Body>
                        <Title>Data Paket</Title>
                    </Body>

                </Header>
                <Content padder >

                    <Row style={{ marginBottom: 20 }}><Col>
                    <Label style={{ marginBottom: 20 }}>Tanggal Pemesanan</Label>
                        <DatePicker

                            date={this.state.timeAwal}
                            showIcon={false}
                            is24Hour={true}
                            mode="date"
                            placeholder="select date"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{


                                // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(timeAwal) => { this.setState({ timeAwal: timeAwal }) }}
                        />
                    </Col>

                    </Row>
                    <Row>
                    <Label style={{ marginBottom: 20 }}>Pilihan Paket</Label>
                        
                    </Row>
                    <Row style={{ marginBottom: 20 }}>
                    <SelectMultiple
                                items={this.state.datanya}
                                selectedItems={this.state.selectedPaket}
                                onSelectionsChange={this.onSelectionsChange} />
                    </Row>
                    <Row style={{ marginBottom: 20 }}>
                        <Button rounded danger
                            style={{ alignSelf: "center" }}
                            onPress={this.UserRegistrationFunction}>
                            <Text>Simpan Data</Text>
                        </Button>
                    </Row>
                    
                </Content>

            </Container>
        );
    }
    UserRegistrationFunction = () => {


        const { cust_id } = this.state;
        const { selectedPaket } = this.state;
        
        console.log(selectedPaket)
            fetch('http://mobile-sipepli.riset.pcr.ac.id/insert_paket.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    selectedPaket: selectedPaket,
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
