import React from 'react';
import { KeyboardAvoidingView,AppRegistry, StyleSheet, HeaderBackButton,TextInput, View, Alert, Text, Image,Platform, ActivityIndicator,ToastAndroid } from 'react-native';
import { Picker, Button, Thumbnail, Container, Header, Content, Item, Input, Icon } from 'native-base';
import Expo from 'expo';
let token_code='';
async function getToken() {
  // Remote notifications do not work in simulators, only on device
  if (!Expo.Constants.isDevice) {
    return;
  }
  let { status } = await Expo.Permissions.askAsync(
    Expo.Permissions.NOTIFICATIONS,
  );
  if (status !== 'granted') {
    return;
  }
  //let value  = await Expo.Notifications.getExpoPushTokenAsync();
  token_code  = await Expo.Notifications.getExpoPushTokenAsync();
  this.setState({TokenUser:value});
  console.log('Our token', token_code);
  /// Send this to a server
}
class Register extends React.Component {

  constructor(props) {

    super(props)

    this.state = {
      selected1: "key1",
      NamaUser: '',
      AlamatUser: '',
      NoHpUser: '',
      PasswordUser: '',
      Repassword:'',
      EmailUser: '',
      PaketUser: '' ,
      TokenUser:'',
      isLoading: true,
 
   PickerValueHolder : ''


    }

  }
 
  componentDidMount() {
      console.log('tokennyas'+this.state.TokenUser);
      getToken();
      this.listener = Expo.Notifications.addListener(this.handleNotification);
    
      return fetch('http://mobile-sipepli.riset.pcr.ac.id/list_paket.php')
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            isLoading: false,
            dataSource: responseJson
          }, function() {
            // In this block you can do something with new state.
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
 
  onValueChange(value: string) {
    this.setState({
      selected1: value
    });
  }
  render() {
    if (this.state.isLoading) {
     return (
       <View style={{flex: 1, paddingTop: 20}}>
         <ActivityIndicator />
       </View>
     );
   }
 
  
    return (
      <KeyboardAvoidingView style={styles.MainContainer2} behavior="padding">
      
      
      {/* <Icon type="MaterialIcons" name="arrow-back" onPress={ () => {this.props.navigation.navigate('Login') } }  style={{marginTop:30,marginLeft:30,color:'#fff'}}/> */}
      <View style={styles.MainContainer}>
      <View style={styles.MainGambar}>
        
         <Image  source={require('./assets/sipepli.png')}        />
          
        </View>
          <Item regular style={styles.FormInputStyleClass}>
            {/* <Icon type="SimpleLineIcons" name="user" /> */}
            <Input placeholder='Nama Lengkap' onChangeText={NamaUser => this.setState({ NamaUser })} placeholderTextColor='#fff'/>
          </Item>

          <Item regular style={styles.FormInputStyleClass}>
            {/* <Icon type="SimpleLineIcons" name="location-pin" /> */}
            <Input placeholder='Alamat' onChangeText={AlamatUser => this.setState({ AlamatUser })} placeholderTextColor='#fff'/>
          </Item>

          <Item regular style={styles.FormInputStyleClass}>
            {/* <Icon type="SimpleLineIcons" name="phone" /> */}
            <Input placeholder='No Handphone' keyboardType = 'numeric' onChangeText={NoHpUser => this.setState({ NoHpUser })} placeholderTextColor='#fff' />
          </Item>

          <Item regular style={styles.FormInputStyleClass}>
            {/* <Icon type="SimpleLineIcons" name="envelope" /> */}
            <Input placeholder='E-mail' onChangeText={EmailUser => this.setState({ EmailUser })} placeholderTextColor='#fff'/>
          </Item>

          <Item regular style={styles.FormInputStyleClass}>
            {/* <Icon type="SimpleLineIcons" keyboardType ='email-address' name="present" /> */}
            
            <Picker
            selectedValue={this.state.PaketUser}
 
            onValueChange={(itemValue, itemIndex) => this.setState({PaketUser: itemValue})}
            onChangeText={PaketUser => this.setState({ PaketUser })}
             >
             
            { this.state.dataSource.map((item, key)=>(
            <Picker.Item label={item.feature_name} value={item.feature_id} key={key} />)
            )}
    
          </Picker>
           
          </Item>

          <Item regular style={styles.FormInputStyleClass}>
            {/* <Icon type="SimpleLineIcons" name="lock" /> */}
            <Input placeholder='Password' onChangeText={PasswordUser => this.setState({ PasswordUser })} secureTextEntry={true} placeholderTextColor='#fff'/>
          </Item>
          <Item regular style={styles.FormInputStyleClass}>
            {/* <Icon type="SimpleLineIcons" name="lock" /> */}
            <Input placeholder='Tulis kembali password anda' onChangeText={Repassword => this.setState({ Repassword })} secureTextEntry={true} placeholderTextColor='#fff'/>
          </Item>

          <Button block info style={styles.ButtonStyleClass} onPress={this.UserRegistrationFunction}><Text style={{ color: '#fff', letterSpacing: 2, fontSize: 20 }}> Daftar </Text></Button>
          <Text style={{ marginTop: 10, fontSize: 14, textAlign: 'center',color:'rgba(245,247,250,0.9)' }}>Telah memiliki akun? Silahkan <Text style={{fontWeight: 'bold'}} onPress={() => this.props.navigation.navigate('Login')}>Login
        </Text> </Text>


        </View>
      </KeyboardAvoidingView>
    );
  }
validateEmail = (email) => {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
validateHp = (hp) => {
  var re = /(\+62 ((\d{3}([ -]\d{3,})([- ]\d{4,})?)|(\d+)))|(\(\d+\) \d+)|\d{3}( \d+)+|(\d+[ -]\d+)|\d+/;
  return re.test(hp);
}

  UserRegistrationFunction = () => {


    const { NamaUser } = this.state;
    const { AlamatUser } = this.state;
    const { NoHpUser } = this.state;
    const { PasswordUser } = this.state;
    const { Repassword } = this.state;
    const { EmailUser } = this.state;
    const { PaketUser } = this.state;

    console.log(NoHpUser.length)
    console.log(isNaN(NoHpUser))
    if(NamaUser==''){
      ToastAndroid.show('Nama anda masih kosong', ToastAndroid.LONG);
    }else if(AlamatUser==''){
      ToastAndroid.show('Alamat anda masih kosong', ToastAndroid.LONG);      
    }else if(EmailUser==''){
      ToastAndroid.show('Email anda masih kosong', ToastAndroid.LONG);
    }else if(NoHpUser==''){
      ToastAndroid.show('No HP anda masih kosong', ToastAndroid.LONG);
    }else if(PasswordUser==''){
      ToastAndroid.show('Password anda masih kosong', ToastAndroid.LONG);
    }else if(Repassword==''||Repassword!=PasswordUser){
      ToastAndroid.show('Password anda tidak sama', ToastAndroid.LONG);
    }else{
      if(!this.validateEmail(EmailUser)){
        ToastAndroid.show('Email anda tidak valid', ToastAndroid.LONG);
      }else if(isNaN(NoHpUser)||NoHpUser.length!=12){
        ToastAndroid.show('No HP anda tidak valid', ToastAndroid.LONG);
      }else if(PasswordUser.length<6){
        ToastAndroid.show('Password anda harus lebih dari 6 karakter', ToastAndroid.LONG);
      }else{
        fetch('http://mobile-sipepli.riset.pcr.ac.id/pendaftaran.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        nama: NamaUser,

        alamat: AlamatUser,
        no_hp: NoHpUser,
        paket: PaketUser,
        email: EmailUser,

        password: PasswordUser

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

const styles = StyleSheet.create({
  MainContainer2: {
    backgroundColor: '#368ee0',
    flex: 1
  },
  MainGambar:{
    justifyContent: 'center',
    alignItems: 'center',
    margin:20
  },
  MainContainer: {

    flex: 1,
    margin: 10
  },
  FormInputStyleClass: {

    backgroundColor: 'rgba(245,247,250,0.5)',
    borderRadius: 8,
    borderWidth: 0,
    borderColor: 'rgba(245,247,250,0.5)',

    // Set border Radius.
    height: 40,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10
  },
  // TextInputStyleClass: {

  //   textAlign: 'center',
  //   marginBottom: 7,
  //   height: 40,
  //   borderWidth: 1,    
  //   // Set border Hex Color Code Here.
  //   borderColor: '#2196F3',

  //   // Set border Radius.
  //   borderRadius: 5,

  //   // Set border Radius.
  //   //borderRadius: 10 ,
  // },

  ButtonStyleClass: {
    // Set border Radius.

    margin: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(243,129,129,1)'

  }
});
export default Register;
