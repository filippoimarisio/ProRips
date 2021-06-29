import React from 'react';
import { View, Text, ScrollView, StyleSheet} from 'react-native';

export default function Stats() {
  return (
    <View style={styles.container}>
      <Text>Stats</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#505050',
    alignItems: 'center',
    justifyContent: 'center',
  }
})