import React, {Component} from 'react';
import {
  View, Text, StyleSheet, ScrollView, TextInput,
  Image, TouchableOpacity, NativeModules, Dimensions, AsyncStorage
} from 'react-native';
import env from './environment/env';

const LATITUDE = 108.193318;
const LONGITUDE = 16.072675;
var ImagePicker = NativeModules.ImageCropPicker;
const BASE_URL = env;
var STORAGE_KEY = 'key_access_token';

export default class App extends Component {
  static navigationOptions = {
    title: 'Request',
  };

  constructor(props) {
    super(props);
    this.state = {
      image: null,
      images: [],
      content: '',
      address: '',
      Area: '',
      latitude: LATITUDE,
      longitude: LONGITUDE,
    };
  }

  componentDidMount(){
  }

  pickSingleWithCamera(cropping) {
    ImagePicker.openCamera({
      cropping: cropping,
      width: 500,
      height: 500,
      includeExif: true,
    }).then(image => {
      console.log('received image', image);
      this.setState({
        image: {uri: image.path, width: image.width, height: image.height},
        images: null
      });
    }).catch(e => alert(e));
  }

  pickMultiple() {
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      includeExif: true,
      forceJpg: true,
    }).then(images => {
      this.setState({
        image: null,
        images: images.map(i => {
          console.log('received image', i);
          return {uri: i.path, width: i.width, height: i.height, mime: i.mime};
        })
      });
    }).catch(e => alert(e));
  }
  renderImage(image) {
    return <Image style={{width: 300, height: 300, resizeMode: 'contain'}} source={image} />
  }

  renderAsset(image) {
    return this.renderImage(image);
  }

  Upload = () => {
    AsyncStorage.getItem(STORAGE_KEY).then((user_data_json) => {
      let token = user_data_json;   
      if(token === undefined){
        var { navigate } = this.props.navigation;
        navigate('LoginPage');
       }    
      let url = BASE_URL + 'Request/InsertRequest';
      let data = new FormData();
      const sessionId = new Date().getTime();
      data.append("Content",this.state.content);
      data.append("Address",this.state.address);
      data.append("Area",this.state.Area)
      data.append("LatIng_longitude",this.state.longitude);
      data.append("Latlng_latitude",this.state.latitude);
      let arrImage = [];
      this.state.image ? arrImage.push(this.state.image) : arrImage = [...this.state.images];
      console.warn('image',arrImage);
      arrImage.map((i) =>{
        data.append("PictureRequest",{
          uri: i.uri,
          type: 'image/jpg',
          name: `${sessionId}.jpg`,
        });
      });
      console.warn('data',data);
      fetch(url,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + token,
          },
        body: data,
      })
      .then((res) => {
        console.warn(res); 
        if(res.ok){
          var { navigate } = this.props.navigation;
          navigate('MainPage');
          alert('Request Success!');
        }
          else {
            alert('Request False!');debugger;
        }
      })
      .catch((err) => {
        console.warn(' loi update image',err);
      })
    })
  }
  render() {
      return (
        <ScrollView>
          <View style= {[styles.container,styles.view]}>
            <ScrollView horizontal = {true}>
              {this.state.image ? this.renderAsset(this.state.image) : null}
              {this.state.images ? this.state.images.map(i => <View key={i.uri}>{this.renderAsset(i)}</View>) : null}
            </ScrollView>
              <TouchableOpacity onPress={() => this.pickSingleWithCamera(false)} keyboardShouldPersistTaps={true}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}> Select image camera</Text>
                </View>  
              </TouchableOpacity>
              <TouchableOpacity onPress={this.pickMultiple.bind(this)} style={styles.button}>
                <Text style={styles.buttonText}>Select Multiple</Text>
              </TouchableOpacity>
            <View style={styles.inputWrap}>
                <TextInput  style={styles.input} placeholder="Content" onChangeText={(content) => this.setState({content})} underlineColorAndroid="transparent"/>
            </View>
            <View style={styles.inputWrap}>
                <TextInput  style={styles.input} placeholder="Address" onChangeText={(address) => this.setState({address})} underlineColorAndroid="transparent"/>
            </View>
            <View style={styles.inputWrap}>
                <TextInput  style={styles.input} placeholder="Area" onChangeText={(Area) => this.setState({Area})} underlineColorAndroid="transparent"/>
            </View>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate('MapsPage')} keyboardShouldPersistTaps={true}>
              <View style={styles.button}>
                <Text style={styles.buttonText}> Open Maps </Text>
              </View>   
            </TouchableOpacity>
            <TouchableOpacity onPress={this.Upload.bind(this)} style={styles.button}>
              <Text style={styles.buttonText}>Send request</Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null
  },
  view: {
    paddingHorizontal:15,
  },
  button:{
    backgroundColor:"#d73352",
    paddingVertical: 8,
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
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
buttonText: {
  fontSize: 16,
  color:'#FFFFFF',
  textAlign: 'center',   
},
  footer: {
    position: 'absolute',
    flex:1,
    left: 0,
    right: 0,
    bottom: 10,
    },
});