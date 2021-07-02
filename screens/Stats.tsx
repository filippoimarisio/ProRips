import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { useAppSelector } from '../hooks'
import { DiscLocation } from '../types/types'
import { DataTable } from 'react-native-paper';


export default function Stats() {
  
  const discsLocation = useAppSelector((state) => state.discsLocation)
  

  const renderItem = ({ item }: { item: DiscLocation }) => {
    console.log('itemrender', item)
    return (
      <DataTable.Row key={item.id}>
        <DataTable.Cell>Disc {item.id}</DataTable.Cell>
        <DataTable.Cell numeric>{item.distanceFromEnd}</DataTable.Cell>
      </DataTable.Row>
    )
  }
  ;

  return (
    <View style={styles.container}>
      <Text>Stats</Text>
      <DataTable> 
        <DataTable.Header>
          <DataTable.Title>Disc</DataTable.Title>
          <DataTable.Title numeric>Distance</DataTable.Title>
        </DataTable.Header>
        { discsLocation.map(disc=>renderItem({item: disc}))}
      </DataTable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})