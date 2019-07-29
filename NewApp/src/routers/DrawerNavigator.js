import React from "react";
import { createDrawerNavigator } from "react-navigation";
import SideBar from "../containers/SlidebarContainer";
import Home from "../containers/HomeContainer";
import Modal from "../containers/ModalContainer";
import BotDetail from "../containers/BotDetailContainer";
import MyChat from "../containers/MyChatContainer";
import Chat from "../containers/ChatContainer";
import chatting from "../containers/chattingContainer"
import Login from "../containers/LoginContainer";

export default createDrawerNavigator(
  {
    Home: { screen: Home },
    Modal: { screen: Modal },
    chatting: {screen: chatting},
    Chat: {screen: Chat},
    Login: {screen: Login}
    
  },
  {
    initialRouteName: "Login",
      drawerPosition:"right",
      drawerType:"slide",
    contentComponent: props => <SideBar {...props} />
  }
);
