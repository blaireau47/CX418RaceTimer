
import React from 'react';
import { View, Button, Text, StyleSheet, Alert,ScrollView } from 'react-native';
import t from 'tcomb-form-native';


const EventInfo = t.struct({
  EventName: t.String,
  EventStartingDate: t.maybe(t.Date),
  EventEndingDate: t.maybe(t.Date),
  MultiDayEvent: t.Boolean,
  MultiRaceEvent: t.Boolean,
  Location:t.String,
  Description: t.String
});

const options = {
  
  fields: {
    EventStartingDate: {
      mode: 'date',
      label: 'Start date'
    },
    EventEndingDate: {
      mode: 'date' // display the Date field as a DatePickerAndroid
    }
  }
};

const Form = t.form.Form;

export class AddEvent extends React.Component {
    constructor () {
        super()
        this.state = {
          value: null
        }
        
        
      }

      handleSubmit = () => {
        if(this.state.value){
          if(this.state.value.EventName){
           
         
        
          let urlAddEvent = "http://cx418apitiming.gearhostpreview.com/RaceTimer.svc/AddEvent"
          let currentEventNameBuf = this.state.value.EventName
          //const restUrl = `${urlAddEvent}/${currentEventNameBuf}`
          //Alert.alert('value: ', restUrl);
          
          var formatUTCDate = function (d) {
            console.log(d);
            var str = Date.UTC( d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(), 0 );
            
            return str;
        }


          let EventInfoObj = {};
          EventInfoObj.EventName = this.state.value.EventName;
          EventInfoObj.Description = this.state.value.Description;
          if(this.state.value.EventStartingDate){
            EventInfoObj.EventStartingDate = "\/Date(" + ( formatUTCDate(  new Date(this.state.value.EventStartingDate) )) + ")\/";
          }    
          if(this.state.value.EventEndingDate){
            EventInfoObj.EventEndingDate = "\/Date(" + ( formatUTCDate(  new Date(this.state.value.EventEndingDate) )) + ")\/";
          }      
          
          EventInfoObj.MultiDayEvent= this.state.value.MultiDayEvent;
          EventInfoObj.MultiRaceEvent= this.state.value.MultiRaceEvent;



          console.log(JSON.stringify({ eventInfo: EventInfoObj }))
          let data = {
            method: 'POST',
            body: JSON.stringify({ eventInfo: EventInfoObj }),
            headers: {
              'Accept':'application/json',
              'Content-Type': 'application/json'
            }
          }



          return fetch(urlAddEvent)
          .then((response) => response.json())
          .then((responseJson) => {
  
              this.setState({
              isLoading: false,
              currentEvent: "",
              messageJson: AddEventResult.AddLapTimeResult,
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
         <View >
          <ScrollView>
            <View><Text>Add new Event</Text></View>
            <Form type={EventInfo} 
                  options={options} 
                 
                  value={this.state.value}
                  onChange={this.onChange.bind(this)}>
            </Form>
            <Button style={styles.boutonContainer} title = "Send"   onPress={this.handleSubmit}  />            
            <Button style={styles.boutonContainer} title = "Cancel"   onPress={this.handleCancel}  />          
            </ScrollView>
          </View>

        )
      }
}

const styles = StyleSheet.create({
    form : {flex: 1, flexDirection: 'column',justifyContent:'center', alignItems: 'center'},
    container : {flex: 1, flexDirection: 'row',justifyContent:'center', alignItems: 'center'},

    boutonContainer : {flex: 1, flexDirection: 'row', width: '100%', height: '100%',justifyContent:'center', alignItems: 'center'}

});