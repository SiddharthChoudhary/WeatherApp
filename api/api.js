export default function fetchWeather(latitude,longitude) {
  console.log("Latitude is "+latitude)
  console.log("Longitude is "+longitude)
  let url = 'http://api.openweathermap.org/data/2.5/forecast?lat='+latitude+'&lon='+longitude+'&APPID=e631e9fdf6bb756c49a696ca05c5409f'

  return fetch(url).then((response) => response.json())
}
