import React, { Component } from "react";
import MyChat from "../../components/MyChat";

export default class MyChatContainer extends Component {
    constructor(props){
      super(props)  
    };
  render() {
    return (
      <MyChat navigation={this.props.navigation}/>
    );
  }
}

