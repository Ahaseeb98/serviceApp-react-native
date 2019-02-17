import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Steps from './StepIndicator'
import {  Button, Icon, Input, Picker, Item } from "native-base";

import About from './about'
import Image from './Image'
import Location from './location'

// import AddBuiness from './addBuisness'
export default class Fhjhorm extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
        step:0,
        titles:["About","Image","Location"],
        title: null,
        catagory: null
    };

  }


  value = (e, f) => {
    // console.log('chal raha he sain')
    // let {value, name} = e.target;
    console.log(e, f)
  }

  render() {
      const {step,titles}=this.state
    return (
      <View style={{height:'100%'}}>
      
<Text>{"\n"}</Text>
        <Steps style={{marginTop:40}} step={this.props.next} titles={titles}  />     
        

        {this.props.next ==0?(<About value={this.value.bind(this)}/>):null}
        {this.props.next ==1?(<Image value={this.value.bind(this)}/>):null}

        {this.props.next ==2?(<Location value={this.value.bind(this)}/>):null}




<Button style={{position:'absolute',width:100,color:'white',right:0,bottom:0}} onPress={()=>this.setState({step:step+1})}><Text>Next</Text></Button>
     


      </View>
    );
  }
}


const styles = StyleSheet.create({
  header: {
      backgroundColor: '#00dba0',
  },
  headerText: {
      color: 'white',
      flex: 1,
      flexDirection: 'row',
      padding: 12,
      fontWeight: '500'
  },
  inputCont: {
      flex: 1,
      flexDirection: 'column'
  },
  heading: {
      flex: 1,
      alignSelf: 'center',
      padding: 15,
      textDecorationLine: "underline",
      textDecorationStyle: "solid",
      },
      input: {
          margin: 5
      }
});



