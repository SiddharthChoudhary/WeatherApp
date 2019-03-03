//import PushNotification from 'react-native-push-notification';
import React, {Component} from 'react'
//import {PushNotificationIOS} from 'react-native';
import {Text, View, Button, StyleSheet} from  'react-native';
import {pushNotifications} from '../services'
import PureChart from 'react-native-pure-chart';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

class DailyChart extends React.Component{
  constructor(props){
    super(props)
    const {navigation} = this.props;
    response = navigation.getParam('response');
    this.state={
      response:response,
      x_cordinate:null,
      y_cordinate:null,
      viewGraph:true,
      sampleData:[],
      showButton:true
    }
  }
  showGraph(){
    if(this.state.viewGraph){
      return(
        <View>
        <PureChart data={this.state.sampleData} type='line' />
        </View>
      )
    }
  }
  parseTheDailyData(response){
    let listresponse = response.list;
    let x_cordinate = [];
    let y_cordinate = [];
    //An iterator for uploading on the list of objects, here I am using a set to add unique days in the Array
    let uniqueDateSet = new Set();
    for(i of listresponse){
      console.log("This is my key"+ i);
    Object.keys(i).map(e =>{
        if(i.hasOwnProperty("dt_txt")){
          let dt_txt  = i.dt_txt;
          var keyArrayForSeparatingDateAndTime = dt_txt.split(" ");
          console.log(keyArrayForSeparatingDateAndTime[0]+" and the value is"+ keyArrayForSeparatingDateAndTime[1])
          if(keyArrayForSeparatingDateAndTime[0]!= undefined){
            if(!uniqueDateSet.has(keyArrayForSeparatingDateAndTime[0])){
              uniqueDateSet.add(keyArrayForSeparatingDateAndTime[0]);
              x_cordinate.push(keyArrayForSeparatingDateAndTime[0]);
              y_cordinate.push(i.main.temp);
            }
          }
        }
    })
  }
    let sampleData = []
    for(i=0;i<x_cordinate.length;i++){
        var sampleDataItem = new Object();
         sampleDataItem.x  = x_cordinate[i];
         sampleDataItem.y  = y_cordinate[i];
         sampleData.push(sampleDataItem);
    }
    this.setState({
      x_cordinate:x_cordinate,
      y_cordinate:y_cordinate,
      sampleData:sampleData,
      viewGraph:true,
      showButton:false
    })
  }
  render() {

 return (
   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
   {
    (this.state.showButton) ?
   <Button title="Show" onPress={()=> this.parseTheDailyData(this.state.response)}>
   </Button>
   :
   this.showGraph()
   }
   </View>
 );
}
}
class HourlyChart extends React.Component {
  constructor(props){
    super(props)
    const {navigation} = this.props;
    response = navigation.getParam('response');
    this.state={
      response:response,
      x_cordinate:null,
      y_cordinate:null,
      viewGraph:true,
      sampleData:[],
      showButton:true
    }
  }
  showGraph(){
    if(this.state.viewGraph){
      return(
        <View style={{transform:[{rotate:'90deg'}]}}>
        <PureChart data={this.state.sampleData} type='line' />
        </View>
      )
    }
  }
  parseTheHourlyData(){
    let listresponse = response.list;
    let x_cordinate = [];
    let y_cordinate = [];
    //An iterator for uploading on the list of objects, here I am using a set to add unique days in the Array
    let uniqueTimeSet = new Set();
    for(i of listresponse){
    Object.keys(i).map(e =>{
        if(i.hasOwnProperty("dt_txt")){
          let dt_txt  = i.dt_txt;
          var keyArrayForSeparatingDateAndTime = dt_txt;
              x_cordinate.push(keyArrayForSeparatingDateAndTime);
              y_cordinate.push(i.main.temp);
            }
    })
  }
    let sampleData = []
    for(i=0;i<x_cordinate.length;i++){
        var sampleDataItem = new Object();
         sampleDataItem.x  = x_cordinate[i];
         sampleDataItem.y  = y_cordinate[i];
         sampleData.push(sampleDataItem);
    }
    this.setState({
      x_cordinate:x_cordinate,
      y_cordinate:y_cordinate,
      sampleData:sampleData,
      viewGraph:true,
      showButton:false
    })
    console.log("This is my key"+ y_cordinate);
  }
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      { (this.state.showButton)?
      <Button title="Show" onPress={()=> this.parseTheHourlyData(this.state.response)}>
      </Button>
      :
        this.showGraph()
      }
      </View>
    );
  }
}
const TabNavigator = createBottomTabNavigator({
  Daily: { screen: DailyChart },
  Hourly: { screen: HourlyChart },
});

export default createAppContainer(TabNavigator);
