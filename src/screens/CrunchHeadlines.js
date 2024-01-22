import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { CrunhHeadliness } from '../services/NewsApi/ApiCall';
import { useSelector,useDispatch } from 'react-redux';
import { Card } from 'react-native-elements';
import { Header,Icon } from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
import DrawerScreen from '../components/DrawerScreen';


const CrunhHeadlines = ({navigation}) => {
  const dispatch = useDispatch();
    const crunchData = useSelector(state =>state.newsApi.techCrunch)
    const [crunchDatas,setCrunchDatas] = useState([]);
    const [activeSidebar, setActivesidebar] = useState(false);

     const openSidebar = () => {
    setActivesidebar(!activeSidebar);
  };
    useEffect(() => {
      const fetchData =() => {
        try{
            dispatch(CrunhHeadliness())
        }catch(error){
           console.log(error)
        }
      }
      fetchData()
    },[])
console.log(crunchData.articles)

    return (
      <ScrollView>
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
        <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}} onPress={() => navigation.navigate('homeScreen')}>
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
       <View>{activeSidebar && <DrawerScreen/>}</View>
       <ScrollView>
       {crunchData && crunchData.articles.map((item, index) => (
         <Card key={index} containerStyle={styles.cardContainer}>
           <Card.Title style={styles.cardTitle}>{item.title}</Card.Title>
           <Card.Divider />
           <Card.Image
             source={{ uri: item.urlToImage }}
             style={styles.cardImage}
           />
           <View style={styles.cardContent}>
             <Text style={styles.cardDescription}>{item.description}</Text>
           </View>
         </Card>
       ))}
    </ScrollView>
      </ScrollView>
   )
}

const styles = StyleSheet.create({

  cardContainer: {
    borderRadius: 10,
    marginBottom: 15,
    elevation: 5, // for Android shadow
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardImage: {
    height: 200,
    borderRadius: 10,
  },
  cardContent: {
    padding: 10,
  },
  cardDescription: {
    fontSize: 14,
    color: 'gray',
  },
});

export default CrunhHeadlines;