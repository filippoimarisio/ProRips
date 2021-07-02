import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Home from '../screens/Home'
import Field from '../screens/Field'
import Stats from '../screens/Stats'
import { useTheme } from 'react-native-paper';


const Tab = createBottomTabNavigator()


export default function Tabs() {

  const { colors } = useTheme()

  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: 'white',
          borderRadius: 15,
          height: 80,
          ...styles.shadow
        }
      }}
    >
       <Tab.Screen 
          name='Home' 
          component={Home}
          options = {{
            tabBarIcon: ({focused}) => (
              <View style={{alignItems: 'center', justifyContent: 'center', top: 0}}>
                <Image
                  source={require('../assets/home.png')}
                  resizeMode = 'contain'
                  style= {{
                    height: 25,
                    width: 25,
                    tintColor: focused? colors.accent:'darkgray'
                  }}
                />
                <Text
                  style={{color: focused? colors.accent: 'darkgray', fontSize: 12}}
                >HOME</Text>
              </View>
            )
          }}
        />
       <Tab.Screen 
        name='Field' 
        component={Field}
        options = {{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center', top: 0}}>
              <Image
                source={require('../assets/home.png')}
                resizeMode = 'contain'
                style= {{
                  height: 25,
                  width: 25,
                  tintColor: focused? colors.accent:'darkgray'
                }}
              />
              <Text
                style={{color: focused? colors.accent: 'darkgray', fontSize: 12}}
              >FIELD</Text>
            </View>
          )
        }}
        />
       <Tab.Screen 
        name='Stats' 
        component={Stats}
        options = {{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center', top: 0}}>
              <Image
                source={require('../assets/home.png')}
                resizeMode = 'contain'
                style= {{
                  height: 25,
                  width: 25,
                  tintColor: focused? colors.accent:'darkgray'
                }}
              />
              <Text
                style={{color: focused? colors.accent: 'darkgray', fontSize: 12}}
              >STATS</Text>
            </View>
          )
        }}
        />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: 'darkgray',
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5
  }
})