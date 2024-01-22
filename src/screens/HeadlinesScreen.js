import React, { useEffect, useRef } from 'react';
import { ScrollView, Text, View, StyleSheet, Animated } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { TopHeadlines } from '../services/NewsApi/ApiCall';

const HeadlinesScreen = () => {
  const [newsheader, setNewsHeadlines] = React.useState([]);
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await TopHeadlines();
        const slicedData = data.slice(0, 10);
        setNewsHeadlines(slicedData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: true }
  );

  const cardScale = scrollY.interpolate({
    inputRange: [0, 120],
    outputRange: [1, 0.9],
    extrapolate: 'clamp',
  });

  const cardOpacity = scrollY.interpolate({
    inputRange: [0, 120],
    outputRange: [1, 0.7],
    extrapolate: 'clamp',
  });

  const cardStyle = {
    transform: [{ scale: cardScale }],
    opacity: cardOpacity,
  };

  const renderCards = () => {
    return newsheader.map((news, index) => {
      const cardRotate = scrollY.interpolate({
        inputRange: [index * 10, (index + 1) * 10],
        outputRange: ['0deg', '360deg'],
        extrapolate: 'clamp',
      });

      const animatedCardStyle = {
        ...cardStyle,
        transform: [...cardStyle.transform, { rotate: cardRotate }],
      };

      return (
        <Animated.View key={index} style={[styles.cardContainer, animatedCardStyle]}>
          <Card containerStyle={styles.card}>
            <Card.Title style={styles.cardTitle}>{news.title}</Card.Title>
            <Card.Divider />
            <Text style={styles.cardDescription}>{news.description}</Text>
            <View style={styles.readMore}>
              <Icon name="arrow-right" type="font-awesome-5" color="#333" size={16} />
              <Text style={styles.readMoreText}>Read More</Text>
            </View>
          </Card>
        </Animated.View>
      );
    });
  };

  return (
    <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
      {renderCards()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  readMore: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  readMoreText: {
    marginLeft: 4,
    color: '#333',
    fontWeight: 'bold',
  },
});

export default HeadlinesScreen;
