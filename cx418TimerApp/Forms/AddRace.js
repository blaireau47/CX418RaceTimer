
import React from 'react';
import { View, Button, Text, StyleSheet, Alert } from 'react-native';
import t from 'tcomb-form-native';


const RaceInfo = t.struct({
  RaceName: t.String,
  RaceStartingTime: t.maybe(t.Date),
  Description: t.String,  
  raceLenght: t.Number
});

const options = {
  fields: {
    RaceStartTime: {
      mode: 'time', // display the Date field as a DatePickerAndroid
      label: 'Start time'
    },
    RaceName: {     
      label: 'Race name'
    }
  }
};

const Form = t.form.Form;

export class AddRace extends React.Component {
    constructor () {
        super()
        this.state = {
          patate: 0
        }
        this.state.value = null;
        
      }

      handleSubmit = () => {
        if(this.state.value){
          if(this.state.value.RaceName){
           
         
        
          let urlAddRace = "http://cx418apitiming.gearhostpreview.com/RaceTimer.svc/AddRace"
          let currentRaceNameBuf = this.state.value.RaceName
          //const restUrl = `${urlAddRace}/${currentRaceNameBuf}`
          //Alert.alert('value: ', restUrl);
          
          var formatUTCDate = function (d) {
            console.log(d);
            var str = Date.UTC( d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(), 0 );
            
            return str;
        }


          let raceInfoObj = {};
          raceInfoObj.RaceName = this.state.value.RaceName;
          raceInfoObj.Description = this.state.value.Description;
          if(this.state.value.RaceStartingTime){
            raceInfoObj.RaceStartingTime = "\/Date(" + ( formatUTCDate(  new Date(this.state.value.RaceStartTime) )) + ")\/";
          }          
          raceInfoObj.RaceLenght= this.state.value.raceLenght;



          console.log(JSON.stringify({ raceInfo: raceInfoObj }))
          let data = {
            method: 'POST',
            body: JSON.stringify({ raceInfo: raceInfoObj }),
            headers: {
              'Accept':'application/json',
              'Content-Type': 'application/json'
            }
          }



          return fetch(urlAddRace)
          .then((response) => response.json())
          .then((responseJson) => {
  
              this.setState({
              isLoading: false,
              currentRace: "",
              messageJson: AddRaceResult.AddLapTimeResult,
              }, function(){
                  
              });

          })
          .catch((error) =>{
              console.error(error);
          });
  
          //reset current bib
          this.setState(state => ({
              value: value = null
          }));
        
        }
      }else { Alert.alert('value: null');}

        
      }

      handleCancel = () => {
        this.setState({ value: null });
        
      }
      
      onChange(value) {
        this.setState({ value });
      }

      render () {

        return (
         <View>

            <View><Text>Add new Race</Text></View>
            <Form type={RaceInfo} 
                  options={options} 
                 
                  value={this.state.value}
                  onChange={this.onChange.bind(this)}>
            </Form>
            <Button style={styles.boutonContainer} title = "Send"   onPress={this.handleSubmit}  />            
            <Button style={styles.boutonContainer} title = "Cancel"   onPress={this.handleCancel}  />          
            
          </View>

        )
      }
}

const styles = StyleSheet.create({

    container : {flex: 1, flexDirection: 'row',justifyContent:'center', alignItems: 'center'},

    boutonContainer : {flex: 1, flexDirection: 'row', width: '100%', height: '100%',justifyContent:'center', alignItems: 'center'}

});