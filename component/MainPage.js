import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Image,ScrollView,
    AsyncStorage,TouchableOpacity,ImageBackground} from 'react-native';
import env from './environment/env';
import Dialog from "react-native-dialog";


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
      dialogVisible: false,
      passOld: '',
      passNew: '',
      passConfig: ''
    };
  }
  
  componentWillMount() {
    try {
        AsyncStorage.getItem(STORAGE_KEY).then((user_data_json) => {
            let token = user_data_json;        
            //console.warn(token);
            fetch(BASE_URL + "Account/GetUserInformation",{
                //method: "GET",
                headers:{ 
                    'cache-control': 'no-cache',
                    Authorization: 'Bearer ' + token,
                }
            }).then((res)=>res.json())
            .then((resJson) => {
                //console.warn("resJson",resJson);debugger;
                this.setState({
                    firstName: resJson.firstName,
                    lastName: resJson.lastName,
                    userName: resJson.userName,
                    Email: resJson.email,
                    Address: resJson.address,
                    Position: resJson.positionName,
                    PhoneNumber: resJson.phoneNumber,
                    DOB: resJson.dateOfBirth,
                    Gender: resJson.gender
                });       
            })
            .catch ((error) => {
                console.warn('AsyncStorage error:' + error.message);
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
    dialogShow = ()=>{
        this.setState({
            dialogVisible: true,
        })
    }
    _onChanePass = (pass)=>{
        this.setState({
            passOld:pass
        })
    }
    _onChanePassNew = (pass)=>{
        this.setState({
            passNew:pass
        })
    }
    _onChanePassConfig = (pass)=>{
        this.setState({
            passConfig:pass
        })
    }
    handleCancel = ()=>{
        this.setState({
            dialogVisible: false
        })
    }
    handleOk = ()=>{
        AsyncStorage.getItem(STORAGE_KEY).then((json_key) => {
            let token = json_key;
            if (token === undefined) {
                var{navigate} = this.props.navigation;
                navigate('LoginPage');
            }
            let passN = this.state.passNew;
            let passO = this.state.passOld;
            let passC = this.state.passConfig;
            if (passN !== passC) {
                alert('You input password new and confirm not duplicate!')
            } else {
                let url = BASE_URL + 'Account/ChangePassword'
                fetch(url,{
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                         Authorization: 'Bearer ' + token,
                    },
                    body: JSON.stringify({
                        'CurrentPassword':passO,
                        'NewPassword': passN,
                        'NewPasswordConfirm': passC
                    })
                })
                .then((r) => r.json())
                .then((res) => {
                    if (res.ok) {
                        var {navigate} = this.props.navigation;
                        navigate('MainPage');
                        alert('ChanePassword Success!')
                    } else {
                        alert('ChanePassword False!')
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        })
        this.setState({
            dialogVisible: false
        })
    }


 render() {
     if (this.state.Position === "Admin") {
        return (
            <ImageBackground style={[styles.container, styles.background]}
                source = {background}  resizeMode="cover">
            <Text style = {styles.text}> Hi {this.state.firstName}</Text>
            <View style={styles.ThongTin}>
                <Text style={styles.text}> userName: {this.state.userName} </Text>
                <Text style={styles.text}> firstName: {this.state.firstName} </Text>
                <Text style={styles.text}> lastName: {this.state.lastName} </Text>
                <Text style={styles.text}> Address: {this.state.Address} </Text>
                <Text style={styles.text}> Email: {this.state.Email} </Text>
                <Text style={styles.text}> DateOfBirth: {this.state.DOB} </Text>
                <Text style={styles.text}> Gender: {this.state.Gender} </Text>
                <Text style={styles.text}> Phone: {this.state.PhoneNumber} </Text>
                <Text style={styles.text}> Position: {this.state.Position}</Text>
            </View>
            <View style={styles.footer}>
                <TouchableOpacity activeOpacity={.5} onPress={this.dialogShow.bind(this)} keyboardShouldPersistTaps={true}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}> ChanePassWord </Text>
                        </View>   
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={.5} onPress={()=>this.props.navigation.navigate('AreaPage')} keyboardShouldPersistTaps={true}>
                        <View style={styles.button}>
                            <Text style={styles.buttonText}> Area </Text>
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
            <Dialog.Container visible = {this.state.dialogVisible}>
            <Dialog.Title>Chane PassWord</Dialog.Title>
            <Dialog.Input placeholder = 'Input password old!' onChangeText = {this._onChanePass.bind(this)}></Dialog.Input>
            <Dialog.Input placeholder = 'Input password new!' onChangeText = {this._onChanePassNew.bind(this)}></Dialog.Input>
            <Dialog.Input placeholder = 'Input enter new password!' onChangeText = {this._onChanePassConfig.bind(this)}></Dialog.Input>
            <Dialog.Button label="Ok" onPress={this.handleOk} />
            <Dialog.Button label="Cancel" onPress={this.handleCancel} />
            </Dialog.Container>
           </ImageBackground>
        );
     } else {
        return (
            <ImageBackground style={[styles.container, styles.background]}
                source = {background}  resizeMode="cover">
                <Text style = {{color: "#0404B4", fontSize: 30}}> Hi {this.state.firstName}</Text>
                <View style={styles.ThongTin}>
                    <Text style = {{fontSize: 32, color: "black", textAlign: 'left'}}>Thong Tin:</Text>
                    <Text style={styles.text}> userName: {this.state.userName} </Text>
                    <Text style={styles.text}> firstName: {this.state.firstName} </Text>
                    <Text style={styles.text}> lastName: {this.state.lastName} </Text>
                    <Text style={styles.text}> Address: {this.state.Address} </Text>
                    <Text style={styles.text}> Email: {this.state.Email} </Text>
                    <Text style={styles.text}> DateOfBirth: {this.state.DOB} </Text>
                    <Text style={styles.text}> Gender: {this.state.Gender} </Text>
                    <Text style={styles.text}> Phone: {this.state.PhoneNumber} </Text>
                    <Text style={styles.text}> Position: {this.state.Position}</Text>
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
        backgroundColor:"#5858FA",
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
    alignItems: "flex-start",
    position: "relative",
    borderRadius: 20,
    margin: 10,
    paddingTop: 10,
    paddingBottom: 20
  }
});