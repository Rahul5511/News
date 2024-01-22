import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Animated, Image } from 'react-native';
import { useSelector,useDispatch } from 'react-redux';
import { loginAction } from '../services/login/action';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginScreen = ({navigation}) => {

  const dispatch = useDispatch();
  const loginDatas = useSelector((state) => state.login.loginData)

  const [email, setemailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [loginResponse,setLoginResponse] = useState('');
  const animatedBorderRadius = useRef(new Animated.Value(0)).current;

  useEffect(async () => {
    animateBorder();
    // if(loginDatas.data.status)
  }, []);

  useEffect(() => {
    if(loginDatas.status === "200" && loginDatas.Token){
      setLoginResponse(loginDatas)
      console.log(loginDatas)
     AsyncStorage.setItem('token',`${loginDatas.Token}`)
      // navigation.navigate('home')
      navigation.navigate('homeScreen')
    }else{
      setLoginResponse("")
    }
  },[loginDatas])
  console.log(loginDatas)

  const animateBorder = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedBorderRadius, {
          toValue: 50,
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.timing(animatedBorderRadius, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  };
   const datas = {email,password};

  const handleLogin = () => {
     dispatch(loginAction(datas)) 
  }

  const handleSignUp = () => {
    navigation.navigate('signUp')
  };

  const emailValidation = (text) => {
    setemailAddress(text)
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          borderRadius: animatedBorderRadius,
          borderColor: 'blue',
          borderWidth: 2,
        },
      ]}
    >
  
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter the Email"
        onChangeText={emailValidation}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.signUpText}>
        Don't have an account?{' '}
        <Text style={styles.signUpLink} onPress={handleSignUp}>
          Sign Up
        </Text>
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  loginButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  signUpText: {
    marginTop: 15,
    fontSize: 14,
  },
  signUpLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imageContainer: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default LoginScreen;


// <View style={styles.imageContainer}>
// <Image
//   source={{ uri: 'https://media.giphy.com/media/l1J9HDdEWq7rAs1hu/giphy.gif' }}
//   style={styles.image}
  
// />
// </View>
