import React from 'react';
import { LogBox } from 'react-native';
import Tabs from './navigation/Tabs'
import { NavigationContainer } from '@react-navigation/native';
import { store } from './store'
import { Provider } from 'react-redux'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

LogBox.ignoreLogs(['Remote debugger']);

export default function App() {

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#505050',
      accent: 'limegreen',
    },
  };

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Tabs />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}

