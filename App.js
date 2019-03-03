import {createStackNavigator, createAppContainer} from 'react-navigation';
import HomeScreen from './Screens/HomeScreen.js'
import ForecastChart from './Screens/ForecastChart.js'
import { pushNotifications } from './services';
pushNotifications.configure();
const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  ForecastChart: {screen: ForecastChart},
});

const App = createAppContainer(MainNavigator);

export default App;
