import React, {Component} from 'React';
import {AppRegistry,FlatList,StyleSheet,Text,View,Image,Alert,TouchableHighlight,Platform} from 'react-native';
import flatlistData from '../data/flatlistData';
import Swipeout from 'react-native-swipeout';

class FlatListItem extends Component{
    constructor(props){
        super(props);
        this.state= {
            activeRowkey: null,
        }
    }

    render() {
        const swipeSetting = {
            autoClose : true,
            onClose: (setID, rowId, direction) => {
                if (this.state.activeRowkey != null) {
                    this.setState({activeRowkey : null})
                }       
            },
            onOpen: (setID, rowId, direction) => {
                this.setState({activeRowkey: this.props.item.key})
            },
            right: [
                {
                    onPress: () => {
                        const deletingRow = this.state.activeRowkey;
                        Alert.alert(
                            'Alert',
                            'Ban that su muon xoa??',
                            [
                                {text:'No',onPress: ()=> console.log('Cancel Pressed'),style:'cancel'},
                                {text:'Yes', onPress: () =>{
                                    flatlistData.splice(this.props.index, 1);
                                    //reset flatlist
                                    this.props.parentFlatlist.resetFlatlist(deletingRow);
                                }},
                            ],
                            {cancelable: true}
                        )
                    },
                    text:'Delete', type: 'delete'
                }
            ],
            rowId: this.props.index,
            sectionId: 1,
        };
        return(
            <Swipeout {...swipeSetting}>
                <View style ={{
                flex:1,
                flexDirection: 'column'
            }}>
                <View style = {{
                flex: 1,
                flexDirection: 'row',
                //backgroundColor: this.props.index % 2 ==0 ? 'mediumseagreen': 'tomato'
                backgroundColor: 'mediumseagreen'
            }}>
                <Image 
                    source = {{uri: this.props.item.imageUrl}}
                    style = {{width:100,height:100,margin:5}}>

                </Image>
                <View style = {{
                    flex:1,
                    flexDirection: 'column'
                }}>
                    <Text style = {style.flatlistitem}>{this.props.item.name}</Text>
                    <Text style = {style.flatlistitem}>{this.props.item.key}</Text>
                </View>
                </View>
                <View style ={{
                    height:1,
                    backgroundColor: 'white'
                }}>

                </View>
            </View>
            </Swipeout>
        )
            }
    }

const style = StyleSheet.create({
    flatlistitem : {
        color: 'white',
        padding: 10,
        fontSize: 16,
    }
});

export default class FlatListItems extends Component{
    constructor(props){
        super(props);
        this.state= {
            activeRowkey: null,
        }
    }
//neu tao ham them moi Key resetFlatList(activeKey)
    resetFlatlist = (deleteKey) => { 
        this.setState((prevState) => {
            return {
                deleteRowkey: deleteKey
            }
        });
        this._onPressAdd = this._onPressAdd.bind(this);
    }
    _onPressAdd = () =>{
        //alert("Ban muon them items!")
        this.refs.AddItem.showAddItem();
    }
    render(){
        return(
            <View style = {{flex: 1, marginTop: Platform.OS ==='ios' ? 34 : 0 }}>
                <View style ={{
                    backgroundColor: 'white',
                    height: 52,
                    flexDirection: 'row',
                    justifyContent: "flex-end",
                    alignItems: 'center'
                    }}>
                    <TouchableHighlight style = {{
                            marginRight: 10,
                    }}
                        underlayColor = 'gray'
                        onPress ={this._onPressAdd} >
                        <Image
                            style = {{ width:35 , height: 35}}
                            source = {require('../icon/add.jpg')}
                        />
                    </TouchableHighlight>
                </View>
                <FlatList
                    data={flatlistData}
                    renderItem={({item,index}) =>{
                        return (
                            <FlatListItem item={item} index = {index} parentFlatlist={this}>
                            </FlatListItem>
                            )
                        }
                    }>
                </FlatList>
            </View>
        );
    }
}