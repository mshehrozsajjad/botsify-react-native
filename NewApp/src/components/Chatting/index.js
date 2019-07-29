import React, { Component } from "react";
import {  Header, Left, Container, Button, Body, Title, Right, Icon, Text, Content, Alert} from "native-base";
import { StatusBar , View, Image, ActivityIndicator, BackHandler, AsyncStorage} from "react-native";
import styles from "./styles";
import { GiftedChat , Bubble} from "react-native-gifted-chat";


console.disableYellowBox = true

const avatar = require("../../../assets/avatar2.png");
var bot_id = ""
var fbId = ""
var access_token = ""
var data = [];
var name = ""
var id = ""
var obj = ""
export default class Chatting extends Component {


  state = {
    isLoading: true,
    messages: [],
    dataSource: [],
  }

  constructor(props)
  {
    super(props);

    var bot_id1 = props.navigation.state.params.bot_id;
    var fbId1 =  props.navigation.state.params.fbId;
    var access_token1 = props.navigation.state.params.access_token;
    var name1 = props.navigation.state.params.name;
    var id1 = props.navigation.state.params.id;

    fbId = fbId1;
    bot_id = bot_id1;
    access_token = access_token1;
    name = name1;
    id = id1;
    
    console.log("fbID");
    console.log(fbId);
    console.log("BOT ID");
    console.log(bot_id);
    console.log("access_token");
    console.log(access_token);
    console.log("name");
    console.log(name);
    console.log("id")
    console.log(id)
    }

    _storeData = async (id, data) => {
      try {
        await AsyncStorage.setItem('@MySuperStore:key', 'I like to save it.');
      } catch (error) {
        // Error saving data
      }
    };

    renderBubble (props) {
      return (
        <Bubble
          {...props}
          wrapperStyle={{
            right: {
              backgroundColor: "#7CD1E9"
            }
          }}
        />
      )
    }
  

  componentDidMount() 
  {
    this.backButton = BackHandler.addEventListener("hardwareBackPress", () =>{ 
      
      this.props.navigation.navigate("Chat", { bot_id: bot_id, access_token: access_token})
      return true;

      });

    let formData = new FormData();

    formData.append("bot_id", bot_id);
    formData.append("fbId", fbId);

    return fetch("https://dev.botsify.com/api/v1/get-chat", {
      method: "post",
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + access_token

      },
      body: formData })
    
      .then((response) => response.json() )
      .then((responseJson) => {
        this.setState({ 
          isLoading: false,
          dataSource: responseJson.conversations,
        })
          data = this.state.dataSource;
          console.log("data");
          console.log(data);
          console.log("data length");
          console.log(data.length);

          this.setState({
            messages: [
              
            ],
          });

          for (var i =0 ; i < data.length ; i++)
          {
            if (data[i].type === "received")
            {
              obj = JSON.parse(data[i].json_recieved);
              
            this.setState(previousState => ({
              messages: GiftedChat.append(previousState.messages, {
                _id: id,
                text: obj.messaging[0].message.text,
                createdAt: data[i].created_at,
                  
                user: {
                  _id: bot_id,
                  name: "React Native",
                  avatar: avatar,
                },
              }),
            }));
          }
          
          else if (data[i].type === "sent")
            {
              obj = JSON.parse(data[i].json_sent);
              if (obj.attachment !== undefined)
              {
                if (obj.attachment.type === "image")
                {
                  console.log(obj.attachment.payload.url);
                  this.setState(previousState => ({
                    messages: GiftedChat.append(previousState.messages, {
                      _id: bot_id,
                      text: obj.text,
                      createdAt: data[i].created_at,
            
                      user: {
                        _id: id,
                        name: bot_id,
                        avatar: avatar,
                      },
                      image: obj.attachment.payload.url,
                    }),
                  }));
                }
              }             
             
              else {
            this.setState(previousState => ({
              messages: GiftedChat.append(previousState.messages, {
                _id: bot_id,
                text: obj.text,
                createdAt: data[i].created_at,
      
                user: {
                  _id: id,
                  name: bot_id,
                  avatar: avatar,
                },
              }),
            })); 
          }
          }
        }
       
           })
    
    .catch(error => {
      console.log(error);});
 
  }

  componentWillUnmount(){
    this.backButton.remove();
    }
  
  onSend(messages = []) {

    console.log("IN SEND MESSAGE METHOD");
    console.log(messages[0].text);
    
    let formData = new FormData();

    formData.append("bot_id", bot_id);
    formData.append("fbId", fbId);
    formData.append("message", messages[0].text)

    return fetch("https://dev.botsify.com/api/v1/send-message", {
      method: "post",
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + access_token

      },
      body: formData })
    
      .then((response) => response.json() )
      .then((responseJson) => {
        this.setState(previousState => ({
              messages: GiftedChat.append(previousState.messages, {
                _id: bot_id,
                text: messages[0].text,
                createdAt: new Date(),
      
                user: {
                  _id: id,
                  name: bot_id,
                  avatar: avatar,
                },
              }),
            }));
 })
}
  render() {


    if (this.state.isLoading ) 
      {
        return ( 
          <View style={styles.loading}>
          <ActivityIndicator/>
        </View>
        )
        
      }
    return (
        <Container style={styles.container}>
        <StatusBar translucent={false} />
        <Header
          noShadow
          iosBarStyle={"dark-content"}
          androidStatusBarColor={"#7CD1E9"}
          style={{ borderBottomWidth: 0 ,  alignSelf: "stretch", paddingLeft: 0, paddingRight: 0, borderColor: "#7CD1E9"}}>
          <Left style={[styles.headerLeft, {padding: 0}]}>
            <Button transparent onPress={() => this.props.navigation.openDrawer()} >
              <Icon name="menu" style={{ color: "#000",}}/>
            </Button>
          </Left>
          <Body style={ [styles.headerBody, {padding: 0}]}>
          <Text style={styles.BotsifyHeaderText} >{name}</Text>
          </Body>
          <Right style={[styles.headerRight, {padding: 0}]}/>
        </Header>
        <View  style={{flex:1, backgroundColor: "#7CD1E9", borderColor: "#7CD1E9", alignSelf: "stretch"}}>
            <View style={styles.BotsifyHeaderRadius}>
              <GiftedChat
                     renderBubble={this.renderBubble}
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    user={{
                    _id: id,
                    }}
                />
              </View>
            </View>
      </Container>
    )
  }
}
{/*

   this.setState({
      messages: [
        {
          _id: 1,
          text: "Hello developer",
          createdAt: new Date(),

          user: {
            _id: 2,
            name: "React Native",
            avatar: avatar,
          },
        },
      ],
    })

*/}

{/*
          for (var i = 0; i <= data.length; i++)
          {
              messagesArr.push( messages: [
                {
                  _id: 1,
                  text: "Hello developer",
                  createdAt: new Date(),
        
                  user: {
                    _id: 2,
                    name: "React Native",
                    avatar: avatar,
                  },
                },
              ]) 
          }

          this.setState({
            messages : messagesArr
          });

          console.log("messages state");
          console.log(this.state.messages);
          console.log("messagesArr");
          console.log(messagesArr);

        */}