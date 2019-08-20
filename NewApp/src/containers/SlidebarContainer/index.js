import React, { Component } from "react";
import Sidebar from "../../components/Sidebar";
import { connect } from "react-redux";
import { userRequestLogout } from "../../actions";
import  {AsyncStorage }from "react-native";
class SidebarContainer extends Component {
  constructor(props) {
    super(props);
      this.state = {
        name:''  
      };
    this.data = [
      {
        name: "Home",
        route: "Home",
        icon: "home"
      },
      {
        name: "Modal",
        route: "Modal",
        icon: "albums"
      },
      {   
        name: "Bot Detail",
        route: "BotDetail",
        icon: "albums"
      },
      {
        name: "Logout",
        route: "Logout",
        icon: "log-out"
      }
    ];
  }
    componentDidMount(){
       AsyncStorage.setItem('user_name_active_chat','demo account');
        this.fiveSecTimer();
    }
 fiveSecTimer(){
        setTimeout(function () {
            console.log('fetch name');
            AsyncStorage.getItem('user_name_active_chat').then((value) => {
            this.setState({
                name:value
            })
                console.log(value)
          
       });
          console.log( )
            this.fiveSecTimer();
        }.bind(this), 200)
    }
  navigator(data) {
    if (data.route === "Logout") {
      this.props.logout();
      this.props.navigation.navigate("Login");
    } else {
      this.props.navigation.navigate(data.route);
    }
  }

  render() {
    return (
      <Sidebar
        data={this.data}
        hello={this.state.name}
        onPress={(data) => this.navigator(data)}/>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(userRequestLogout())
});

export default connect(
  null,
  mapDispatchToProps
)(SidebarContainer);
