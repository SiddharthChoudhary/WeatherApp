import PushNotification from 'react-native-push-notification';
import { PushNotificationIOS } from 'react-native';

const configure = () => {
 PushNotification.configure({

   onRegister: function(token) {
     //process token
   },

   onNotification: function(notification) {
     // process the notification
     // required on iOS only
     notification.finish(PushNotificationIOS.FetchResult.NoData);
   },

   permissions: {
     alert: true,
     badge: true,
     sound: true
   },

   popInitialNotification: true,
   requestPermissions: true,

 });
};

const localNotification = () => {
 PushNotification.localNotification({
   title: "My Notification Title", // (optional)
   message: "My Notification Message", // (required)
   playSound: false, // (optional) default: true
   foreground:true,
   soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
   //number: '10', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
   repeatType: 'day', // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
   actions: '["Yes", "No"]'
 });
};

export {
 configure,
 localNotification
};
