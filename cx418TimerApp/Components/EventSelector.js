import React from 'react';
import { View,  FlatList, StyleSheet, Text } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

export class EventSelectorList extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            events:[]
        }
        this.state.events = [{
            "id": "435",
            "Name": "3"
        },
        {
            "id": "324",
            "Name": "2"
        }]
        
      }


      render () {

        return (
          <View>
            <FlatList
                data={this.state.events}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) =>
                <View style={styles.itemContainer}>
                    <Text style={styles.contentContainer}>{item.id}</Text>
                    <Text style={styles.contentContainer}>{item.Name}</Text>
                </View>
                }
                
                />
              
          </View>
        )
      }
    }

    const styles = StyleSheet.create({

        container : {flex: 1, flexDirection: 'row',justifyContent:'center', alignItems: 'center'},
    
        itemContainer : {flex: 1, flexDirection: 'row', width: '100%', height: '100%',justifyContent:'center', alignItems: 'center'},
    
        contentContainer : {flex: 1, flexDirection: 'row', width: '100%', height: '100%',justifyContent:'center', alignItems: 'center'}

    });