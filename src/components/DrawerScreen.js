import React from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const windowWidth = Dimensions.get('window').height

const DrawerScreen = ({navigation}) => {

  const cruchAction = () => {
     navigation.navigate('crunchHeadlines')
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.sidebarHeader}>Headline Pages</Text>
        <TouchableOpacity style={styles.crunchHeadlines} onPress={cruchAction}>
          <Text style={styles.sidebarItemText}>Crunch Headlines</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.teslaHeadlines} onPress={() => navigation.navigate('appleHeadlines')}>
          <Text style={styles.sidebarItemText}>Apple Headlines</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightblue',
    // height: '100%', 
    height:windowWidth,
    width: '60%',
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start', 
  },
  sidebarHeader: {
    fontSize: 24, 
    fontWeight: 'bold',
    color: 'darkblue', 
    marginBottom: 20, 
  },
  crunchHeadlines: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
    backgroundImage: 'linear-gradient(to right, lightgreen 50%, transparent 50%)',
    backgroundSize: '4px 1px',
    backgroundPosition: 'bottom',
    backgroundRepeat: 'repeat-x',
  },
  teslaHeadlines: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'transparent',
    backgroundImage: 'linear-gradient(to right, lightcoral 50%, transparent 50%)',
    backgroundSize: '4px 1px',
    backgroundPosition: 'bottom',
    backgroundRepeat: 'repeat-x',
  },
  sidebarItemText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default DrawerScreen;
