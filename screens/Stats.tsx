import React from 'react';
import { View, Text, StyleSheet, FlatList} from 'react-native';
import { useAppSelector } from '../hooks'
import { DiscLocation } from '../types/types'

export default function Stats() {
  
  const discsLocation = useAppSelector((state) => state.discsLocation)
  
  const renderItem = ({ item }: { item: DiscLocation }) => (
    <View style={styles.item}>
      <Text>{item.distanceFromEnd}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text>Stats</Text>
      <FlatList
        data={discsLocation}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#505050',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
})