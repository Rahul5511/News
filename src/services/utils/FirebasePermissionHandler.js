import messaging from '@react-native-firebase/messaging';
import PushNotification from "react-native-push-notification";
import { useEffect } from 'react';
import { check,request,PERMISSIONS,RESULTS } from 'react-native-permissions';



const FirebasePermissionHandler = () => {

  const requestNotificationpermission = () => {
    PushNotification.requestPermissions()
  }

  const requestNotificationPermission =async () => {
    try{
       const status = await check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
       if(status === RESULTS.GRANTED) {
         console.log("Notifications permission already granted")
       }else{
         const permissionStatus = await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
         if(permissionStatus === RESULTS.GRANTED){
           console.log('notification permission granted')
         }else{
           console.log('notification permission denied')
         }
       }
    }catch(error){
      console.error('permission request error',error)
    }
 }

  const createNotificationChannel = () => {
    PushNotification.createChannel({
      channelName : "NewsHunt_Daily_Notification",
      channelId : `com.newsApp.latestNews.teslaChannel.appNotification`,
      channelDescription: "A default channel for notifications", // Description
      soundName: "default", // Sound for the notifications
      importance: 5, // Importance levels range from 1 to 5 (default is 4)
      vibrate: true, 
    },
    (created, error) => {
      if (error) {
        console.log(`Channel creation failed: ${error}`);
      } else {
        console.log(`Channel created successfully: ${created}`);
      }
    }
    )
  };
  
  
  const handleBackgroundNotification = async (remoteMessage) => {
    console.log('Background message:', remoteMessage);
  };
  
  useEffect(() => {
    createNotificationChannel();
    requestNotificationpermission();
    requestNotificationPermission();
    const unsubscribeForeground = messaging().onMessage(async (remoteMessage) => {
      console.log('Foreground message:', remoteMessage);
  
      PushNotification.localNotification({
        channelId: `com.newsApp.latestNews.teslaChannel.appNotification`,
        title: remoteMessage.notification.title,
        message: remoteMessage.notification.body,
      });
  
      // Perform actions based on the received message data when in the foreground
    });
  
    const unsubscribeBackground = messaging().setBackgroundMessageHandler(
      handleBackgroundNotification
    );
  
    const requestUserPermission = async () => {
      try {
        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
        if (enabled) {
          console.log('Authorization status:', authStatus);
        }
      } catch (error) {
        console.error('Permission request error:', error);
      }
    };
  
    const getToken = async () => {
      try {
        PushNotification.requestPermissions();
        const token = await messaging().getToken();
        console.log('Device token:', token);
      } catch (error) {
        console.error('Token retrieval error:', error);
      }
    };
  
    requestUserPermission();
    getToken();
  
    return () => {
      unsubscribeForeground();
      unsubscribeBackground();
    };
  }, []);

  return null
}

export default FirebasePermissionHandler;