import React from 'react';
import { StyleSheet, View} from 'react-native';
import Tabs from './navigation/Tabs'
import { NavigationContainer } from '@react-navigation/native';

export default function App() {

  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}

