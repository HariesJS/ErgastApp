import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Platform } from 'react-native';
import { Racers } from '../screens/Racers';
import { Races } from '../screens/Races';

const defaultOptions = {
    headerStyle: {
      backgroundColor: '#3969ab',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontSize: 20,
      fontWeight: undefined,
    },
};

export const tabOptions = (Component, label, iconName) => ({
    tabBarLabel: Platform.OS === 'android' ? label : label,
    tabBarIcon: ({color}) => (
        <Component
            name={iconName}
            color={color}
            size={24}
        />
    )
});

const RacersNavigator = () => {
    const Stack = createStackNavigator();
    return (
      <Stack.Navigator>
        <Stack.Screen
          name='Racers'
          component={Racers}
          options={{
            headerTitle: 'Racers',
            ...defaultOptions
          }}
        />
        <Stack.Screen
          name='Races'
          component={Races}
          options={{
            ...defaultOptions
          }}
        />
      </Stack.Navigator>
    );
}

const Tab = createBottomTabNavigator();
const AppNavigator = () => {
  return (
    <Tab.Navigator
        initialRouteName="Home"
        activeColor="#3989ab"
        barStyle={{
            backgroundColor: '#fff'
        }}
        shifting={true}
        tabBarOptions={{
            activeTintColor: '#3989ab',
            showLabel: true,
            lazyLoad: true,
            style: {
                backgroundColor: 'rgba(255,255,255,0.96)',
                position: 'absolute',
            }
        }}
    >
        <Tab.Screen
            name="Racers"
            component={RacersNavigator}
            options={tabOptions(AntDesign, 'Racers', 'database')}
        />
    </Tab.Navigator>
  );
}

export const AppNavigation = () => {
  return (
    <NavigationContainer>
        <AppNavigator />
    </NavigationContainer>
  );
}