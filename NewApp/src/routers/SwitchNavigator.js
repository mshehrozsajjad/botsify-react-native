import { createSwitchNavigator } from "react-navigation";
import App from "./AppNavigator";
import Login from "../containers/LoginContainer";
import Chat from "../containers/ChatContainer";
import chatting from "../containers/chattingContainer"
import Loading from "../containers/LoadingContainer"
export default createSwitchNavigator(
  {
   
    App: App,
    Login: Login,
    chatting: chatting,
    Chat: Chat,
    Loading: Loading
  
  },
  {
    initialRouteName: "Loading"
  }
);
