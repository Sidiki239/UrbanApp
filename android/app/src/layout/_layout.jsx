import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image,View } from 'react-native';
import NoConnexion from '../connection/NoConnexion';
import Navigation from '../navigation/_layout';
import { icons } from '../constants';
import Home from '../Home/Home';
import Records from '../navigation/records';
import Create from "../navigation/create"
import Profile from '../navigation/profile';
import Dashboard from '../navigation/dashboard';
import Signin from '../auth/Signin';
//import NetInfo from '@react-native-community/netinfo';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabIcon = ({ icon, color }) => {
  return (
    <View className=" rounded-full px-3 py-4  ">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
    </View>
  );
};

const LayoutTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarShowLabel: false,
      headerTransparent: false,
      tabBarActiveTintColor: '#072d4c',
      tabBarInactiveTintColor: 'gray',
      tabBarLabelStyle: { fontSize: 10, color: 'black' },
      tabBarHideOnKeyboard: true,
      tabBarStyle: {
        backgroundColor: 'white',
        width: '100%',
        height: 65,
        borderRadius: 0,
        alignSelf: 'center',
        elevation: 1,
        bottom: 0,
        paddingTop: 0,
        justifyContent: 'center',
      },
    })}
  >
    <Tab.Screen
      name="home1"
      component={Dashboard}
      options={{
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        headerShown: false,
        tabBarIcon: ({ focused, color }) => (
          <TabIcon icon={icons.home} color={color} name="" focused={focused} />
        ),
      }}
    />
    <Tab.Screen
      name="records"
      component={Records}
      options={{
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        headerShown: false,
        tabBarIcon: ({ focused, color }) => (
          <TabIcon icon={icons.bookmark} color={color} name="" focused={focused} />
        ),
      }}
    />
    <Tab.Screen
      name="create"
      component={Create}
      options={{
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarLabel: 'New',
        headerShown: false,
        tabBarIcon: ({ focused, color }) => (
          <TabIcon icon={icons.plus} color={color} name="" focused={focused} />
        ),
      }}
    />
     <Tab.Screen
      name="profile"
      component={Profile}
      options={{
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarLabel: 'New',
        headerShown: false,
        tabBarIcon: ({ focused, color }) => (
          <TabIcon icon={icons.profile} color={color} name="" focused={focused} />
        ),
      }}
    /> 
  </Tab.Navigator>
);

const Layout = () => {
    //BPMBGBCJ
  return (
    <NavigationContainer independent>
      <Stack.Navigator initialRouteName='home'>
        <Stack.Screen
          name="home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="signin"
          component={Signin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="layout"
          component={LayoutTabNavigator}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Layout;