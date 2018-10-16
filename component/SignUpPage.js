import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,TextInput,Button,View,Alert,TouchableOpacity,
  Image,AsyncStorage,ToastAndroid,ImageBackground} from 'react-native';
import {StackNavigator,} from 'react-navigation';
import env from './environment/env';

const BASE_URL = env;
const background = require('./image/hinhnen.jpg') ;
const lockIcon = require('./image/ic_lock.png');
const userIcon = require('./image/ic_user.png');
 
export default class SignUpPage extends Component {
    static navigationOptions = {
        title: 'Register',
      };
  constructor(props) {
    super(props);
  
    this.state = {
      userName: '',
      password: '',
      confirmPassword: '',
      Email: '',
      FirstName: '',
      LastName: '',
      DOB: '',
      Address: '',
      Gender: '',
      Position: '',
      PhoneNumber: '',
      Note: ''
    };
  }
  componentWillMount() {
        console.log("componentWillMount");
    }
  _onPressLogin (event) {
     let serviceUrl = BASE_URL+  "api/Account/Register";
      let userName = this.state.userName;
      let password = this.state.password;
      let confirmPassword = this.state.confirmPassword;
      let Email = this.state.Email;
      let FirstName = this.state.FirstName;
      let LastName = this.state.LastName;
      let DOB = this.state.DOB;
      let Address = this.state.Address;
      let Gender = this.state.Gender;
      let Position = this.state.Position;
      let PhoneNumber = this.state.PhoneNumber;
      let Note = this.state.Note;
      // kiem tra o day  
    fetch(serviceUrl,{
        method: "POST",          
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      body: JSON.stringify({
        'username': userName,
        'password': password,
        'confirmPassword':confirmPassword,
        'Email': Email,
        'FirstName': FirstName,
        'LastName': LastName,
        'DOB': DOB,
        'Address': Address,
        'Gender': Gender,
        'Position': Position,
        'PhoneNumber': PhoneNumber,
        'Note': Note

      })
        })
          .then((response) => response.json())
          .then((responseJSON) => {  
                if(responseJSON.message=="Success"){
                     var { navigate } = this.props.navigation;
                     navigate('LoginPage');
                    ToastAndroid.show(responseJSON.message, ToastAndroid.SHORT);
                }
          })
          .catch((error) => {
            console.warn(error);debugger;
          });  
  }
  static navigationOptions = {
    title: 'Sign Up',
     header: null,
  };
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
                    <TextInput  style={styles.input} placeholder="Username" onChangeText={(userName) => this.setState({userName})} underlineColorAndroid="transparent"/>
                </View>
                    <View style={styles.inputWrap}>
                        <View style={styles.iconWrap}>
                            <Image source={lockIcon} resizeMode="contain" style={styles.icon}/>
                        </View>
                        <TextInput style={styles.input} placeholder="Password"  secureTextEntry={true}  onChangeText={(password) => this.setState({password})} underlineColorAndroid="transparent"/>
                    </View>
                <View style={styles.inputWrap}>
                    <View style={styles.iconWrap}>
                        <Image source={lockIcon} resizeMode="contain" style={styles.icon}/>
                    </View>
                      <TextInput style={styles.input} placeholder="Confirm Password"  secureTextEntry={true}  onChangeText={(confirmPassword) => this.setState({confirmPassword})} underlineColorAndroid="transparent"/>
                </View>
                <View style={styles.inputWrap}>
                    <View style={styles.iconWrap}>
                        <Image source={userIcon} resizeMode="contain" style={styles.icon}/>
                    </View>
                    <TextInput  style={styles.input} placeholder="Email" onChangeText={(Email) => this.setState({Email})} underlineColorAndroid="transparent"/>
                </View>
                <View style={styles.inputWrap}>
                    <View style={styles.iconWrap}>
                        <Image source={userIcon} resizeMode="contain" style={styles.icon}/>
                    </View>
                    <TextInput  style={styles.input} placeholder="FirstName" onChangeText={(FirstName) => this.setState({FirstName})} underlineColorAndroid="transparent"/>
                </View>
                <View style={styles.inputWrap}>
                    <View style={styles.iconWrap}>
                        <Image source={userIcon} resizeMode="contain" style={styles.icon}/>
                    </View>
                    <TextInput  style={styles.input} placeholder="LastName" onChangeText={(LastName) => this.setState({LastName})} underlineColorAndroid="transparent"/>
                </View>
                <View style={styles.inputWrap}>
                    <View style={styles.iconWrap}>
                        <Image source={userIcon} resizeMode="contain" style={styles.icon}/>
                    </View>
                    <TextInput  style={styles.input} placeholder="DateOfBirth" onChangeText={(DOB) => this.setState({DOB})} underlineColorAndroid="transparent"/>
                </View>
                <View style={styles.inputWrap}>
                    <View style={styles.iconWrap}>
                        <Image source={userIcon} resizeMode="contain" style={styles.icon}/>
                    </View>
                    <TextInput  style={styles.input} placeholder="Address" onChangeText={(Address) => this.setState({Address})} underlineColorAndroid="transparent"/>
                </View>
                <View style={styles.inputWrap}>
                    <View style={styles.iconWrap}>
                        <Image source={userIcon} resizeMode="contain" style={styles.icon}/>
                    </View>
                    <TextInput  style={styles.input} placeholder="Gender" onChangeText={(Gender) => this.setState({Gender})} underlineColorAndroid="transparent"/>
                </View>
                <View style={styles.inputWrap}>
                    <View style={styles.iconWrap}>
                        <Image source={userIcon} resizeMode="contain" style={styles.icon}/>
                    </View>
                    <TextInput  style={styles.input} placeholder="Position" onChangeText={(Position) => this.setState({Position})} underlineColorAndroid="transparent"/>
                </View>
                <View style={styles.inputWrap}>
                    <View style={styles.iconWrap}>
                        <Image source={userIcon} resizeMode="contain" style={styles.icon}/>
                    </View>
                    <TextInput  style={styles.input} placeholder="PhoneNumber" onChangeText={(PhoneNumber) => this.setState({PhoneNumber})} underlineColorAndroid="transparent"/>
                </View>
                <View style={styles.inputWrap}>
                    <View style={styles.iconWrap}>
                        <Image source={userIcon} resizeMode="contain" style={styles.icon}/>
                    </View>
                    <TextInput  style={styles.input} placeholder="Note" onChangeText={(Note) => this.setState({Note})} underlineColorAndroid="transparent"/>
                </View>
                <TouchableOpacity activeOpacity={.5} onPress={this._onPressLogin.bind(this)} keyboardShouldPersistTaps={true}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}> Sign Up</Text>
                    </View>           
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={.5} onPress={() => navigate('MainPage')}>
                    <View >
                        <Text style={styles.forgotPasswordText}>Cancel</Text>        
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
backgroundColor:"#d73352"
},
icon:{
width:20,
height:20,
},
button:{
backgroundColor:"#d73352",
paddingVertical: 8,
marginVertical:8,
alignItems: "center",
justifyContent: "center",
},


  buttonText: {
      fontSize: 16,
      color:'#FFFFFF',
      textAlign: 'center',
     
  },
  forgotPasswordText:{
    color:'#FFFFFF',
       backgroundColor:"transparent",
         textAlign: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

 

module.exports = SignUpPage;