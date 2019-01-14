import React from 'react';
import { View,  FlatList, StyleSheet, Text, Alert } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

export class RaceSelectorList extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            races: ""
        }
        
        
      }

      componentDidMount() {
    
        return fetch('http://cx418apitiming.gearhostpreview.com/RaceTimer.svc/getRaces/5')
          .then((response) => response.json())
          .then((responseJson) => {
            
            this.setState({
              races: responseJson.GetRacesResult
            }, function() {
              // In this block you can do something with new state.
            });
          })
          .catch((error) => {
            console.error(error);
          });
      }
      render () {

        return (
           
          <View>
           
            <FlatList
                data={this.state.races}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => {item.RaceId}}
                ItemSeparatorComponent={this.renderSeparator}
                renderItem={({item}) =>(
                    <ListItem
                        roundAvatar
                        title={item.RaceName}
                        subtitle={item.RaceStartedTime}
                        containerStyle={{ borderBottomWidth: 0 }}
                    />
                )}
               
            />
              
          </View>
        )
      }


      renderSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: "86%",
              backgroundColor: "#CED0CE",
              marginLeft: "14%"
            }}
          />
        );
      };
    }

    const styles = StyleSheet.create({

        container : {flex: 1, flexDirection: 'row',justifyContent:'center', alignItems: 'center'},
    
        itemContainer : {flex: 1, flexDirection: 'row', width: '100%', height: '100%',justifyContent:'center', alignItems: 'center'},
    
        contentContainer : {flex: 1, flexDirection: 'row', width: '100%', height: '100%',justifyContent:'center', alignItems: 'center'}

    });