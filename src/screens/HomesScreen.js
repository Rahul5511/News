import {Header, Icon} from '@rneui/themed';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Text} from '@rneui/themed';
import {
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
// import DrawerScreen from '../components/DrawerScreen';
import {Card, Image} from 'react-native-elements';
import {TopHeadlines} from '../services/NewsApi/ApiCall';
import DrawerScreen from '../components/DrawerScreen';

const HomesScreen = ({navigation}) => {
  const [activeSidebar, setActivesidebar] = useState(false);
  const [newsHeadlines, setNewsHeadlines] = useState([]);
  const [loading, setLoading] = useState(true);

  const openSidebar = () => {
    setActivesidebar(!activeSidebar);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await TopHeadlines();
        setNewsHeadlines(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCardPress = url => {
    Linking.openURL(url);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#833ab4" />
        <Text style={styles.loadingText}>Loading....</Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <Header
        ViewComponent={LinearGradient}
        linearGradientProps={{
          colors: ['#833ab4', '#fd1d1d', '#fcb045'],
          start: {x: 0, y: 0},
          end: {x: 1, y: 0},
        }}
        containerStyle={{
          height: 100,
        }}
        leftComponent={
          <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>
            Home
          </Text>
        }
        rightComponent={
          <View style={{flexDirection: 'row'}}>
            <Icon
              name="notifications"
              type="material"
              color="white"
              onPress={() => {
                // Add functionality for notification icon press
              }}
              style={{marginRight: 14}}
            />
            <Icon
              name="menu"
              type="material"
              color="white"
              onPress={openSidebar}
            />
          </View>
        }
      />

      <View>{activeSidebar && <DrawerScreen navigation={navigation}/>}</View>

      <View style={styles.headlineContainer}>
        <Text style={styles.headlinesText}>TopHeadlines</Text>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {newsHeadlines.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleCardPress(item.url)}
            activeOpacity={0.8}>
            <Card containerStyle={styles.card}>
              <Card.Title>{item.title}</Card.Title>
              <Card.Divider />
              <Image source={{uri: item.urlToImage}} style={styles.image} />
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.publishedAt}>
                Published At: {item.publishedAt}
              </Text>
            </Card>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  card: {
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
  },
  description: {
    marginBottom: 10,
  },
  publishedAt: {
    fontStyle: 'italic',
    color: 'gray',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#833ab4',
  },
  headlineContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 0,
  },
  headlinesText: {
    fontSize: 24, 
    fontWeight: 'bold',
    color: '#833ab4', 
    textShadowColor: 'rgba(0, 0, 0, 0.5)', 
    textShadowOffset: { width: 2, height: 2 }, 
    textShadowRadius: 5,
  },
});

export default HomesScreen;


// <View>{activeSidebar && <DrawerScreen />}</View>