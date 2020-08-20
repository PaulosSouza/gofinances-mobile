import React from 'react';

import { TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { transparentize } from 'polished';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Dashboard from '../pages/Dashboard';
import Register from '../pages/Register';

const Tab = createBottomTabNavigator();

const TabRoutes: React.FC = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          backgroundColor: '#f0f2f5',
          elevation: 0,
          height: Platform.OS === 'ios' ? 84 : 64,
        },
        tabStyle: {
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        },
        labelPosition: 'beside-icon',
        iconStyle: {
          flex: 0,
          width: 20,
          height: Platform.OS === 'ios' ? 26 : 22,
        },
        labelStyle: {
          fontFamily: 'Poppins-Medium',
          marginLeft: 18,
          paddingTop: 2,
          fontSize: 16,
        },
        inactiveTintColor: `${transparentize(0.4, '#363F5F')}`,
        activeTintColor: '#363F5F',
        keyboardHidesTabBar: true,
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: 'Listagem',
          tabBarButton: props => <TouchableOpacity {...props} />,
          tabBarIcon: ({ size, color, focused }) => (
            <Icon name="list" size={size} color={focused ? '#FF872C' : color} />
          ),
        }}
      />

      <Tab.Screen
        name="Register"
        component={Register}
        options={{
          tabBarLabel: 'Cadastrar',
          tabBarButton: props => <TouchableOpacity {...props} />,
          tabBarIcon: ({ size, color, focused }) => (
            <Icon
              name="dollar-sign"
              size={size}
              color={focused ? '#FF872C' : color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabRoutes;
