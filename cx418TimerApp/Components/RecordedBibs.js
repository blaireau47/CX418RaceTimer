import React from 'react';
import { View,  FlatList, StyleSheet, Text } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

export class RecordedBibsList extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            bibs:[]
        }
        this.state.bibs = [{
            "bib": "435",
            "lap": "3"
        },
        {
            "bib": "324",
            "lap": "2"
        },{
            "bib": "435",
            "lap": "3"
        },
        {
            "bib": "324",
            "lap": "2"
        },{
            "bib": "435",
            "lap": "3"
        },
        {
            "bib": "324",
            "lap": "2"
        },{
            "bib": "435",
            "lap": "3"
        },
        {
            "bib": "324",
            "lap": "2"
        },{
            "bib": "435",
            "lap": "3"
        },
        {
            "bib": "324",
            "lap": "2"
        },{
            "bib": "435",
            "lap": "3"
        },
        {
            "bib": "324",
            "lap": "2"
        },{
            "bib": "435",
            "lap": "3"
        },
        {
            "bib": "324",
            "lap": "2"
        },{
            "bib": "435",
            "lap": "3"
        },
        {
            "bib": "324",
            "lap": "2"
        },{
            "bib": "435",
            "lap": "3"
        },
        {
            "bib": "324",
            "lap": "2"
        },{
            "bib": "435",
            "lap": "3"
        },
        {
            "bib": "324",
            "lap": "2"
        },{
            "bib": "435",
            "lap": "3"
        },
        {
            "bib": "324",
            "lap": "2"
        }]
        
      }


      render () {

        return (
          <View>
            <FlatList
                data={this.state.bibs}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) =>
                <View style={styles.itemContainer}>
                    <Text style={styles.contentContainer}>{item.bib}</Text>
                    <Text style={styles.contentContainer}>{item.lap}</Text>
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