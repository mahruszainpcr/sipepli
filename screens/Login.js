import React from 'react';
import {  KeyboardAvoidingView,StyleSheet,  View, Alert, Text, Image, AsyncStorage,ToastAndroid } from 'react-native';
import { Picker, Button,Item, Input, Icon } from 'native-base';
import Dashboard from './Dashboard';
import { Permissions, Notifications } from 'expo';
class Login extends React.Component {

  async saveKey(value) {
    try {
      await AsyncStorage.setItem('@MySuperStore:key', value);
    } catch (error) {
      console.log("Error saving data" + error);
    }
  }
  
  static navigationOptions = ({ navigation }) => ({
    
    header:null
  })
  constructor(props) {

    super(props)

    this.state = {

      token: null,
      PasswordUser: '',
      EmailUser: '',
      isLoading: true,
 


    }

  }
  
  
  render() {
  //   if (this.state.isLoading) {
  //    return (
  //      <View style={{flex: 1, paddingTop: 20}}>
  //        <ActivityIndicator />
  //      </View>
  //    );
  //  }
 
  
    return (
      
      <KeyboardAvoidingView style={styles.MainContainer2} behavior="padding">
        <View style={styles.MainContainer}>
        <View style={styles.MainGambar}>
          
           <Image  source={require('./assets/sipepli.png')}        />
            
          </View>
          
          
          <Item regular style={styles.FormInputStyleClass}>
            {/* <Icon type="SimpleLineIcons" name="envelope" /> */}
            <Input placeholder='E-mail' onChangeText={EmailUser => this.setState({ EmailUser })} placeholderTextColor='#fff'/>
          </Item>

          
          <Item regular style={styles.FormInputStyleClass}>
            {/* <Icon type="SimpleLineIcons" name="lock" /> */}
            <Input placeholder='Password' onChangeText={PasswordUser => this.setState({ PasswordUser })} secureTextEntry={true} placeholderTextColor='#fff'/>
          </Item>
          

          <Button block info style={styles.ButtonStyleClass} onPress={this.UserLoginFunction}><Text style={{ color: '#fff', letterSpacing: 2, fontSize: 20 }}> Login </Text></Button>
          {/* <Button block info style={styles.ButtonStyleClass} onPress={this.registerForPushNotifications}><Text style={{ color: '#fff', letterSpacing: 2, fontSize: 20 }}> Login </Text></Button> */}
          <Text style={{ marginTop: 10, fontSize: 14, textAlign: 'center',color:'rgba(245,247,250,0.9)' }}>Anda tidak memiliki akun ?
          <Text style={{fontWeight: 'bold'}} onPress={() => this.props.navigation.navigate('Register')}> Buat Akun Sekarang
        </Text>
         </Text>
         {/* <Text style={{fontWeight: 'bold'}} onPress={() => this.registerForPushNotifications}>Test
        </Text> */}


        </View>
      </KeyboardAvoidingView>
    );
  }
validateEmail = (email) => {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

  UserLoginFunction = () => {


    const { PasswordUser } = this.state;
    const { EmailUser } = this.state;

    if(EmailUser==''){
      ToastAndroid.show('Email anda masih kosong', ToastAndroid.LONG);
    }else if(PasswordUser==''){
      ToastAndroid.show('Password anda masih kosong', ToastAndroid.LONG);
    }else{
      if(!this.validateEmail(EmailUser)){
        ToastAndroid.show('Email anda tidak valid', ToastAndroid.LONG);
      }else if(PasswordUser.length<6){
        ToastAndroid.show('Password anda harus lebih dari 6 karakter', ToastAndroid.LONG);
      }else{
        fetch('http://mobile-sipepli.riset.pcr.ac.id/login.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        email: EmailUser,

        password: PasswordUser

      })

    }).then((response) => response.json())
      .then((responseJson) => {

        // Showing response message coming from server after inserting records.
        if(responseJson.status=="Berhasil"){
          AsyncStorage.setItem('email', EmailUser);
          AsyncStorage.setItem('cust_id', responseJson.cust_id);
          AsyncStorage.setItem('status', "Login");
          this.props.navigation.navigate('Home');

        }else{
          
        Alert.alert(responseJson);
        }
        // console.log(responseJson);
        // console.log(responseJson.cust_id);

      }).catch((error) => {
        console.error(error);
      });
      }
  

    }
  

  }
}

const styles = StyleSheet.create({
  MainContainer2: {
    justifyContent: 'center',
    backgroundColor: '#368ee0',
    flex: 1
  },
  MainGambar:{
    justifyContent: 'center',
    alignItems: 'center',
    margin:20,
    marginBottom:40,
    padding:5,
    backgroundColor:'#fff',
    borderBottomLeftRadius:15,
    borderBottomRightRadius:50,
    borderTopLeftRadius:15,
    borderTopRightRadius:30,
    borderWidth: 0,
    borderColor: '#fff'
  },
  MainContainer: {
    justifyContent: 'center',
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
    marginBottom: 20
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

    margin: 20,
    borderRadius: 5,
    backgroundColor: 'rgba(243,129,129,1)'

  }
});
export default Login;
