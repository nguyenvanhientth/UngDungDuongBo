import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Image,ScrollView,
    AsyncStorage,TouchableOpacity,ImageBackground} from 'react-native';


var STORAGE_KEY = 'key_access_token';
const background = require('./image/hinhnen.jpg') ;

export default class MainPage extends Component {
   static navigationOptions = {
    title: 'Welcome',
    header:null,
  };
    constructor(props) {
    super(props);
  
    this.state = {
      username: '',
    };
  }
  
  componentWillMount() {
    try {
    AsyncStorage.getItem(STORAGE_KEY).then((user_data_json) => {
        let userData = JSON.parse(user_data_json);
            if(userData ==undefined){
                var { navigate } = this.props.navigation;
                navigate('LoginPage');
            }else{
            this.setState({
                username: userData.userName,
            });
            }
        this._onChangeText();
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
        <View style={styles.container}>
            

        </View>
        <View style={styles.footer}>
            <TouchableOpacity activeOpacity={.5} onPress={this._onPressLogOut.bind(this)} keyboardShouldPersistTaps={true}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Hi {this.state.username} Logout</Text>
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
  bottom: -10,
 
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
        marginVertical:8,
        alignItems: "center",
        justifyContent: "center",
    },
  buttonText: {
      fontSize: 16,
      color:'#FFFFFF',
      textAlign: 'center',   
  },
  contents:{
        marginTop: 100,        
        backgroundColor: 'rgba(52, 52, 52, 0.3)'
  },
  quotes: {
     fontSize: 18,
    textAlign: 'center',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  author: {
    textAlign: 'right',
    color: '#FFFFFF',
    marginBottom: 5,
  },
});