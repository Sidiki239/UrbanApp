import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Layout from './android/app/src/layout/_layout';
import { SafeAreaProvider } from 'react-native-safe-area-context';
const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();



const App = () => {
  

  return (
   <SafeAreaProvider>
    <Layout/>
    </SafeAreaProvider>
  );
};

export default App;