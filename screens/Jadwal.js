import React, { Component } from "react";
import { Alert, ToastAndroid, AsyncStorage,StyleSheet, Platform, TouchableOpacity, AppRegistry, View, StatusBar, ListView, ActivityIndicator } from "react-native";
import { Container, Body, Content, Header, Left, Right, Title, Input, Item, Label, Button, Icon, List, ListItem, Text } from "native-base";
import DatePicker from 'react-native-datepicker'
import { Col, Row, Grid } from "react-native-easy-grid";
export default class Jadwal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Keterangan: '',
            isLoading: true,
            timeAwal: "04:36",
            timeAkhir: "04:36",
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






    getJadwal(id){
        return fetch('http://mobile-sipepli.riset.pcr.ac.id/list_schedule.php', {
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
              this.getJadwal(result);
            }
          });
        
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
                        <Title>Data Jadwal</Title>
                    </Body>

                </Header>
                <Content padder >

                    <Row style={{marginBottom:20}}>
                        <Col><Label>Keterangan</Label>
                            <Item floatingLabel style={{ marginTop: 20 }}>
                                <Label>Masukkan Keterangan</Label>
                                <Input onChangeText={Keterangan => this.setState({ Keterangan })} />
                            </Item>
                        </Col>

                    </Row>
                    <Row style={{marginBottom:20}}><Col>
                        <Label >Waktu Awal</Label>
                        <DatePicker

                            date={this.state.timeAwal}
                            showIcon={false}
                            mode="time"
                            placeholder="select date"
                            format="hh:mm"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{


                                // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(timeAwal) => { this.setState({ timeAwal: timeAwal }) }}
                        />
                    </Col>
                        <Col>
                            <Label >Waktu Akhir</Label>
                            <DatePicker

                                date={this.state.timeAkhir}
                                showIcon={false}
                                mode="time"
                                placeholder="select date"
                                format="hh:mm"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{


                                    // ... You can check the source to find the other keys.
                                }}
                                onDateChange={(timeAkhir) => { this.setState({ timeAkhir: timeAkhir }) }}
                            />
                        </Col>
                    </Row>
                    <Row style={{marginBottom:20}}>
                        <Button rounded danger
                            style={{ alignSelf: "center" }}
                            onPress={this.UserRegistrationFunction}>
                            <Text>Simpan Data</Text>
                        </Button>
                    </Row>
                    <Row>
                    
                    </Row>
                </Content>
                
            </Container>
            );
        }

        return (
            <Container>
                <Header>


                    <Body>
                        <Title>Data Jadwal</Title>
                    </Body>

                </Header>
                <Content padder >

                    <Row style={{marginBottom:20}}>
                        <Col><Label>Keterangan</Label>
                            <Item floatingLabel style={{ marginTop: 20 }}>
                                <Label>Masukkan Keterangan</Label>
                                <Input onChangeText={Keterangan => this.setState({ Keterangan })} />
                            </Item>
                        </Col>

                    </Row>
                    <Row style={{marginBottom:20}}><Col>
                        <Label >Waktu Awal</Label>
                        <DatePicker

                            date={this.state.timeAwal}
                            showIcon={false}
                            is24Hour={true}
                            mode="time"
                            placeholder="select date"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{


                                // ... You can check the source to find the other keys.
                            }}
                            onDateChange={(timeAwal) => { this.setState({ timeAwal: timeAwal }) }}
                        />
                    </Col>
                        <Col>
                            <Label >Waktu Akhir</Label>
                            <DatePicker

                                date={this.state.timeAkhir}
                                showIcon={false}
                                is24Hour={true}
                                mode="time"
                                placeholder="select date"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{


                                    // ... You can check the source to find the other keys.
                                }}
                                onDateChange={(timeAkhir) => { this.setState({ timeAkhir: timeAkhir }) }}
                            />
                        </Col>
                    </Row>
                    <Row style={{marginBottom:20}}>
                        <Button rounded danger
                            style={{ alignSelf: "center" }}
                            onPress={this.UserRegistrationFunction}>
                            <Text>Simpan Data</Text>
                        </Button>
                    </Row>
                    <Row>
                    <List
                        leftOpenValue={75}
                        rightOpenValue={-75}
                        dataSource={this.state.dataSource}
                        renderRow={(rowData) =>
                            <ListItem icon>
                                <Left>
                                    <Button style={{ backgroundColor: "green" }}>
                                        <Icon active name="logo-whatsapp" />
                                    </Button>
                                </Left>
                                <Body>
                                    <Text>{rowData.s_label}</Text>
                                </Body>
                                <Right>
                                    <Text>{rowData.s_awal}-{rowData.s_akhir}</Text>
                                </Right>
                            </ListItem>}
                        renderLeftHiddenRow={data =>
                            <Button full onPress={() => alert(data.s_label)}>
                                <Icon active name="information-circle" />
                            </Button>}
                        renderRightHiddenRow={data =>
                            <Button full danger onPress={() => this.deleteRow(data.s_id)}>
                                <Icon active name="trash" />
                            </Button>
                        }
                    />
                    </Row>
                </Content>
                
            </Container>
        );
    }
    UserRegistrationFunction = () => {


        const { timeAwal } = this.state;
        const { timeAkhir } = this.state;
        const { Keterangan } = this.state;
        const { cust_id } = this.state;

       if (Keterangan == '') {
            ToastAndroid.show('Keterangan anda masih kosong', ToastAndroid.LONG);
        } else {
            fetch('http://mobile-sipepli.riset.pcr.ac.id/insert_schedule.php', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        keterangan: Keterangan,
                        timeAkhir :timeAkhir,
                        timeAwal : timeAwal,
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
