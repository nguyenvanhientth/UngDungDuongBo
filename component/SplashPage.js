import React, { Component } from 'react';
import {Image,Text,View,StatusBar,Navigator,AsyncStorage,} from 'react-native';
import {StackNavigator,} from 'react-navigation';
 
var STORAGE_KEY = 'key_access_token';

class SplashPage extends Component {
   constructor(props) {
	  super(props); 
    }
    
  componentWillMount() {
    var pageUrl='LoginPage';
    try { 
        AsyncStorage.getItem(STORAGE_KEY).then((user_data_json) => {
        let userData = JSON.stringify(user_data_json);
        if(userData !== undefined){      
            pageUrl = 'MainPage';
        }                        
        });
    } catch (error) {
        console.log('AsyncStorage error: ' + error.message);
        }
    var { navigate } = this.props.navigation;
    setTimeout(() => {
      navigate (pageUrl, null);
    }, 3000);
  }

    static navigationOptions = {
        title: 'Welcome',
        header: null,
    };

  render() {
    return (
        <View style={{flex: 1, backgroundColor: '#246dd5', alignItems: 'center', justifyContent: 'center'}}>
            
            <Image
                style={{width: 350, height: 350}}
                source={{uri: 'https://dulieu.itrithuc.vn/uploads/group/2018-08-13-010716.8487832017-12-30-081545.841749quoc-huy2x.png'}}
                />
        </View>
    );
  }
}

module.exports = SplashPage;