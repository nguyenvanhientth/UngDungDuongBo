import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,TextInput,Button,View,Alert,TouchableOpacity,TouchableHighlight,
    Image,AsyncStorage,ImageBackground} from 'react-native';
import env from './environment/env'

const BASE_URL = env;
const background = require('./image/hinhnen.jpg') ;
const lockIcon = require('./image/ic_lock.png');
const userIcon = require('./image/ic_user.png');
 var STORAGE_KEY = 'key_access_token';
export default class LoginPage extends Component {
  static navigationOptions = {
    title: 'Login',
    headers: null
  };
  constructor(props) {
    super(props);
    this.state = {
      userNames: '',
      passwords: '',
    };
  }

  _onPressLogin = () => {
      let serviceUrl =  BASE_URL + "Account/login";
      let userName = this.state.userNames;
      let password = this.state.passwords;
      var access_token = '';
      if(userName.length === 0 || password.length === 0){
        alert('Ban chua nhap day du! ')
      }
      else{
        // let postData = new FormData();
        // postData.append('UserName',userName);
        // postData.append('PassWord',password);   
        //console.warn('asd',userName,password)           
        fetch(serviceUrl,{
          method: "POST",  
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
              body: JSON.stringify({
                'UserName' : userName,
                'PassWord' :password
              })
        })
          .then((response) => response.json())
          .then((responseJSON) => {      
              //console.warn('asdasd',JSON.stringify(responseJSON.token)) ; 
              var { navigate } = this.props.navigation;
               access_token = responseJSON.token; 
               //console.warn('access_token',access_token) ; 
               if(access_token !=undefined){
                          try {
                              AsyncStorage.setItem(STORAGE_KEY, access_token);
                                navigate('MainPage');
                            } catch (error) {
                              console.log('AsyncStorage error: ' + error.message);
                            }    
               }
               else{
                  Alert.alert('Login failure');
               }  
          })
          .catch((error) => {
            Alert.alert('Login failure');
            //console.warn('asdsad',error);
          }); 
      }
      
  }
  _onChaneText = (userNames) =>{
    this.setState({userNames});
  }
  _onChanePassWord = (passwords) =>{
    this.setState({passwords}); 
  }
  render() {
     var { navigate } = this.props.navigation;
    return (
      <ImageBackground style={[styles.container, styles.background]}
        source = {background}  resizeMode="cover">
          <View style={styles.container}/>
              <View style={styles.wrapper}>
                <View style={styles.inputWrap}>
                    <View style={styles.iconWrap}>
                        <Image source={userIcon} resizeMode="contain" style={styles.icon}/>
                    </View>
                    <TextInput  style={styles.input} placeholder="Username" onChangeText={this._onChaneText.bind(this)} underlineColorAndroid="transparent"/>
                </View>
                <View style={styles.inputWrap}>
                    <View style={styles.iconWrap}>
                        <Image source={lockIcon} resizeMode="contain" style={styles.icon}/>
                    </View>
                    <TextInput style={styles.input} placeholder="Password" secureTextEntry={true}  onChangeText={this._onChanePassWord.bind(this)} underlineColorAndroid="transparent"/>
                </View>
                <TouchableOpacity activeOpacity={.5} onPress={this._onPressLogin.bind(this)} keyboardShouldPersistTaps={true}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}> Login</Text>
                    </View>      
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={.5} onPress={() => navigate('ForgotPassPage')}>
                    <View >
                    <Text style={styles.forgotPasswordText}>Forgot password?</Text>        
                    </View>      
                </TouchableOpacity> 
            </View>                        
          <View style={styles.container}/>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,   
  },
  background:{
    width: null,
    height:null,
  },
  wrapper:{
      paddingHorizontal:15,
  },
  inputWrap:{
      flexDirection:"row",
      marginVertical: 5,
      height:36,
      backgroundColor:"transparent",
  },
  input:{
    flex: 1,
    paddingHorizontal: 5,
    backgroundColor:'#FFF',
    },
  iconWrap:{
    paddingHorizontal:7,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:"#2E9AFE"
    },
  icon:{
    width:20,
    height:20,
    },
  button:{
    backgroundColor:"#2ECCFA",
    paddingVertical: 8,
    marginVertical:8,
    alignItems: "center",
    justifyContent: "center",
    },


  buttonText: {
      fontSize: 16,
      color:'#000000',
      textAlign: 'center',
     
  },
  forgotPasswordText:{
    color:'#0404B4',
       backgroundColor:"transparent",
         textAlign: 'center',
  },
});
module.exports = LoginPage;