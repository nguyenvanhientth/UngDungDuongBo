import React, { Component } from 'react';
import {Image,Text,View,StyleSheet,TextInput,TouchableOpacity} from 'react-native';
import {StackNavigator,} from 'react-navigation';
import env from './environment/env';

const BASE_URL = env;
const EmailIcon = require('./image/email.png');
const userIcon = require('./image/ic_user.png');

class ForgotPassPage extends Component {
   
    static navigationOptions = {
        title: 'Forgot PassWord',
        headers: null
      };
      constructor(props) {
        super(props);
        this.state = {
          userNames: '',
          Email: '',
        };
      }
      _onChaneText = (userNames) => {
          this.setState({
            userNames,
          })
      }
      _onChaneEmail = (Email) => {
        this.setState({Email})
      }
      _onPressForgot = () => {
            let url = BASE_URL + "Account/ForgotPassword";
            let userName = this.state.userNames;
            let Email = this.state.Email;
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
            if (userName === '' ||Email === "") {
                alert('Ban chua nhap day du! ');
            } else if (reg.test(Email) === false)
            {
                alert('Email is not correct!');
                this.setState({Email:''})
            } 
            else {
                fetch(url,{
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      },
                    body: JSON.stringify({
                        'UserName' : userName,
                        'Email' :Email
                        })
                })
                .then((resJson) => {
                    //console.warn(resJson);
                    if (resJson.ok) {
                        alert(`Yeu cau thanh cong! Ban vao email: ${Email} de lay mat khau moi!`);
                    } else {
                        alert('Request false! You checking!');
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
            }

      }
  render() {
    return (
        <View style={styles.container}>
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
                        <Image source={EmailIcon} resizeMode="contain" style={styles.icon}/>
                    </View>
                    <TextInput style={styles.input} placeholder="gmail@gmail.com" textContentType = {"emailAddress"}  onChangeText={this._onChaneEmail.bind(this)} underlineColorAndroid="transparent"/>
                </View>
                <TouchableOpacity activeOpacity={.5} onPress={this._onPressForgot.bind(this)} keyboardShouldPersistTaps={true}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}> Request </Text>
                    </View>      
                </TouchableOpacity>
            </View>  
            <View style={styles.container}/>       
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#CEE3F6',
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
})

module.exports = ForgotPassPage;