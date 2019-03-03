/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
import React, {Component} from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Animated,
  ScrollView,
} from "react-native"

import weatherIcon from "../utils/icons"
import { PermissionsAndroid } from 'react-native';

async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Location Permission',
        'message': 'This app needs access to your location',
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the location")
    } else {
      console.log("Location permission denied")
    }
  } catch (err) {
    console.warn(err)
  }
}
class HomeScreen extends React.Component{
  constructor(props){
    super(props);
    this.onChangeText = this.onChangeText.bind(this);
    this.getWeather = this.getWeather.bind(this);
    this.state={
      latitude:null,
      longitude:null,
      city: "Weehawken",
      country: "USA",
      weatherType: "snow",
      temperature: 21,
      searchedCity: "Weehawken",
      icon: weatherIcon(),
      response:null,
      showChartView:false,
      fadeAnimIn: new Animated.Value(0)
    }
  }
  componentDidMount() {
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
    );
    Animated.timing(
      this.state.fadeAnimIn,            // The animated value to drive
      {
        toValue: 1,                   // Animate to opacity: 1 (opaque)
        duration: 1000,              // Make it take a while
      }
    ).start();
  }
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }
  getWeather() {
    console.log("Searched city is"+this.state.searchedCity)
    fetch('http://api.openweathermap.org/data/2.5/forecast?lat='+this.state.latitude
                          +'&lon='+this.state.longitude
                          +'&APPID=e631e9fdf6bb756c49a696ca05c5409f'
                          +'&units=metric')
    .then(response => response.json())
    .then(response =>{

      let weatherList = response.list[0];

      this.setState({
        temperature: weatherList.main.temp,
        city: weatherList.name,
        country: weatherList.sys.country,
        weatherType: weatherList.weather[0].main,
        response:response,
        icon: weatherIcon(weatherList.weather[0].icon),
        showChartView:true
      });

    })
  }


  render() {
    const {navigate} = this.props.navigation;
    let { fadeAnimIn } = this.state;
    return (
      <Animated.View style={{
       backgroundColor: '#ffffff',
       flex: 1,
       alignItems: "stretch",
       justifyContent: "center",
       opacity:fadeAnimIn}}>
        <View style={{backgroundColor:'#ffffff'}}>
          <View style={[styles.animatedContainer]}>
          <Text>
            Latitude is : {this.state.latitude}
          </Text>
          <Text>
            Longitude is : {this.state.longitude}
          </Text>
            <Text style={styles.icon}>
              {this.state.icon}
            </Text>
            <Text style={styles.temperature}>
              {Math.round(this.state.temperature) + "°C"}
            </Text>
            <Text style={styles.location}>
              {this.state.city}, {this.state.country}
            </Text>
            <Text style={styles.weatherType}>
              {this.state.weatherType}
            </Text>
            <TouchableOpacity style={styles.input}
                       onPress={()=>this.getWeather()}>
                       <Text style={{alignItems:'center'}}>GET WEATHER
                       </Text>
                       </TouchableOpacity>
            {
              (this.state.showChartView)?
            <TouchableOpacity style={styles.input}
                onPress={()=> navigate('ForecastChart',{response:this.state.response})}>
                <Text style={{alignItems:'center'}}>CHART VIEW
                </Text>
            </TouchableOpacity>
            :
            <View></View>
          }
          </View>
        </View>
        </Animated.View>
    );
  }

  onChangeText(searchedCity) {
    this.setState({
      searchedCity: searchedCity
    })
  }
}

var styles = StyleSheet.create({
  animatedContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  temperature: {
    fontSize: 62,
    fontWeight: "100",
    margin: 0
  },
  location: {
    fontSize: 14,
    fontWeight: "100",
    marginBottom: 20,
  },
  weatherType: {
    fontSize: 34,
    fontWeight: "500"
  },
  input: {
    borderWidth: 2,
    borderColor: "#666",
    height: 40,
    alignSelf:'center',
    width:120,
    marginVertical: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    borderRadius: 5
  },
  icon: {
    fontFamily: 'WeatherIcons-Regular',
    fontSize: 130,
    padding: 0
  }
});

export default HomeScreen;
