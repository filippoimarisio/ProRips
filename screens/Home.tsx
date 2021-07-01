import React from 'react';
import { View, Text, ScrollView, StyleSheet} from 'react-native';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text>Homepage</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#505050',
    alignItems: 'center',
    justifyContent: 'center',
  }
})

