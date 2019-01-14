
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

export class BibSwitchToolSelector extends React.Component {
    constructor () {
        super()
        this.state = {
          selectedIndex: 0
        }
        
        this.updateIndex = this.updateIndex.bind(this)
      }

      updateIndex (selectedIndex) {
        this.setState({selectedIndex})
        Alert.alert("Patate")
      }
      
      
      render () {

        const component1 = () =>  <View style={styles.container}>
        <TouchableOpacity style={styles.boutonContainer} title = "6"  onPress={this.props.onPressCalculator} onPressOut={() => this.updateIndex(0)} >
            <Ionicons  name="ios-calculator" size={32} color="blue" />
        </TouchableOpacity>
        </View>
        
        const component2 = () => <View style={styles.container}>
        <TouchableOpacity style={styles.boutonContainer} title = "6"   onPress={this.props.onPressMic} onPressOut={() => this.updateIndex(1)} >
            <Ionicons  name="ios-mic" size={32} color="blue" />
        </TouchableOpacity>
        </View>
        const component3 = () => <View style={styles.container}>
        <TouchableOpacity style={styles.boutonContainer} title = "6"  onPress={this.props.onPressMicAndCalc}  onPressOut={() => this.updateIndex(2)}>
            <Ionicons  name="ios-mic" size={32} color="blue" />
            <Ionicons  name="ios-calculator" size={32} color="blue" />
        </TouchableOpacity>
        </View>
        
        const buttons = [{ element: component1 }, { element: component2 }, { element: component3 }]
        const { selectedIndex } = this.state
        return (
          <ButtonGroup
            
            selectedIndex={selectedIndex}
            buttons={buttons}
            disableSelected= {true}
            containerStyle={styles.container} />
        )
      }
}

const styles = StyleSheet.create({

    container : {flex: 1, flexDirection: 'row',justifyContent:'center', alignItems: 'center'},

    boutonContainer : {flex: 1, flexDirection: 'row', width: '100%', height: '100%',justifyContent:'center', alignItems: 'center'}

});