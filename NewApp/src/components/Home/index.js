import React, { Component } from "react";
import {  Header, Left, Container, Button, Body, Title, Right, Icon, Text, Content } from "native-base";
import { View,StatusBar ,TouchableOpacity,Image,ScrollView,AsyncStorage,FlatList ,TouchableHighlight} from "react-native";
import styles from "./styles";
const Avatar = require('../../../assets/support.png');
const headerlogo = require('../../../assets/headerlogo.png');
const backbutton = require('../../../assets/left-arrow.png');
import ContentLoader from 'react-native-content-loader';
import { LoginButton,AccessToken, LoginManager } from "react-native-fbsdk";
import {Circle, Rect} from 'react-native-svg';
export default class Home extends Component {
    constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      client_id: null,
      client_secret: null,
      username: null,
      password: null,
      access_token: null,
      allbotdata: [],
        botfirst:true,
        isLoadingBots:true,
botsecond:true,
      bots: [],
    };
    this.handleLogout = this.handleLogout.bind(this);
}
   handleLogout() {
       console.log('logout')
       AsyncStorage.getItem('facebookloggedin').then((value) => {
             if(value != null){
                 LoginManager.logOut();
                              AsyncStorage.removeItem('auth_data');
        AsyncStorage.removeItem('acess_token');
   this.props.navigation.navigate("Login")
             }else{
                 AsyncStorage.removeItem('auth_data');
        AsyncStorage.removeItem('acess_token');
   this.props.navigation.navigate("Login")
             }
          
       });
        

}
    getToken(){
          console.log('token')
        AsyncStorage.getItem('acess_token').then((acess_token) => {
             if(acess_token != null){
                  var acess_token = JSON.parse(acess_token)
                  console.log(acess_token) 
                  
             this.setState({
               access_token:acess_token
           })
           this.getBots();
             }else{
                   console.log('not token')
             }
       });

  }
    getBots(){
         var url = 'https://botsify.com/api/v1/get-bots'
       fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization':'Bearer '+ this.state.access_token
        }
    })
    .then(response => response.json())
           .then(response => { 
          console.log('bot response')
          console.log(response.bots)
          
          this.setState({
              bots:response.bots
          })
          var allthebots = this.renderBotItems();
           this.setState({
               allbotdata:allthebots,
               isLoadingBots:false
           })
       })
        .catch(error => console.error('Error:', error));
        
    }
    componentDidMount(){
        console.log('home page didmount')
         AsyncStorage.getItem('auth_data').then((value) => {
             if(value != null){
                   console.log('auth')
           var value = JSON.parse(value)
        
           console.log(value)
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
    botdetail(id,name,apikey){
        console.log(id)
      this.props.navigation.navigate("BotDetail",{
              Id: id,
              botname: name,
                bot_key:apikey
            })
    }
    renderBotItems() {
        this.setState({
                    botfirst:true,
                    botsecond:true
                })
        let allbots = [];
        const shadowOpt = {
            width:140,
            height:140,
            color:"#000000",
            border:8,
            radius:8,
            opacity:0.051,
            x:0,
            y:4,
            blur:14,
            style:{marginVertical:5,marginHorizontal:20}
        }
        for (var i = 0; i < this.state.bots.length; i++) {
            var k=i;
            const nameone = ''
            const idone = ''
            const nametwo = ''
            const idtwo = ''
            const apikeyone = ''
            const apikeytwo = ''
             console.log('start')
             
            if(this.state.bots[i+k] != undefined){
                nameone = this.state.bots[i+k].name
                idone = this.state.bots[i+k].id
                apikeyone = this.state.bots[i+k].apikey
                console.log(this.state.bots[i+k].name)
            }else{
                this.setState({
                    botfirst:false
                })
            }
            k = k+1;
            console.log('end')
            
            if(this.state.bots[i+k] != undefined){
                 nametwo = this.state.bots[i+k].name
                 idtwo = this.state.bots[i+k].id
                 apikeytwo = this.state.bots[i+k].apikey
                 console.log(this.state.bots[i+k].id)
            }else{
                this.setState({
                    botsecond:false
                })
            }
            allbots.push( <View style={styles.row}>
                              {this.state.botfirst
                                ?
                                
                                    <TouchableOpacity
                                    onPress={()=> this.botdetail(idone,{nameone},apikeyone)}
                                    style={styles.item}>
                                        <Image
                                            resizeMode="contain"
                                            source={Avatar}
                                            style={styles.itemImage}
                                        />
                                        <Text style={styles.itemText}>{nameone}</Text>
                                    </TouchableOpacity>
                               
                                :null
                                }
                             {this.state.botsecond
                                ?
                               
                                    <TouchableOpacity
                                    onPress={()=> this.botdetail(idtwo,{nametwo},apikeytwo)}
                                    style={styles.item}>
                                        <Image
                                            resizeMode="contain"
                                            source={Avatar}
                                            style={styles.itemImage}
                                        />
                                        <Text style={styles.itemText}>{nametwo}</Text>
                                    </TouchableOpacity>
                              
                                : null
                            }
                        </View>
                        );
        }
        return allbots    
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
                        <Text style={styles.YourBotText}>Your Bots</Text>
                     </View>
                </View>
            </View>
                        { this.state.isLoadingBots
                        ?
                        
            <Content>  
                 <View style={styles.loaderrow}>
                    <View style={styles.loaderitem}>
                         <ContentLoader height={140}>
                            <Rect x="0" y="0" rx="5" ry="5" width="150" height="120" />    
                        </ContentLoader>             
                    </View>
                    <View style={[styles.loaderitem,{marginLeft:13}]}> 
                         <ContentLoader height={140}>
                            <Rect x="0" y="0" rx="5" ry="5" width="150" height="120" />    
                        </ContentLoader>             
                    </View>
                </View>
                <View style={styles.loaderrow}>
                    <View style={styles.loaderitem}>
                         <ContentLoader height={140}>
                            <Rect x="0" y="0" rx="5" ry="5" width="150" height="120" />    
                        </ContentLoader>             
                    </View>
                    <View style={[styles.loaderitem,{marginLeft:13}]}> 
                         <ContentLoader height={140}>
                            <Rect x="0" y="0" rx="5" ry="5" width="150" height="120" />    
                        </ContentLoader>             
                    </View>
                </View>
                <View style={styles.loaderrow}>
                    <View style={styles.loaderitem}>
                         <ContentLoader height={140}>
                            <Rect x="0" y="0" rx="5" ry="5" width="150" height="120" />    
                        </ContentLoader>             
                    </View>
                    <View style={[styles.loaderitem,{marginLeft:13}]}> 
                         <ContentLoader height={140}>
                            <Rect x="0" y="0" rx="5" ry="5" width="150" height="120" />    
                        </ContentLoader>             
                    </View>
                </View>
                <View style={styles.loaderrow}>
                    <View style={styles.loaderitem}>
                         <ContentLoader height={140}>
                            <Rect x="0" y="0" rx="5" ry="5" width="150" height="120" />    
                        </ContentLoader>             
                    </View>
                    <View style={[styles.loaderitem,{marginLeft:13}]}> 
                         <ContentLoader height={140}>
                            <Rect x="0" y="0" rx="5" ry="5" width="150" height="120" />    
                        </ContentLoader>             
                    </View>
                </View>
               </Content>
                :
                <Content>
                    {this.state.allbotdata}
                </Content>
}
      </Container>
    );
  }
}
