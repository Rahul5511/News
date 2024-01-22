import React, { useState, useRef, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Animated } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBellConcierge, faBars,faXmark,faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { TopHeadlines } from '../services/NewsApi/ApiCall';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeadlinesScreen from './HeadlinesScreen';

const HomeScreen = ({navigation}) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [token,setToken] = useState('');
  const sidebarAnimation = useRef(new Animated.Value(-300)).current;

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
    console.log('sidebar animated')
    Animated.timing(sidebarAnimation, {
      toValue: showSidebar ? -300 : 0,
      duration: 300, 
      useNativeDriver: false,
    }).start();
  };

  const sidebarTranslateX = sidebarAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-7, 0],
  });

  const logoutApp = () => {
     if (token){
      AsyncStorage.removeItem('token');
      navigation.navigate('login');
     }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token =await AsyncStorage.getItem('token');
        setToken(token)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData(); 
  }, []);


  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.headerButton}>
          <Text style={styles.headerText}>Dashboard</Text>
        </TouchableOpacity>
        <View style={styles.iconContainer}>
          <TouchableOpacity style={styles.icon1}>
            <FontAwesomeIcon icon={faBellConcierge} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon2} onPress={toggleSidebar}>
            <FontAwesomeIcon icon={faBars} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.contentContainer}>
        {/* Main content goes here */}
        <ScrollView>
          <Text>Main Content</Text>
         <HeadlinesScreen />
        </ScrollView>
      </View>
      {showSidebar && (
        <Animated.View
          style={[
            sidebarStyles.container,
            {
              transform: [{ translateX: sidebarTranslateX }],
            },
          ]}
        >
          <TouchableOpacity style={sidebarStyles.closeButton} onPress={toggleSidebar}>
          <FontAwesomeIcon icon={faXmark} />
          </TouchableOpacity>
          {/* Add your sidebar content here */}
          <TouchableOpacity style={sidebarStyles.powerOff} onPress={logoutApp}>
          <FontAwesomeIcon icon={faPowerOff}/>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

const sidebarStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 100,
    elevation: 5,
    width: '80%',
    height: '100%',
    padding: 20,
    overflow:'visible'
  },
  closeButton: {
    width:50,
    alignSelf: 'flex-end',
    padding: 10,
  },
  powerOff:{
    position:"relative",
    top:-26,
    width:60,
  },
});

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    position: 'relative',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
  },
  icon1: {
    marginRight: 15,
  },
  icon2: {
    paddingHorizontal: 15,
  },
  icon: {
    fontSize: 24,
    color: '#333',
  },
});

export default HomeScreen;
