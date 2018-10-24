import React, { Component } from "react";
import { Text, TouchableOpacity, View, StyleSheet, FlatList, AsyncStorage } from "react-native";
import Dialog from "react-native-dialog";
import env from './environment/env';

const BASE_URL = env;
var STORAGE_KEY = 'key_access_token';
 
export default class AreaDialog extends Component {
    constructor(props){
        super(props);
        this.state = {
            dialogVisible: false,
            data: [],
            AreaName: '',
            dialogEdit: false,
            dialogName: false,
            dialogStatus: false
    }
  };
  componentDidMount(){
    AsyncStorage.getItem(STORAGE_KEY).then((user_data_json) => {
        let token = user_data_json;   
        if(token === undefined){
          var { navigate } = this.props.navigation;
          navigate('LoginPage');
        }    
        let url = BASE_URL + 'AreaWorking/GetAreaValues';
        fetch(url,{
            headers: {
              'cache-control': 'no-cache',
              Authorization: 'Bearer ' + token,
              },
          })
          .then((res) => res.json())
          .then((resData) => { 
              this.setState({
                  data : resData
                });
                console.warn('data',this.state.data);
            })
          .catch((err) => {
            console.warn(' loi update Area1',err);
          })
        })
    }

  showDialog = () => {
    this.setState({ dialogVisible: true });
  };
  showDialogEdit = () => {
    this.setState({
      dialogEdit: true,
    })
  }
  showDialogName =() =>{
    this.setState({dialogName: true,dialogEdit:false})
  }
  showDialogStatus =() =>{
    this.setState({dialogStatus: true,dialogEdit:false})
  }
  handleCancel = () => {
    this.setState({ 
      dialogVisible: false,
      dialogEdit: false,
      dialogName: false,
      dialogStatus: false
    });
  };
  handleNameOk = ()=>{

  }
  handleStatusOk=() =>{
    AsyncStorage.getItem(STORAGE_KEY).then((user_data_json) => {
      let token = user_data_json;   
      if(token === undefined){
        var { navigate } = this.props.navigation;
        navigate('LoginPage');
       }    
      let url = BASE_URL + 'AreaWorking/ChangeAreaWorkingStatus';
      let AreaName = this.state.AreaName;
      fetch(url,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
          },
        body: JSON.stringify({
          'Area': AreaName,
        })
      })
      .then((res) => {
        //console.warn('update',res); 
        if(res.ok){
          var { navigate } = this.props.navigation;
          navigate('AreaPage');
          alert('Edit Success!');
        }
          else {
            alert('Edit False!');
        }
      })
      .catch((err) => {
        console.warn(' loi Edit Area',err);
      })
    })
  this.setState({ dialogStatus: false });
  }
 
  handleOk = () => {
    AsyncStorage.getItem(STORAGE_KEY).then((user_data_json) => {
        let token = user_data_json;   
        if(token === undefined){
          var { navigate } = this.props.navigation;
          navigate('LoginPage');
         }    
        let url = BASE_URL + 'AreaWorking/AddAreaWorking';
        let AreaName = this.state.AreaName;
        fetch(url,{
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
            },
          body: JSON.stringify({
            'Area': AreaName,
          })
        })
        .then((res) => {
          //console.warn('update',res); 
          if(res.ok){
            var { navigate } = this.props.navigation;
            navigate('AreaPage');
            alert('Add Success!');
          }
            else {
              alert('Add False!');
          }
        })
        .catch((err) => {
          console.warn(' loi Add Area',err);
        })
      })
    this.setState({ dialogVisible: false });
  };
  _onChaneArea = (AreaName)=>{
    this.setState({AreaName})
  }
  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          flex: 1,
          backgroundColor: "#607D8B",
          paddingHorizontal: 5,
        }}
      />
    );
  }

  render() {
    return (
      <View style={styles.container} >
        <Text style={styles.h2text}>
          Area 
        </Text>
          <FlatList
          data={this.state.data}
          ItemSeparatorComponent = {this.FlatListItemSeparator}
          renderItem={({item}) =>
          <TouchableOpacity style={styles.flatview} onLongPress = {this.showDialogEdit}>
            <Text style={styles.name}>{item.area}</Text>
            <Text style={styles.email}>{String(item.status)}</Text>
          </TouchableOpacity>
          }
          keyExtractor={item => item.area}
        />
        <TouchableOpacity onPress={this.showDialog} style= {styles.add}>
          <Text style = {styles.name}>Add New Area</Text>
        </TouchableOpacity>
        <Dialog.Container visible = {this.state.dialogVisible}>
          <Dialog.Title>Add new Area</Dialog.Title>
          <Dialog.Input placeholder = 'Input New Area!' onChangeText = {this._onChaneArea.bind(this)}></Dialog.Input>
          <Dialog.Button label="Ok" onPress={this.handleOk} />
          <Dialog.Button label="Cancel" onPress={this.handleCancel} />
        </Dialog.Container>
        <Dialog.Container visible = {this.state.dialogEdit}>
          <Dialog.Title>Edit Area</Dialog.Title>
          <Dialog.Button label="EditName" onPress={this.showDialogName} />
          <Dialog.Button label="EditStatus" onPress={this.showDialogStatus} />
          <Dialog.Button label="Cancel" onPress={this.handleCancel} />
        </Dialog.Container>
        <Dialog.Container visible = {this.state.dialogName}>
          <Dialog.Title>Edit Name</Dialog.Title>
          <Dialog.Input placeholder = 'Input New AreaName!' onChangeText = {this._onChaneArea.bind(this)}></Dialog.Input>
          <Dialog.Button label="EditName" onPress={this.handleNameOk} />
          <Dialog.Button label="Cancel" onPress={this.handleCancel} />
        </Dialog.Container>
        <Dialog.Container visible = {this.state.dialogStatus}>
          <Dialog.Title>You Want Edit Status?</Dialog.Title>
          <Dialog.Button label="EditStatus" onPress={this.handleStatusOk} />
          <Dialog.Button label="Cancel" onPress={this.handleCancel} />
        </Dialog.Container>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      //alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    h2text: {
      marginTop: 10,
      fontFamily: 'Helvetica',
      fontSize: 36,
      fontWeight: 'bold',
      alignItems: 'center',
      textAlign: 'center'
    },
    flatview: {
      justifyContent: 'center',
      paddingTop: 30,
      borderRadius: 2,
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center'
    },
    name: {
      fontFamily: 'Verdana',
      fontSize: 18,
    },
    email: {
      color: 'red'
    },
    add: {
      alignItems: 'center', 
      backgroundColor: '#58ACFA',
      borderRadius: 10,
      paddingVertical: 8,
      marginVertical:8,
      margin: 10
    }
})