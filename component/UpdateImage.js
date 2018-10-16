import React, {Component} from 'react';
import {
  View, Text, StyleSheet, ScrollView, Alert,
  Image, TouchableOpacity, NativeModules, Dimensions
} from 'react-native';

var ImagePicker = NativeModules.ImageCropPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button:{
    backgroundColor:"#d73352",
    paddingVertical: 8,
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "center",
},
buttonText: {
  fontSize: 16,
  color:'#FFFFFF',
  textAlign: 'center',   
},
  text: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  }
});

export default class App extends Component {
  static navigationOptions = {
    title: 'Request',
  };

  constructor(props) {
    super(props);
    this.state = {
      image: null,
      images: null
    };
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

  render() {
    return (
    <View style={styles.container}>
      <ScrollView>
        {this.state.image ? this.renderAsset(this.state.image) : null}
        {this.state.images ? this.state.images.map(i => <View key={i.uri}>{this.renderAsset(i)}</View>) : null}
      </ScrollView>

      <TouchableOpacity onPress={() => this.pickSingleWithCamera(false)} keyboardShouldPersistTaps={true}>
        <View style={styles.button}>
          <Text style={styles.buttonText}> Select image camera</Text>
        </View>  
      </TouchableOpacity>
      <TouchableOpacity onPress={this.pickMultiple.bind(this)} style={styles.button}>
        <Text style={styles.text}>Select Multiple</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={this.pickMultiple.bind(this)} style={styles.button}>
        <Text style={styles.text}>Update yeu cau</Text>
      </TouchableOpacity>
    </View>);
  }
}