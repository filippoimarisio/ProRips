import React from 'react';
import { LogBox } from 'react-native';
import Tabs from './navigation/Tabs'
import { NavigationContainer } from '@react-navigation/native';
import { store } from './store'
import { Provider } from 'react-redux'

LogBox.ignoreLogs(['Remote debugger']);

export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tabs />
      </NavigationContainer>
    </Provider>
  );
}

