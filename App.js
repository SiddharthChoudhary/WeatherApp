/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
import React, {Component} from "react"
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

import weatherIcon from "./utils/icons"

class App extends React.Component{
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
      icon: weatherIcon()
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
  }
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }
  getWeather() {
    console.log("Searched city is"+this.state.searchedCity)
    fetch('http://api.openweathermap.org/data/2.5/forecast?lat='+this.state.latitude+'&lon='+this.state.longitude+'&APPID=e631e9fdf6bb756c49a696ca05c5409f')
    .then(response => response.json())
    .then(response =>{

      let weatherList = response.list[0];

      this.setState({
        temperature: weatherList.main.temp,
        city: weatherList.name,
        country: weatherList.sys.country,
        weatherType: weatherList.weather[0].main,
        icon: weatherIcon(weatherList.weather[0].icon)
      });

    })
  }


  render() {

    return (
      <Animated.View style={{
       backgroundColor: '#ffffff',
       flex: 1,
       alignItems: "stretch",
       justifyContent: "center"}}>
        <View style={{backgroundColor:'#ffffff'}}>
          <View style={[styles.animatedContainer]}>
            <Text style={styles.icon}>
              {this.state.icon}
            </Text>
            <Text>
              Latitude is : {this.state.latitude}
            </Text>
            <Text>
              Longitude is : {this.state.longitude}
            </Text>
            <Text style={styles.temperature}>
              {Math.round(this.state.temperature-273.15) + "°C"}
            </Text>
            <Text style={styles.location}>
              {this.state.city}, {this.state.country}
            </Text>
            <Text style={styles.weatherType}>
              {this.state.weatherType}
            </Text>
            <TouchableOpacity style={styles.input}
                       onPress={()=>this.getWeather()}>
                       <Text style={{alignItems:'center'}}>GET LOCATION
                       </Text>
                       </TouchableOpacity>
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
    borderWidth: 1,
    borderColor: "#666",
    height: 40,
    width:100,
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

export default App;
