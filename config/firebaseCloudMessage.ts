import messaging from "@react-native-firebase/messaging";
import { Alert } from "react-native";

const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log("Authorization status:", authStatus);
    return true;
  } else return false;
};

const getFCMToken = async () => {
  if (await requestUserPermission()) {
    // return fcm token for the device
    messaging()
      .getToken()
      .then((token: string) => {
        console.log("FCM token: ", token);
      });
  } else {
    console.log("Failed token");
  }
};

export const FCMConfig = () => {
  getFCMToken();

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(async (remoteMessage) => {
      if (remoteMessage) {
        console.log(
          "Notification caused app to open from quit state:",
          remoteMessage.notification
        );
        // set Initial route here
      }
    });

  messaging().onNotificationOpenedApp((remoteMessage) => {
    console.log(
      "Notification caused app to open from background state:",
      remoteMessage.notification
    );
    // set Initial route here
  });

  // Handle background messages using setBackgroundMessageHandler
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log("Message handled in the background!", remoteMessage);
  });

  // Handle foreground messages using setBackgroundMessageHandler
  messaging().onMessage(async (remoteMessage) => {
    Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
  });
};
