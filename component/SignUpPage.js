import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,TextInput,Button,View,Alert,TouchableOpacity,
  Image,AsyncStorage,ToastAndroid,ImageBackground, ScrollView, Picker} from 'react-native';
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
      let position = this.state.Position;
      let PhoneNumber = this.state.PhoneNumber;
      let Note = this.state.Note;
      // kiem tra o day 
      if (password !== confirmPassword) {
        Alert.alert('Invalid Request', 'Inputs of "password" and "confirm password" do not match');
      } 
      else{
        let data = new FormData();
        data.append('username', userName);
        data.append('password', password);
        data.append('confirmPassword', confirmPassword);
        data.append('Email', Email);
        data.append('FirstName', FirstName);
        data.append('LastName', LastName);
        data.append('DOB', DOB);
        data.append('Gender', Gender);
        data.append('Address', Address);
        data.append('Position', position);
        data.append('PhoneNumber', PhoneNumber);
        data.append('Note', Note);

        fetch(serviceUrl,{
            method: "POST",          
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data'
            },
        body: data
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
    }
    _onChaneUserName = (userName) =>{
        this.setState({userName});
    }
    _onChanePassWord = (password) =>{
        this.setState({password});
    }
    _onChaneConfirmPassword = (confirmPassword) =>{
        this.setState({confirmPassword});
    }
    _onChaneEmail = (Email) =>{
        this.setState({Email});
    }
    _onChaneFirstName = (FirstName) =>{
        this.setState({FirstName});
    }
    _onChaneLastName = (LastName) =>{
        this.setState({LastName});
    }
    _onChaneDOB = (DOB) =>{
        this.setState({DOB});
    }
    _onChaneAddress = (Address) =>{
        this.setState({Address});
    }
    _onChanePosition = (position) =>{
        this.setState({position});
    }
    _onChanePhoneNumber = (PhoneNumber) =>{
        this.setState({PhoneNumber});
    }
    _onChaneNote = (Note) =>{
        this.setState({Note});
    }
    render() {
        var { navigate } = this.props.navigation;
    return (
        <ImageBackground style={[styles.container, styles.background]}
            source = {background}  resizeMode="cover">
            <ScrollView>
            <View style={styles.container}/>
                <View style={styles.wrapper}>
                    <View style={styles.inputWrap}>
                        <View style={styles.iconWrap}>
                            <Image source={userIcon} resizeMode="contain" style={styles.icon}/>
                        </View>
                        <TextInput  style={styles.input} placeholder="Username" onChangeText={this._onChaneUserName.bind(this)} underlineColorAndroid="transparent"/>
                    </View>
                        <View style={styles.inputWrap}>
                            <View style={styles.iconWrap}>
                                <Image source={lockIcon} resizeMode="contain" style={styles.icon}/>
                            </View>
                            <TextInput style={styles.input} placeholder="Password"  secureTextEntry={true}  onChangeText={this._onChanePassWord.bind(this)} underlineColorAndroid="transparent"/>
                        </View>
                    <View style={styles.inputWrap}>
                        <View style={styles.iconWrap}>
                            <Image source={lockIcon} resizeMode="contain" style={styles.icon}/>
                        </View>
                        <TextInput style={styles.input} placeholder="Confirm Password"  secureTextEntry={true}  onChangeText={this._onChaneConfirmPassword.bind(this)} underlineColorAndroid="transparent"/>
                    </View>
                    <View style={styles.inputWrap}>
                        <View style={styles.iconWrap}>
                            <Image source={userIcon} resizeMode="contain" style={styles.icon}/>
                        </View>
                        <TextInput  style={styles.input} placeholder="Email" onChangeText={this._onChaneEmail.bind(this)} underlineColorAndroid="transparent"/>
                    </View>
                    <View style={styles.inputWrap}>
                        <View style={styles.iconWrap}>
                            <Image source={userIcon} resizeMode="contain" style={styles.icon}/>
                        </View>
                        <TextInput  style={styles.input} placeholder="FirstName" onChangeText={this._onChaneFirstName.bind(this)} underlineColorAndroid="transparent"/>
                    </View>
                    <View style={styles.inputWrap}>
                        <View style={styles.iconWrap}>
                            <Image source={userIcon} resizeMode="contain" style={styles.icon}/>
                        </View>
                        <TextInput  style={styles.input} placeholder="LastName" onChangeText={this._onChaneLastName.bind(this)} underlineColorAndroid="transparent"/>
                    </View>
                    <View style={styles.inputWrap}>
                        <View style={styles.iconWrap}>
                            <Image source={userIcon} resizeMode="contain" style={styles.icon}/>
                        </View>
                        <TextInput  style={styles.input} placeholder="DateOfBirth" onChangeText={this._onChaneDOB.bind(this)} underlineColorAndroid="transparent"/>
                    </View>
                    <View style={styles.inputWrap}>
                        <View style={styles.iconWrap}>
                            <Image source={userIcon} resizeMode="contain" style={styles.icon}/>
                        </View>
                        <TextInput  style={styles.input} placeholder="Address" onChangeText={this._onChaneAddress.bind(this)} underlineColorAndroid="transparent"/>
                    </View>
                    <View style={{flexDirection:"row",marginVertical: 5,height:36,}}>
                        <View style={styles.iconWrap}>
                            <Image source={userIcon} resizeMode="contain" style={styles.icon}/>
                        </View>
                        <Text style = {styles.label}>Gender</Text>
                        <Picker
                            selectedValue={this.state.Gender}
                            style={styles.combobox}
                            onValueChange={(itemValue, itemIndex) => this.setState({Gender: itemValue})}>
                            <Picker.Item label="Nam" value="Nam" />
                            <Picker.Item label="Nữ" value="Nữ"/>
                        </Picker>
                    </View>
                    <View style={styles.inputWrap}>
                        <View style={styles.iconWrap}>
                            <Image source={userIcon} resizeMode="contain" style={styles.icon}/>
                        </View>
                        <Text style = {styles.label}>Position</Text>
                        <Picker
                            selectedValue={this.state.position}
                            style={styles.combobox}
                            onValueChange={(itemValue, itemIndex) => this.setState({position: itemValue})}>
                            <Picker.Item label="Admin" value="Admin" />
                            <Picker.Item label="Supervisor" value="Supervisor"/>
                            <Picker.Item label="Repair Person" value="Repair Person" />
                        </Picker>
                    </View>
                    <View style={styles.inputWrap}>
                        <View style={styles.iconWrap}>
                            <Image source={userIcon} resizeMode="contain" style={styles.icon}/>
                        </View>
                        <TextInput  style={styles.input} placeholder="PhoneNumber" onChangeText={this._onChanePhoneNumber.bind(this)} underlineColorAndroid="transparent"/>
                    </View>
                    <View style={styles.inputWrap}>
                        <View style={styles.iconWrap}>
                            <Image source={userIcon} resizeMode="contain" style={styles.icon}/>
                        </View>
                        <TextInput  style={styles.input} placeholder="Note" onChangeText={this._onChaneNote.bind(this)} underlineColorAndroid="transparent"/>
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
            </ScrollView>
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
    combobox: {
        backgroundColor: '#F2F2F2',
        height: 36,
        width: 150,
        paddingHorizontal: 5,
        alignItems: 'center'

    },
    label: {
        flex: 1, 
        backgroundColor: '#585858',
        marginRight: 100,
        textAlign: "center",
        paddingHorizontal: 5,
        paddingTop: 5,
        fontSize: 20,
        color: "#FFF"
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