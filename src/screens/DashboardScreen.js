import React from 'react';
import {LineChart} from 'react-native-chart-kit';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const chartConfig = {
  backgroundGradientFrom: '#1E2923',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
      strokeWidth: 2, // optional
    },
  ],
  legend: ['Rainy Days'], // optional
};

const DashboardScreen = () => {
  return (
    <ScrollView>
      <LineChart
        style={{marginTop: 10}}
        data={data}
        width={screenWidth}
        height={150}
        chartConfig={chartConfig}
      />
      <SafeAreaView style={{flex:1,flexDirection:'row'}}>
      <View style={styles.card}>
      <TouchableOpacity>
        <Text style={styles.title}>Prepaid Bill</Text>
        <Text style={styles.description}>25rs</Text>
      </TouchableOpacity>
    </View>
    <View style={styles.card}>
    <TouchableOpacity>
      <Text style={styles.title}>Prepaid Bill</Text>
      <Text style={styles.description}>25rs</Text>
    </TouchableOpacity>
  </View>

      </SafeAreaView>
     
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    flex:1,
    flexDirection:'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 6,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 200,
    height: 100,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
});

export default DashboardScreen;
