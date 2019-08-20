import React, { Component } from "react";
import {  Header, Left, Container, Button, Body, Title, Right, Icon, Text, Content } from "native-base";
import { View,StatusBar,TouchableOpacity,Image,ScrollView,TextInput ,AsyncStorage,BackHandler} from "react-native";
import styles from "./styles";
import { GiftedChat } from 'react-native-gifted-chat'
import { LoginButton,AccessToken, LoginManager } from "react-native-fbsdk"
const backbutton = require('../../../assets/left-arrow.png');
const Avatar = require('../../../assets/default-avatar.png');
import firebase from 'firebase'
export default class MyChat extends Component {
        constructor(props) {
        super(props);
            
        this.state = {
          counter: 0,
              client_id: 0,
          client_secret: 0,
          username: 0,
          name: '',
          password: 0,
            useridentity:'',
            fetched:true,
            isLoadingChat:true,
 access_token:null,
          allmessages: [],
            messagelength:0,
            messagefetched:false,
            premessage:''
        };
       this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
}
componentDidMount(){
     BackHandler.addEventListener('hardwareBackPress', () => {
      this.handleBackButtonClick(); // works best when the goBack is async
      return true;
    });
}
   handleBackButtonClick() {
  this.props.navigation.navigate("BotDetail",{
              Id: this.props.navigation.getParam('bot_id'),
              botname: this.props.navigation.getParam('botname'),
                bot_key:this.props.navigation.getParam('bot_key')
            })
}
    _handlepremessage(data){
 
    }
    _handledataLength(length,data){
        if(this.state.messagefetched === false){
        this.setState({
            messagelength:length-2,
            messagefetched:true
        })
        }
        
    }
    _handlereducecount(){
        if(this.state.messagelength <= 0){
 }else{
                  this.setState({
                      messagelength:this.state.messagelength - 1
                  })
              } 
    }
    _handleTextChange(messagesarray){
        var date = new Date();
if(this.state.messagelength <= 0){
    
   console.log(this.state.messagelength)
   console.log(this.state.premessage)
   console.log(date.getSeconds())
   console.log(this.state.premessagetime)
    if(messagesarray[0].text === this.state.premessage && date.getSeconds() !== this.state.premessagetime ){
        console.log('message matched and check timed')
       this.setState(previousState => ({
                      allmessages: GiftedChat.append(previousState.allmessages, messagesarray),
                    }))
        
        }else if (messagesarray[0].text !== this.state.premessage){
            console.log('message not matched')
            this.setState(previousState => ({
                      allmessages: GiftedChat.append(previousState.allmessages, messagesarray),
                    }))
        }
              }else{
                  this.setState({
                      messagelength:this.state.messagelength - 1
                  })
              } 
        this.setState({
            premessagetime:date.getSeconds(),
               premessage:messagesarray[0].text
        })
       
//        console.log(this.state.messagelength) 
//        console.log(messagesarray)
    }
// program() {
//    return new Promise(function (resolve, reject) {
//        try {
//              firebase.database.enableLogging(true);
//            const databaseas = firebase.database().ref("/users/L34ZIyeNjbCLup5WTYHr71a9Hz728a0MkEXtKjPm/130709");
//             databaseas.on("value", function(snapshot){
//               data = snapshot.val();
//                  if(data !== null){
//                  data_length = Object.keys(data).length;
//                      alert(Object.keys(data).length) 
//                }else{
//                  data_length = 1;
//                  var firebase_keys_length = 1;
//                }
//              });
//            var firebase_interval = setInterval(function(){
//            if(data_length > 0){
//              userStatusDatabaseRef.on("child_added", function(snapshot){
//                data = snapshot.val();
//                  console.log(data)
//                if(data.message){
//                let messagesarray = [];
//                  console.log(data.message.messages.length)
//                  
//console.log(data.message.messages[0])
//                      if(data.message.messages[0].direction === 'from'){
//                          var received = {_id:Math.round(Math.random()*100000), text:data.message.messages[0].message.text, createdAt: data.message.messages[0].created_at,user: {_id: 2,name: 'Bot',
//                            avatar: Avatar}};
//                          messagesarray.push(received);
//                          
//                      }else if(data.message.messages[0].direction === 'to'){
//                          var sendmessage = {_id:Math.round(Math.random()*100000), text:data.message.messages[0].message.text, createdAt: data.message.messages[0].created_at,user: {_id: 1}};
//                          messagesarray.push(sendmessage);
//                        
//                      }
//                     _hello.setState(previousState => ({
//                      allmessages: GiftedChat.append(previousState.allmessages, messagesarray),
//                    }))     
//              }       
//          });
//          clearInterval(firebase_interval);
//        }
//      },10);  
//        } catch (e) {
//
//            alert(e)
//        }
//    });
//}
    
componentWillMount() {
    AsyncStorage.getItem('auth_data').then((value) => {
             if(value != null){
           var value = JSON.parse(value)
           this.setState({
               client_id:value.client_id,
               client_secret:value.client_secret,
               username:value.username,
               password:value.password,
           })
          }else{
                AsyncStorage.removeItem('acess_token');
                AsyncStorage.removeItem('auth_data');
                this.props.navigation.navigate("Login")
          }
       });

     
    
//    console.log(this.props.navigation.getParam('username'))
     AsyncStorage.setItem('user_name_active_chat', this.props.navigation.getParam('username'));
    this.setState({
        name:this.props.navigation.getParam('username')
    })
//    console.log(firebase.apps.length)
    _hello = this; 
 var data_length = 0;
var data = null;
   var userStatusDatabaseRef = firebase.database().ref("/users/"+this.props.navigation.getParam('bot_key')+"/"+this.props.navigation.getParam('user_id'));
    userStatusDatabaseRef.on("child_changed", function(snapshot){
          //output.innerHTML = JSON.stringify(snapshot.val(), null, 2);
         data = snapshot.val();
        if (data.online == true) {
        }else{
        }

      });
userStatusDatabaseRef.on("value", function(snapshot){
          //output.innerHTML = JSON.stringify(snapshot.val(), null, 2);
        data = snapshot.val();
        if(data !== null){
          data_length = Object.keys(data).length;
             _hello._handledataLength(data_length,data)
        }else{
          data_length = 1;
          firebase_keys_length = 1;
        }    


      });
                 

          var firebase_interval = setInterval(function(){
          if(data_length > 0){
              userStatusDatabaseRef.on("child_added", function(snapshot){
                var data = snapshot.val();
                  console.log(data)
                if(data.data !== undefined){
                if(data.data.json_recieved !== undefined){
//                    console.log(JSON.parse(data.data.json_recieved))
                    
                let messagesarray = [];
                     
                          var received = {_id:Math.round(Math.random()*100000), text:JSON.parse(data.data.json_recieved).messaging[0].message.text, createdAt: new Date(),user: {_id: 2,name: 'Bot',
                            avatar: Avatar}};
                    _hello._handlepremessage(JSON.parse(data.data.json_recieved).messaging[0].message.text)
                          messagesarray.push(received);
                          
                     _hello._handleTextChange(messagesarray)
                        
              }  
                }
                  if(data.json_sent !== undefined){
                  
                      let messagesarray = [];
                       var linkmessage = {_id:Math.round(Math.random()*100000), text:data.json_sent.text, createdAt: new Date(),user: {_id: 1}};
                          _hello._handlepremessage(data.json_sent.text)
                            messagesarray.push(linkmessage);
                        _hello._handleTextChange(messagesarray)
                       
                  }
                  if(data.message !== undefined){
                      
                            _hello._handlepremessage('')
                        _hello._handlereducecount();
//                       
                  } 
          });
          clearInterval(firebase_interval);
         
          }
      },10);  


 
//       this.program().then(function (result) {
//        alert(result)
//        //Do what you want with the result here
//    }).catch(function (error) {
//        alert(error)
//})
//       this.hello;
//       console.log('asdasdasdasdasdadasd')
       AsyncStorage.getItem('acess_token').then((value) => {
             if(value != null){
           var value = JSON.parse(value)
           this.setState({
               access_token:value,
               
           })
            var fbId = this.props.navigation.getParam('fbId')
            var bot_id = this.props.navigation.getParam('bot_id')
        this.getBotChat(bot_id,fbId);
          }else{
                AsyncStorage.removeItem('acess_token');
                AsyncStorage.removeItem('auth_data');
                this.props.navigation.navigate("Login")
          }
       });
  
   }
          getBotChat(bot_id,fbId){
//          console.log('bot_idbot_idbot_idbot_id')
//          console.log(bot_id)
//          console.log(fbId)
        var form = new FormData();
form.append("bot_id", bot_id);
form.append("fbId", fbId);
       
         var url = 'https://botsify.com/api/v1/get-chat'
       fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization':'Bearer '+ this.state.access_token
        },
        body: form,
    })
    .then(response => response.json())
           .then(response => { 
            let messagesarray = [];
           
            for(let i=response.conversations.length-1;i>=0; i--){
//                console.log(response.conversations[i])
                if( response.conversations[i].json_sent === undefined){
                      for(let j=0;j< JSON.parse(response.conversations[i].json_recieved).messaging.length; j++){
                          var receviedmessage = {_id:Math.round(Math.random()*100000), text:JSON.parse(response.conversations[i].json_recieved).messaging[j].message.text, createdAt: Date(response.conversations[i].json_recieved.created_at),user: {_id: 2,name: 'Bot',
                            avatar: Avatar}};
                         messagesarray.push(receviedmessage);
                     } 
                }else if (response.conversations[i].json_recieved === undefined){
                    if(JSON.parse(response.conversations[i].json_sent).text === undefined){
                        if(JSON.parse(response.conversations[i].json_sent).attachment !== undefined){
                      
                        if(JSON.parse(response.conversations[i].json_sent).attachment.payload.elements === undefined){
                        if(JSON.parse(response.conversations[i].json_sent).attachment.payload.url !== undefined){

                             var attachmentmessage = {_id:Math.round(Math.random()*100000), text:'image', createdAt: Date(response.conversations[i].json_sent.created_at),user: {_id: 1},image:JSON.parse(response.conversations[i].json_sent).attachment.payload.url};
                                messagesarray.push(attachmentmessage);
                        }
                        }else{
                        if(JSON.parse(response.conversations[i].json_sent).attachment.payload.elements === undefined){
                             for(let l=0;l< JSON.parse(response.conversations[i].json_sent).attachment.payload.buttons.length; l++){
                                if(JSON.parse(response.conversations[i].json_sent).attachment.payload.buttons[l].url !== undefined){
//                                console.log('url')
//                                console.log(JSON.parse(response.conversations[i].json_sent).attachment.payload.buttons[l].url)
                          
                             var linkmessage = {_id:Math.round(Math.random()*100000), text:JSON.parse(response.conversations[i].json_sent).attachment.payload.buttons[l].url, createdAt: Date(response.conversations[i].json_sent.created_at),user: {_id: 1}};
                            messagesarray.push(linkmessage);}
                         }
                        }else if(JSON.parse(response.conversations[i].json_sent).attachment.payload.buttons === undefined){
                             for(let k=0;k< JSON.parse(response.conversations[i].json_sent).attachment.payload.elements.length; k++){
//                                console.log('imageurl')
//                                console.log(JSON.parse(response.conversations[i].json_sent).attachment.payload.elements[k].image_url)
                    
                             var attachmentmessage = {_id:Math.round(Math.random()*100000), text:JSON.parse(response.conversations[i].json_sent).attachment.payload.elements[k].title, createdAt: Date(response.conversations[i].json_sent.created_at),user: {_id: 1},image:JSON.parse(response.conversations[i].json_sent).attachment.payload.elements[k].image_url};
                                messagesarray.push(attachmentmessage);
                         }
                        }
                        }
                    }else{
//                        console.log('undefined') 
//                        console.log(JSON.parse(response.conversations[i].json_sent))
                    }
                       }else{

                        var sendmessage = {_id:Math.round(Math.random()*100000), text:JSON.parse(response.conversations[i].json_sent).text, createdAt: Date(response.conversations[i].json_sent.created_at),user: {_id: 1}};
                            messagesarray.push(sendmessage);
                       }
                }
            }
            this.setState({
      allmessages: messagesarray,
                fetched:true,
                isLoadingChat:false
    })  
       }) 
           
        .catch(error => console.error('Error:', error));
        
    }
       onSend(messages = []) {
         this.setState(previousState => ({
      allmessages: GiftedChat.append(previousState.allmessages, messages),
    }))
         var fbId = this.props.navigation.getParam('fbId')
            var bot_id = this.props.navigation.getParam('bot_id')
            console.log(fbId)
            console.log(bot_id)
              var form = new FormData();
            form.append("bot_id", bot_id);
            form.append("fbId", fbId);
            form.append("message", messages[0].text);
        console.log(form)
         var url = 'https://botsify.com/api/v1/send-message'
       fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization':'Bearer '+ this.state.access_token,
        },
        body: form,
    })
    .then(response => response.json())
           .then(response => { 
           console.log('done')
           console.log(response)
 })
        .catch(error => console.error('Error:', error));

        console.log(messages)    
  }

  render() {
    return (
      <Container style={styles.container}>
        <StatusBar translucent={false}/>
            <Header
              noShadow
              iosBarStyle={"dark-content"}
              androidStatusBarColor={"#fff"}
               style={{ borderBottomWidth: 0,backgroundColor:'#7CD1E9' }}>
                <Left style={styles.headerLeft}>
            <Button transparent onPress={() => this.handleBackButtonClick()}>
              <Image
                            resizeMode="contain"
                            source={backbutton}
                            style={styles.backbutton}
                            />
            </Button>
          </Left>
                <Body style={styles.headerBody}>
                    <Title style={styles.textBody}>{this.state.name}</Title>
                  </Body>
                  <Right style={styles.headerRight}>
                        <Button transparent onPress={() => this.props.navigation.openDrawer()}>
                          <Icon name="menu" style={{ color: "#fff" }}/>
                        </Button>
                </Right>
            </Header>
            <View style={styles.BotsSection}>
                <View  style={{flex:1, backgroundColor: "#7CD1E9"}}>
                    <View style={styles.CurveHeaderRadius}>        
                    </View>
                </View>
            </View>
            <GiftedChat
            messages={this.state.allmessages}
            onSend={messages => this.onSend(messages)}
            user={{
              _id: 1,
            }}
          />
      </Container>
    );
  }
}
