
import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { RaceSelectorList }  from '../Components/RaceSelector.js';

export class StartRace extends React.Component {
    constructor () {
        super()

        
        
      }


      
      
      render () {

        return (
         <View>
             <RaceSelectorList></RaceSelectorList>
            <FormLabel>Start Race</FormLabel>
            <FormInput />
            <FormValidationMessage>Error message</FormValidationMessage>

         </View>
        )
      }
}

const styles = StyleSheet.create({

    container : {flex: 1, flexDirection: 'row',justifyContent:'center', alignItems: 'center'},

    boutonContainer : {flex: 1, flexDirection: 'row', width: '100%', height: '100%',justifyContent:'center', alignItems: 'center'}

});