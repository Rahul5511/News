/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React, { useEffect } from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Navigation from './src/navigation/Navigation';
import FirebasePermissionHandler from './src/services/utils/FirebasePermissionHandler';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';


function App(props) {
 
  return (
    <SafeAreaProvider>
    <FirebasePermissionHandler/>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;

// <FirebasePermissionHandler/>