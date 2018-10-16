import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Image,ScrollView,
    AsyncStorage,TouchableOpacity,ImageBackground} from 'react-native';
import env from './environment/env';


var STORAGE_KEY = 'key_access_token';
const background = require('./image/hinhnen.jpg') ;
const BASE_URL = env;

export default class MainPage extends Component {
   static navigationOptions = {
    title: 'Welcome',
  };
    constructor(props) {
    super(props);
  
    this.state = {
      firstName: '',
      lastName: '',
      userName: '',
      Email: '',
      DOB: '',
      Address: '',
      Gender: '',
      Position: '',
      PhoneNumber: '',
    };
  }
  
  componentWillMount() {
    try {
        AsyncStorage.getItem(STORAGE_KEY).then((user_data_json) => {
            let token = user_data_json;        
            console.warn(token);
            fetch(BASE_URL + "Account/GetUserInformation",{
                //method: "GET",
                headers:{ 
                    'cache-control': 'no-cache',
                    Authorization: 'Bearer ' + token,
                }
            }).then((res)=>res.json())
            .then((resJson) => {
                console.warn("resJson",resJson);
                this.setState({
                    firstName: resJson.firstName,
                    lastName: resJson.lastName,
                    userName: resJson.userName,
                    Email: resJson.email,
                    Address: resJson.address,
                    Position: resJson.position,
                    PhoneNumber: resJson.phoneNumber,
                    DOB: resJson.dateOfBirth,
                    Gender: resJson.gender
                });          
            })
            .catch ((error) => {
                console.log('AsyncStorage error: ' + error.message);
            })
                // if(token ==undefined){
                //     var { navigate } = this.props.navigation;
                //     navigate('LoginPage');
                // }else{
                // this.setState({
                //     username: userData.userName,
                // });
                // }
        //    this._onChangeText();debugger;
        });


    } catch (error) {
        console.log('AsyncStorage error: ' + error.message);
        }            
  }
    _onPressLogOut (event) {
       try {
            AsyncStorage.removeItem(STORAGE_KEY);
            var { navigate } = this.props.navigation;
            navigate('LoginPage');
        } catch (error) {
            console.log('AsyncStorage error: ' + error.message);
        }   
    }

 render() {
    return (
        <ImageBackground style={[styles.container, styles.background]}
            source = {background}  resizeMode="cover">
        <Text style = {styles.text}> Hi {this.state.firstName}</Text>
        <View style={styles.ThongTin}>
            <Text style={styles.text}> userName: {this.state.userName} </Text>
            <Text style={styles.text}> firstName: {this.state.firstName} </Text>
            <Text style={styles.text}> lastName: {this.state.lastName} </Text>
            <Text style={styles.text}> Dia chi: {this.state.Address} </Text>
            <Text style={styles.text}> Email: {this.state.Email} </Text>
            <Text style={styles.text}> Ngay sinh: {this.state.DOB} </Text>
            <Text style={styles.text}> Gioi tinh: {this.state.Gender} </Text>
            <Text style={styles.text}> Phone: {this.state.PhoneNumber} </Text>
        </View>
        <View style={styles.footer}>
            <TouchableOpacity activeOpacity={.5} onPress={()=>this.props.navigation.navigate('UpdateImagePage')} keyboardShouldPersistTaps={true}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}> Up image </Text>
                    </View>   
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.5} onPress={()=>this.props.navigation.navigate('UpdateImagePage')} keyboardShouldPersistTaps={true}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}> Display checked </Text>
                    </View>   
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.5} onPress={()=>this.props.navigation.navigate('SignUpPage')} keyboardShouldPersistTaps={true}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}> Sign Up</Text>
                    </View>   
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.5} onPress={this._onPressLogOut.bind(this)} keyboardShouldPersistTaps={true}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Logout</Text>
                </View>      
            </TouchableOpacity> 
        </View>
       </ImageBackground>
    );
  } 
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,    
  },
  footer: {
    position: 'absolute',
    flex:1,
    left: 0,
    right: 0,
    bottom: 10,
 
    },
background:{
    width: null,
    height:null,
  },
  wrapper:{
      paddingHorizontal:15,
  },
    button:{
        backgroundColor:"#d73352",
        paddingVertical: 8,
        marginVertical:3,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
        marginLeft: 20,
        marginRight: 20
    },
  buttonText: {
      fontSize: 16,
      color:'#FFFFFF',
      textAlign: 'center',   
  },
  text: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center'
  },
  ThongTin: {
    backgroundColor: '#fff',
    alignItems: "center",
    position: "relative",
    borderRadius: 20,
    margin: 10
  }
});