import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import DashboardScreen from '../screens/DashboardScreen';
import HomesScreen from '../screens/HomesScreen';
import CrunhHeadlines from '../screens/CrunchHeadlines';
import DrawerScreen from '../components/DrawerScreen';
import AppleHeadlines from '../screens/AppleHeadlines';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='login' component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name='home' component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name='signUp' component={SignupScreen} options={{ headerShown: false }} />
      <Stack.Screen name='dashboard' component={DashboardScreen} options={{ headerShown: false }} />
      <Stack.Screen name='homeScreen' component={HomesScreen} options={{ headerShown: false }} />
      <Stack.Screen
      name='drawer'
      options={{ headerShown: false }}
      component={DrawerScreen}
    />
      <Stack.Screen name='crunchHeadlines' component={CrunhHeadlines} options={{ headerShown: false }} />
      <Stack.Screen name='appleHeadlines' component={AppleHeadlines} options={{headerShown:false}}/>
    </Stack.Navigator>
  );
};

export default Navigation;
