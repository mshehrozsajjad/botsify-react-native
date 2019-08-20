import React, { Component } from "react";
import SplashScreen from "react-native-splash-screen";
import Loading from "../../components/Loading";
import { connect } from "react-redux";
import { AsyncStorage } from "react-native";
import firebase from 'firebase';
class LoadingContainer extends Component {
  componentDidMount(){
      
    setTimeout(() => {
      SplashScreen.hide();
    }, 300);
    this.props.navigation.navigate(this.props.auth.token ? "App" : "Login");
  }
    componentWillMount(){
         var config = {
            apiKey: "AIzaSyBg35pXOmXzWIXioY7WU2yu2wTSVXbtc48",
            authDomain: "botsifylamda.firebaseapp.com",
            databaseURL: "https://botsifylamda.firebaseio.com",
            projectId: "botsifylamda",
            storageBucket: "botsifylamda.appspot.com",
            messagingSenderId: "1038681341325"
          };
        firebase.initializeApp(config);
    }
      
  render() {
    return (
      <Loading navigation={this.props.navigation}/>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
});


export default connect(
  mapStateToProps,
  null
)(LoadingContainer);
