import React, { Component } from 'react';
import {Image,Text,View,StatusBar,Navigator,} from 'react-native';
import {StackNavigator,} from 'react-navigation';


class ForgotPassPage extends Component {
   
    componentWillMount() {
    }
   static navigationOptions = {
    title: 'Forgot Password',
     };
 
  render() {
    return (
        <View style={{flex: 1, backgroundColor: '#3399cc', alignItems: 'center', justifyContent: 'center'}}>
            <Image
            style={{width: 350, height: 350}}
            source={{uri: 'https://dulieu.itrithuc.vn/uploads/group/2018-08-13-010716.8487832017-12-30-081545.841749quoc-huy2x.png'}}
            />
        </View>
    );
  }
}
module.exports = ForgotPassPage;