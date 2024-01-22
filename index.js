/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './App';
import { Provider } from 'react-redux';
import store from './src/services/Store';
import PushNotification from 'react-native-push-notification';
import { useEffect } from 'react';

const Index = () => {

   useEffect(() => {
    PushNotification.configure({
        onNotification:function(notification){
            console.log('NOTIFICATION',notification)
        },
        senderID:'newsnotification-59fb2'
    })
   },[])

    return(
        <Provider store={store}>
        <App/>    
        </Provider>
    )
}

AppRegistry.registerComponent(appName, () =>Index );
