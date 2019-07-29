import React, { Component } from "react";
import { Header, Left, Container, Button, Body, Title, Right, Icon, Text, Content, Alert} from "native-base";
import { StatusBar , View, Image, BackHandler, TouchableOpacity, TouchableHighlight, ActivityIndicator, Dimensions} from "react-native";
import styles from "./styles";
import Moment from "moment";


const avatar = require("../../../assets/avatar2.png");
const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);
var access_token = "";
var bot_id = "";
var data = []
var users = [];
var dt =""

class ChatBox extends Component {
  render () {    
    
    Moment.locale("en");
    dt = Moment(this.props.lastTime).format("M/d/Y")
   
    if (dt === "Invalid date")
    {
        dt = ""
      }
    
    return (

      <View>
        <TouchableHighlight onPress={() => this.props.navigation.navigate("chatting",
          { bot_id: bot_id, fbId: this.props.fbId, access_token: access_token, name: this.props.name, id : this.props.id})}>
          <View style={[styles.chatStrip, {marginLeft: screenWidth * 0.05 , marginRight: screenWidth * 0.05}]}>
            <Image source={avatar} style = {styles.chatImage}/>
              <View>
                <View style={{flexDirection: "row", flex:1 }}>
                  <Text style= {[styles.usernameChat, {width : screenWidth * 0.5}]}>{this.props.name}</Text>
                  <Text style={styles.timeText}>{dt}</Text>
                </View>
                <View style={{flexDirection: "row", flex: 1}}>
                  <Text style= {styles.chatText}>{this.props.lastMSG}</Text>
                </View>
              </View>
            </View>
      </TouchableHighlight>
    </View>
    );
}
}

export default class Chat extends Component {

  state = {
    isLoading: true,
    dataSource: [],
  }

  constructor(props)
  {
    super(props);
    var access_token1 = props.navigation.state.params.access_token;
    var bot_id1 =  props.navigation.state.params.bot_id;
    access_token = access_token1;
    bot_id = bot_id1;
  }

  componentDidMount()
  {
    this.backButton = BackHandler.addEventListener("hardwareBackPress", () =>{ 
      
      this.props.navigation.navigate("Home")
      return true;

      });

    let formData = new FormData();

    formData.append("bot_id", bot_id);

    return fetch("https://dev.botsify.com/api/v1/get-bot-users", {
      method: "post",
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer " + access_token

      },
      body: formData })
    
      .then((response) => response.json() )
      .then((responseJson) => {
        console.log("RESPONSE JSON PRINTED")
        console.log(responseJson)
        this.setState({
          
          dataSource: responseJson.messengerUsers,
        })
          data = this.state.dataSource;
          console.log("data")
          console.log(data);
          console.log(new Date())
          users = [];

          for (var i = 0; i < data.length; i++)
            {
              users.push(<ChatBox name = {data[i].name} navigation = {this.props.navigation} lastMSG = {data[i].last_user_msg} 
                lastTime = {data[i].last_converse} fbId = {data[i].fbId} id = {data[i].id} />)
            }

            this.setState({
          
              isLoading: false,
            })

            
 
            
    
    }).catch(error => {
      console.log(error);});
  }

  render() {
    

    if (this.state.isLoading)
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
            <Button transparent onPress={() => this.props.navigation.openDrawer()}>
              <Icon name="menu" style={{ color: "#000",}}/>
            </Button>
          </Left>
          <Body style={ [styles.headerBody, {padding: 0}]}>
          <Text style={styles.BotsifyHeaderText} >Botsify</Text>
          </Body>
          <Right style={[styles.headerRight, {padding: 0}]}/>
        </Header>

      <Content style={{backgroundColor: "white", flex: 9}}>
          <View style={styles.BotsSection}>

            <View  style={{flex:1, backgroundColor: "#7CD1E9", borderColor: "#7CD1E9", alignSelf: "stretch"}}>
              <View style={styles.BotsifyHeaderRadius}>
                <Text style={styles.BotUsersText}>Bot Users</Text>
              </View>
            </View>
            <View style={{flex:9}}>
              <View style={styles.activeUsers}>
              <Text style={styles.activeUsersText}>Active Users</Text>
              <View style={{}}>
                <View style={{flexDirection: "row", paddingLeft: 15, paddingRight:15, paddingBottom: 15}}>
                  <View style={styles.activeUsersBox} >
                    <Image source={avatar} style = {styles.userImage}/>
                    <Text style={styles.usernameText}> Jon</Text>
                  </View>
                  <View style={styles.activeUsersBox} >
                    <Image source={avatar} style = {styles.userImage}/>
                    <Text style={styles.usernameText}> Steven</Text>
                  </View>
                  <View style={styles.activeUsersBox} >
                    <Image source={avatar} style = {styles.userImage}/>
                    <Text style={styles.usernameText}> Roger</Text>
                  </View>
                  <View style={styles.activeUsersBox} >
                    <Image source={avatar} style = {styles.userImage}/>
                    <Text style={styles.usernameText}> Mark</Text>
                  </View>
                  <View style={styles.activeUsersBox} >
                    <Image source={avatar} style = {styles.userImage}/>
                    <Text style={styles.usernameText}> Stanley</Text>
                  </View>
                </View>
              </View>
              </View>

              <View style = {{marginTop: 10}}> 
              {users}
              </View>
            </View>
        </View>
      </Content>
      </Container> 
    );
  }
}













{/*<SectionList
                renderItem={({item, index, section}) =>  <View><TouchableHighlight onPress={() => this.props.navigation.navigate("chatting")}>
                  <View style={styles.chatStrip}>
                <Image source={avatar} style = {styles.chatImage}/>
                <View>
                  <View style={{flexDirection: "row"}}>
                <Text style= {styles.usernameChat}>Roger</Text>
                <Text style={[styles.timeText, {marginLeft: screenWidth * 0.35}]}> 11:57am</Text>
                </View>
                
                <View style={{flexDirection: "column"}}>
                <Text key={index} style= {styles.chatText}>{item}{index}</Text>
                </View>
                </View>

              </View>
              </TouchableHighlight>

              </View>

            }
                renderSectionHeader={({section: {title}}) => (
                  <Text style={styles.chatUsersText}>Chat Users</Text>
                )}
                
                sections={[
                  {title: "Title1", data: ["Roger", "What Are You Doing ?"],
                  title1 : "Title2", data1: ["Roger", "What Are You Doing ?"]},
                ]}

                

                keyExtractor={(item, index) => item + index}
              />
*/}



{/*<View><TouchableHighlight onPress = {()=> this.shadow()}>
                  <View style={this.state.chatStrip}>
                <Image source={avatar} style = {styles.chatImage}/>
                <View>
                  <View style={{flexDirection: "row"}}>
                <Text style= {styles.usernameChat}>Roger</Text>
                <Text style={styles.timeText}> 11:57am</Text>
                </View>
                <View style={{flexDirection: "column"}}>
                <Text key={index} style= {styles.chatText}>{item}{index}</Text>
                </View>
                </View>

              </View>
              </TouchableHighlight>

              {/*<View style={{
                borderBottomColor: "black",
                borderBottomWidth: 1, flexDirection: "column", marginLeft: 110, marginRight: 40
              }}
            />}

          </View>*/ }