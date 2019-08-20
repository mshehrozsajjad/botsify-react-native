import React, { Component } from "react";
import { AsyncStorage } from "react-native";
import { Provider } from "react-redux";
import configureStore from "./stores/configureStore";
import App from "./routers/App";
import getTheme from "../native-base-theme/components";
import material from "../native-base-theme/variables/material";
import { StyleProvider } from "native-base";
import OneSignal from 'react-native-onesignal';
import firebase from 'firebase';
 
export default class Root extends Component {
  constructor(props) {
    super(props);
    const {store } = configureStore();
    this.store = store;
       OneSignal.init("75f47b72-4da1-4a7e-a645-18d29743a6aa");
       OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
    OneSignal.configure(); 	// triggers the ids event
  }
     componentWillUnmount() {
//        var config = {
//            apiKey: "AIzaSyBg35pXOmXzWIXioY7WU2yu2wTSVXbtc48",
//            authDomain: "botsifylamda.firebaseapp.com",
//            databaseURL: "https://botsifylamda.firebaseio.com",
//            projectId: "botsifylamda",
//            storageBucket: "botsifylamda.appspot.com",
//            messagingSenderId: "1038681341325"
//          };
//        firebase.initializeApp(config);
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened); 
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }
componentDidMount(){
    console.log('set name')
    AsyncStorage.setItem('user_name','')
}
  onIds(device) {
    console.log('Device info: ', device);
  }
  render() {
    return (
      <StyleProvider style={getTheme(material)}>
        <Provider store={this.store}>
            <App/>
        </Provider>
      </StyleProvider>
    );
  }
}

global.XMLHttpRequest = global.originalXMLHttpRequest ?
  global.originalXMLHttpRequest :
  global.XMLHttpRequest;
global.FormData = global.originalFormData ?
  global.originalFormData :
  global.FormData;

fetch; // Ensure to get the lazy property

if (window.__FETCH_SUPPORT__) { // it's RNDebugger only to have
  window.__FETCH_SUPPORT__.blob = false;
} else {
  global.Blob = global.originalBlob ?
    global.originalBlob :
    global.Blob;
  global.FileReader = global.originalFileReader ?
    global.originalFileReader :
    global.FileReader;
}

