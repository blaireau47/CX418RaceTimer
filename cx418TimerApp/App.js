import React from 'react';
import { View,TouchableOpacity,StyleSheet } from 'react-native';
import { CalculatorBoard }  from './Components/CalculatorBoard.js';
import { AddRace }  from './Forms/AddRace.js';
import { AddEvent }  from './Forms/AddEvent.js';
import { StartRace }  from './Forms/StartRace.js';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator, createAppContainer } from "react-navigation";

export class HomeScreen extends React.Component {
  render() {
    return (

      <View style={{
        flex: 1,        
        justifyContent: 'center'       
      }}>

        <View style={styles.container}>
          <TouchableOpacity style={styles.boutonContainer} title = "6"   onPress={() => this.props.navigation.navigate('Home')}  >
              <Ionicons  name="ios-home" size={32} color="blue" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.boutonContainer} title = "6"   onPress={() => this.props.navigation.navigate('Calculator')}  >
              <Ionicons  name="ios-mic" size={32} color="blue" /><Ionicons  name="ios-calculator" size={32} color="blue" />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <TouchableOpacity style={styles.boutonContainer} title = "6"   onPress={() => this.props.navigation.navigate('AddRace')}  >
            <Ionicons  name="ios-add-circle" size={32} color="blue" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.boutonContainer} title = "6"   onPress={() => this.props.navigation.navigate('AddEvent')}  >
            <Ionicons  name="ios-add" size={32} color="blue" />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <TouchableOpacity style={styles.boutonContainer} title = "6"   onPress={() => this.props.navigation.navigate('SelectRace')}  >
            <Ionicons  name="ios-alarm" size={32} color="blue" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export class CalculatorScreen extends React.Component {
  render() {
    return (

      <View style={{
        flex: 1,        
        justifyContent: 'center'        
      }}>

        <CalculatorBoard/>
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    Calculator: {
      screen: CalculatorScreen
    },
    AddRace: {
      screen: AddRace
    },
    AddEvent: {
      screen: AddEvent
    },

    SelectRace: {
      screen: StartRace
    }
  },
  {
    initialRouteName: 'Home',
  }
);

export default createAppContainer(AppNavigator);


const styles = StyleSheet.create({

  container : {flex: 1, flexDirection: 'row',justifyContent:'center', alignItems: 'center'},

  boutonContainer : {flex: 1, flexDirection: 'row', width: '100%', height: '100%',justifyContent:'center', alignItems: 'center'}

});