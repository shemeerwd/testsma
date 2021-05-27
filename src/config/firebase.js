import firebase from "firebase/app";
import "firebase/auth";
import "firebase/messaging";
import config  from "../config"
import { registerTokens }from "../app/containers/user/service";


export function init() {
  if (!firebase.apps.length) {
    firebase.initializeApp(config.firebase.appConf);
    if (config.AllowPushNotification) 
      initializePush();
  }
}

export function firebaseMessaging() {
  if (!global.messaging) {
    if (firebase.messaging.isSupported()) {
      global.messaging = firebase.messaging();
      global.messaging.usePublicVapidKey(config.firebase.usePublicVapidKey);
    }
  }
  return global.messaging;
}

export function initializePush() {
  const messaging = firebaseMessaging();
  if (!messaging) return;
  messaging
    .requestPermission()
    .then(() => {
      return messaging.getToken();
    })
    .then(async token => {
      console.log("FCM Token:", token);
      global.fcm_token = token;
      await registerTokens({token:token});
    })
    .catch(error => {
      if (error.code === "messaging/permission-blocked") {
        console.log("Please Unblock Notification Request  Manually");
      } else {
        console.log("Error Occurred", error);
      }
    });
    messaging.onMessage((payload) => {
      console.log("onMessage received. fb ", payload);
      const title = payload.notification.title;
      const options = {
          body: payload.notification.body,
          icon:"images/eatitin192.png"
      }
      new Notification(title, options);
  });   
}

export default firebase;
