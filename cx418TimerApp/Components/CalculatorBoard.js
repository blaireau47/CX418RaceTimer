import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import { BibSwitchToolSelector }  from './BibSelectorTool.js';
import { RecordedBibsList }  from './RecordedBibs.js';


export class CalculatorBoard extends React.Component {
    constructor(props){
        super(props);
        this.state ={currentBib:"", sentBibs:[]};

    }

    handleNumberClick(number) {
        this.setState(state => ({
            currentBib: state.currentBib += number
        }));
      }

      handleSendClick() {
        let urlAddLapTime = "http://cx418apitiming.gearhostpreview.com/RaceTimer.svc/AddLapTime"
        let currentBibBuf = this.state.currentBib
       // const restUrl = `${urlAddLapTime}/${currentBibBuf}`

        var formatUTCDate = function (d) {
            console.log(d);
            var str = Date.UTC( d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(), 0 );
            
            return str;
        }

        let lapTimeInfoObj = {};
        lapTimeInfoObj.RaceId = 124;
        lapTimeInfoObj.BibId = this.state.currentBib;
        lapTimeInfoObj.LapTime = "\/Date(" + ( formatUTCDate(  new Date() )) + ")\/";

        console.log(JSON.stringify({ lapInfo: lapTimeInfoObj }));
        let data = {
            method: 'POST',
            body: JSON.stringify({ lapInfo: lapTimeInfoObj }),
            headers: {
              'Accept':'application/json',
              'Content-Type': 'application/json'
            }
          }

        return fetch(urlAddLapTime, data)

        .then((response) => response.json())
        .then((responseJson) => {

            this.setState({
            isLoading: false,
            currentBib: "",
            messageJson: responseJson.AddLapTimeResult,
            }, function(){
                
            });

        })
        .catch((error) =>{
            console.error(error);
        });

        //reset current bib
        this.setState(state => ({
            currentBib: state.currentBib = ""
        }));
      }
      handleRemoveLastNumberClick(){
        this.setState(state => ({
            currentBib: state.currentBib.slice(0, -1)
        }));
      }

      handleDeleteLastBibClick(){
        this.setState(state => ({
            currentBib: state.currentBib = ""
        }));
      }
      handleCalcultorClick(){
          Alert.alert("handleCalcultorClick")
      }

      handleMicClic(){
        Alert.alert("handleMicClic")
    }

    handleCalcultorCalcAndMic(){
        Alert.alert("handleCalcultorCalcAndMic")
    }



    render() {
      return (
        <View style={{flex: 1, flexDirection: 'column',}}>
           <View style={{flex: 3, flexDirection: 'column',justifyContent:'center'}}>
            <RecordedBibsList></RecordedBibsList>
          </View>
          <View style={{flex: 2, flexDirection: 'column',justifyContent:'center'}}>
            <Text style={styles.currentBibScreen}>{this.state.currentBib}</Text>
          </View>
          <View style={{flex: 6, flexDirection: 'column',justifyContent:'center'}}>
            <View style={styles.calculatorButtonContainer}>
                <TouchableOpacity title = "Send"  onPress={() => this.handleSendClick()} >
                    <Text style={styles.buttonText}>Send</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonRow}>                    
                <View style={styles.calculatorButtonContainer}>
                    <TouchableOpacity style={styles.bouttonCalculator} title = "1"  onPress={() => this.handleNumberClick(1)} >
                        <Text style={styles.buttonText}>1</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.calculatorButtonContainer}>
                    <TouchableOpacity style={styles.bouttonCalculator} title = "2"  onPress={() => this.handleNumberClick(2)} >
                        <Text style={styles.buttonText}>2</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.calculatorButtonContainer}>
                    <TouchableOpacity style={styles.bouttonCalculator} title = "3"  onPress={() => this.handleNumberClick(3)} >
                        <Text style={styles.buttonText}>3</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.buttonRow}>                    
                <View style={styles.calculatorButtonContainer}>
                    <TouchableOpacity style={styles.bouttonCalculator} title = "4"  onPress={() => this.handleNumberClick(4)} >
                        <Text style={styles.buttonText}>4</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.calculatorButtonContainer}>
                    <TouchableOpacity style={styles.bouttonCalculator} title = "5"  onPress={() => this.handleNumberClick(5)} >
                        <Text style={styles.buttonText}>5</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.calculatorButtonContainer}>
                    <TouchableOpacity style={styles.bouttonCalculator} title = "6"  onPress={() => this.handleNumberClick(6)} >
                        <Text style={styles.buttonText}>6</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.buttonRow}>                    
                <View style={styles.calculatorButtonContainer}>
                    <TouchableOpacity style={styles.bouttonCalculator} title = "7"  onPress={() => this.handleNumberClick(7)} >
                        <Text style={styles.buttonText}>7</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.calculatorButtonContainer}>
                    <TouchableOpacity style={styles.bouttonCalculator} title = "8"  onPress={() => this.handleNumberClick(8)} >
                        <Text style={styles.buttonText}>8</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.calculatorButtonContainer}>
                    <TouchableOpacity style={styles.bouttonCalculator} title = "9"  onPress={() => this.handleNumberClick(9)} >
                        <Text style={styles.buttonText}>9</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.buttonRow}>
                <View style={styles.calculatorButtonContainer}>
                    <TouchableOpacity style={styles.bouttonCalculator} title = "<-"  onPress={() => this.handleRemoveLastNumberClick()}>
                        <Text style={styles.buttonText}>Rem</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.calculatorButtonContainer}>
                    <TouchableOpacity style={styles.bouttonCalculator} title = "0"  onPress={() => this.handleNumberClick(0)} >
                        <Text style={styles.buttonText}>0</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.calculatorButtonContainer}>
                    <TouchableOpacity style={styles.bouttonCalculator} title = "Del"  onPress={() => this.handleDeleteLastBibClick()} >
                        <Text style={styles.buttonText}>Del</Text>
                    </TouchableOpacity>
                </View>
            </View>
          </View>
          <View style={{flex: 1, flexDirection: 'column',justifyContent:'center'}}>
            <BibSwitchToolSelector onPressCalculator={() => this.handleCalcultorClick()}  onPressMic={() => this.handleMicClic()} onPressMicAndCalc={() => this.handleCalcultorCalcAndMic()}/>
          </View>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
        currentBibScreen:{
            fontSize: 24,
            textAlign: 'center'
        },
        buttonRow: {
           
            flex: 1, 
            flexDirection: 'row',
            justifyContent:'center'
        },
        calculatorButtonContainer:{
            backgroundColor: "#dddddd",
            borderColor: '#000000',
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center',
            flex:1
        },
        bouttonCalculator:{
            flex:1,
            width: "100%",
            height: "100%",

        },
        buttonText:{
            flex: 1,
            width: "100%",
            height: "100%",
            fontSize: 30,
            justifyContent: 'center',
            alignItems: 'center'
        }

  });