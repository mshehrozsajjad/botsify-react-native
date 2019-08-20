import React, { Component } from "react";
import {  Header, Left, Container, Button, Body, Title, Right, Icon, Text, Content } from "native-base";
import { View,StatusBar,TouchableOpacity,TouchableHighlight,AsyncStorage,Image,ScrollView } from "react-native";
import styles from "./styles"; 
const headerlogo = require('../../../assets/headerlogo.png');
const imgA = require('../../../assets/default-avatar.png');
const backbutton = require('../../../assets/left-arrow.png');
import ContentLoader from 'react-native-content-loader'
import {Circle, Rect} from 'react-native-svg'
import { LoginButton,AccessToken, LoginManager } from "react-native-fbsdk"
export default class BotDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
          counter: 0,
          access_token:null,
          client_id:null,
            users:[],
            deactiveusers:[],
            allusers:[],
          client_secret:null,
            isLoadingActiveUser:true,
            isLoadingotherUser:true,
          username:null,
          password:null,
        };
      this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
 this.handleLogout = this.handleLogout.bind(this);
}
   handleLogout() {
       AsyncStorage.getItem('facebookloggedin').then((value) => {
             if(value != null){
                 LoginManager.logOut();
             }
          
       });
       AsyncStorage.removeItem('auth_data');
       AsyncStorage.removeItem('acess_token');
   this.props.navigation.navigate("Login")

}
   handleBackButtonClick() {
   this.props.navigation.navigate("Home")

}
    getBotUsers(id){
        console.log(id)
       
        var form = new FormData();
form.append("bot_id", id);
       
         var url = 'https://botsify.com/api/v1/get-bot-users'
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
          console.log('bot user response')
          console.log(response.messengerUsers)
          this.setState({
              users:response.messengerUsers
          })
          AsyncStorage.setItem('allusers', JSON.stringify(response.messengerUsers));
          var alldivusers = this.renderBotUsers();
           this.setState({
               allusers:alldivusers,
               isLoadingActiveUser:false
           })
       })
        .catch(error => console.error('Error:', error));
        
    }
    alldeactiveusers(){
        let deactiveusers = [];
        for (var i = 0; i < this.state.users.length; i++) {
           
            const name = this.state.users[i].name
            const id = this.state.users[i].id
            const fbId = this.state.users[i].fbId
            const bot_id = this.state.users[i].bot_id
            const lastmessage = this.state.users[i].last_user_msg
            const picture = imgA;
            if(this.state.users[i].profile_pic === ''){
                const picture = imgA;
            }else{
                const picture = this.state.users[i].profile_pic;
            }
           var str = this.state.users[i].last_converse
                var hour = str.substring(11, 13);
                var min = str.substring(14, 16);
                if(Number(hour) != 0 && Number(min) != 0){
                if(Number(hour) < 12){
                    if(Number(min) <= 9){
                        if(Number(hour) <= 9){
                        var timehour = '0'+hour+':0'+min+' am'
                        }else{
                            var timehour = '0'+hour+':0'+min+' am'
                        } 
                    }else{
                        if(Number(hour) <= 9){
                        var timehour = hour+':'+min+' am'
                        }else{
                            var timehour = hour+':'+min+' am'
                        } 
                        
                    }  
                }else{
                    if(Number(min) <= 9){
                        if(Number(hour) <= 9){
                        var timehour = '0'+(Number(hour) -12)+':0'+min+' pm'
                        }else{
                            var timehour = '0'+(Number(hour) -12)+':0'+min+' pm'
                        } 
                    }else{
                        if(Number(hour) <= 9){
                        var timehour = (Number(hour) -12)+':'+min+' pm'
                        }else{
                            var timehour = (Number(hour) -12)+':'+min+' pm'
                        } 
                        
                    }  
                    
                }
                }else{
                    var timehour = '00:00'
                }
            console.log(hour)
            console.log(min)
//            console.log(timelast)
                 
            deactiveusers.push(
                    <View style={styles.itemWhiteBox}>
                                      <TouchableHighlight
                                        underlayColor='transparent'
                                        style={styles.highlightBox}
                                        onPress={() => this.chathistory(fbId,bot_id,name,id)}
                                      >
                                    <View style={styles.listItemBox}>
                                      <View style={styles.leftCol}>
                                        <View style={styles.avatar}>
                                          <Image
                                            source={imgA}
                                            style={{width: 60, height: 60,borderRadius: 60 / 2}}
                                          /> 
                                        </View>
                                        <View style={[styles.info,{marginLeft: 5}]}>
                                          <Text style={[
                                            styles.itemHeaderText,
                                            styles.blackColor,
                                            styles.mediumBold
                                          ]}>
                                           {name}
                                          </Text>
                                          <Text style={[
                                            styles.shortSmallText,
                                             styles.blackColor,
                                            styles.regularBold,
                                          ]}>
                                            {lastmessage}
                                          </Text>
                                        </View>
                                      </View>
                                      <View style={styles.rightCol}>
                                        <View style={styles.ranking}>
                                          <Text style={[
                                               styles.timeSmallText,
                                            styles.lightgreyColor,
                                            styles.regularBold,
                                            {marginTop: -6, marginLeft: 2}
                                          ]}>
                                            {timehour}
                                          </Text>
                                        </View>
                                      </View>
                                    </View>
                                  </TouchableHighlight>
                                </View>
                
            );
    
        }
    return deactiveusers;
    }
    renderBotUsers(){
        var allthedeactiveusers = this.alldeactiveusers();
        this.setState({
            deactiveusers:allthedeactiveusers,
            isLoadingotherUser:false
        })
        let alldivusers = [];
        
        for (var i = 0; i < this.state.users.length; i++) {
            if(this.state.users[i].connected != 0){
            const name = this.state.users[i].name
            const id = this.state.users[i].id
            const fbId = this.state.users[i].fbId
            const bot_id = this.state.users[i].bot_id
            const picture = imgA;
            alldivusers.push(
                <View style={{backgroundColor: 'transparent', marginLeft:15}} >
                        <TouchableOpacity style={{
                        height: 65,
                        width: 65,
                        borderColor: '#7CD1E9',
                        borderWidth: 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'transparent',
                        alignSelf: 'center',
                        borderRadius: 65/2
                         }}
                        onPress={() => this.chathistory(fbId,bot_id,name,id)}
                        >
                            <Image  source={picture} style={styles.itemThreeeImage} />
                        </TouchableOpacity>
                        <Text style={styles.activetext}>{name}</Text>
                    </View>
                
            );
        }
}
    return alldivusers;
    }
getToken(){
        
        AsyncStorage.getItem('acess_token').then((acess_token) => {
             if(acess_token != null){
                  var acess_token = JSON.parse(acess_token)
                  console.log(acess_token) 
                  
             this.setState({
               access_token:acess_token
           })
            var id = this.props.navigation.getParam('Id')
        this.getBotUsers(id);
             }
       });

  }
    componentDidMount(){
        console.log('bot_key')
      console.log( this.props.navigation.getParam('bot_key'))
        console.log('bot_key')
           AsyncStorage.getItem('auth_data').then((value) => {
             if(value != null){
           var value = JSON.parse(value)
           this.setState({
               client_id:value.client_id,
               client_secret:value.client_secret,
               username:value.username,
               password:value.password,
           })
           this.getToken();
          }else{
                AsyncStorage.removeItem('auth_data');
                this.props.navigation.navigate("Login")
          }
       });       
    }
    chathistory(fbId,bot_id,name,id){
        console.log(name)
      this.props.navigation.navigate("MyChat",{
              user_id: id,
              fbId: fbId,
              bot_id: bot_id,
              username: name,
                bot_key:this.props.navigation.getParam('bot_key')
            })
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
                      <Image
                        resizeMode="contain"
                        source={headerlogo}
                        style={styles.textBody}
                        />
                  </Body>
                  <Right style={styles.headerRight}>
                    <Button transparent onPress={() => this.handleLogout()}>
                        <Icon name="log-out" style={{ color: "#fff" }}/>
                    </Button>
                  </Right>
                </Header>
                 <View style={styles.BotsSection}>
                    <View  style={{flex:1, backgroundColor: "#7CD1E9"}}>
                        <View style={styles.CurveHeaderRadius}>
                            <Text style={styles.YourBotText}>Bot Users</Text>
                        </View>
                    </View>
                </View>
                <Content>
                        <View style={{marginLeft:15,flex:1,paddingVertical: 10}}>
                            <Text style={styles.chathistory}>
                                Chat History
                            </Text>
                        </View>
                        {this.state.isLoadingotherUser
                        ?
                        <View>
                              <View style={styles.itemWhiteBox}>
                                 <View
                                        style={styles.highlightBox}
                                       
                                      >
                                    <View style={styles.listItemBox}>
                                      <View style={styles.leftCol}>
                                        <View style={styles.avatar}>
                                          <ContentLoader height={80} width={80}>
                                            <Circle cx="40" cy="40" r="40"/>   
                                        </ContentLoader>
                                        </View>
                                        <View style={[styles.info,{marginLeft: 5}]}>
                                           
                                           
                                        <View style={{marginTop:10}}>
                                            <ContentLoader height={10}>
                                                <Rect x="0" y="0" rx="5" ry="5" width="60" height="15" />    
                                            </ContentLoader>
                                        </View>
                                        <View style={{marginTop:10}}>
                                                    <ContentLoader height={10}>
                                                <Rect x="0" y="0" rx="5" ry="5" width="220" height="15" />    
                                            </ContentLoader>
                                        </View>
                                        </View>
                                      </View>
                                    </View>
                                  </View>
                                </View>
                                <View style={styles.itemWhiteBox}>
                                      <View
                                        style={styles.highlightBox}
                                      >
                                    <View style={styles.listItemBox}>
                                      <View style={styles.leftCol}>
                                        <View style={styles.avatar}>
                                          <ContentLoader height={80} width={80}>
                                            <Circle cx="40" cy="40" r="40"/>   
                                        </ContentLoader>
                                        </View>
                                        <View style={[styles.info,{marginLeft: 5}]}>
                                           
                                           
                                        <View style={{marginTop:10}}>
                                            <ContentLoader height={10}>
                                                <Rect x="0" y="0" rx="5" ry="5" width="60" height="15" />    
                                            </ContentLoader>
                                        </View>
                                        <View style={{marginTop:10}}>
                                                    <ContentLoader height={10}>
                                                <Rect x="0" y="0" rx="5" ry="5" width="220" height="15" />    
                                            </ContentLoader>
                                        </View>
                                        </View>
                                      </View>
                                    </View>
                                  </View>
                                </View>
                                <View style={styles.itemWhiteBox}>
                                      <View
                                        style={styles.highlightBox}
                                       
                                      >
                                    <View style={styles.listItemBox}>
                                      <View style={styles.leftCol}>
                                        <View style={styles.avatar}>
                                          <ContentLoader height={80} width={80}>
                                            <Circle cx="40" cy="40" r="40"/>   
                                        </ContentLoader>
                                        </View>
                                        <View style={[styles.info,{marginLeft: 5}]}>
                                           
                                           
                                        <View style={{marginTop:10}}>
                                            <ContentLoader height={10}>
                                                <Rect x="0" y="0" rx="5" ry="5" width="60" height="15" />    
                                            </ContentLoader>
                                        </View>
                                        <View style={{marginTop:10}}>
                                                    <ContentLoader height={10}>
                                                <Rect x="0" y="0" rx="5" ry="5" width="220" height="15" />    
                                            </ContentLoader>
                                        </View>
                                        </View>
                                      </View>
                                    </View>
                                  </View>
                                </View>
                        </View>
                        :
                        <View>
                             <ScrollView style={styles.scrollcontainer} contentContainerStyle={{ paddingBottom: 20 }}>
                                {this.state.deactiveusers}
                            </ScrollView>
                        </View>
                        }
                        
                </Content>
          </Container>
    );
  }
}
