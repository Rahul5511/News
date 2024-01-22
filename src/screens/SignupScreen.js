import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Animated } from 'react-native';
import { newUser } from '../services/login/Signup';
import Toast from 'react-native-simple-toast'

const SignupScreen = ({navigation}) => {
  const [username, setUserName] = useState('');
  const [emailAddress, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const animatedBorderRadius = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animateBorder();
  }, []);

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

  const data = {username,emailAddress,password}

  const handleSignUp =async () => {
    
       try{
         const response =await newUser(data)
         console.log(response)
         Toast.show('created user successfully',Toast.TOP)
         navigation.navigate('login')
       }catch(error){
        console.log("api error")
       }
       
  };
  const backToHome =() => {
    navigation.goBack();
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
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={(text) => setUserName(text)}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={emailAddress}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={backToHome}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff', // Change background color if needed
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
  signUpButton: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backButton:{
    paddingVertical:8,
    borderColor:'red'
  },
  backButtonText:{
    paddingVertical:8,
    fontSize:18,
   
  }
});

export default SignupScreen;
