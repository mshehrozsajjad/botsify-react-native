import React, { Component } from "react";
import { Image, StatusBar,ActivityIndicator,AsyncStorage } from "react-native";
import { Container, Content, Button, Text, View ,Header,Body} from "native-base";
import Spinner from "react-native-loading-spinner-overlay";
import styles from "./styles";
import { LoginButton,AccessToken, LoginManager } from "react-native-fbsdk"
const headerlogo = require('../../../assets/headerlogo.png');

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
        isLoggedin:false,
        client_id:null,
        client_secret:null,       
        email:'',
        password:'',
        fberror:false,
fberrortext:'',
        facebookloginloading:false
    };
  }
     getToken(response){
         console.log('getting token')
         let authdata = {};
          authdata.username = this.state.email
          authdata.password = this.state.password
          authdata.client_id = response.client_id
          authdata.client_secret = response.client_secret
          AsyncStorage.setItem('auth_data', JSON.stringify(authdata));
      
           this.setState({
              emailerror:false,
              passworderror:false,
          })
           console.log('auth saved')
      let collection={}
        collection.username=this.state.email,
        collection.grant_type='password',
        collection.client_secret=response.client_secret,
        collection.client_id=response.client_id,
        collection.scope='',
        collection.password=this.state.password
        console.log('calling for token')
      var url = 'https://botsify.com/oauth/token'
       fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(collection),
    })
    .then(response => response.json())
           .then(response => { 
           
           this.setState({
               access_token:response.access_token
           })
           console.log('got token')
           console.log('saved token')
            AsyncStorage.setItem('facebookloggedin', 'yes');
            AsyncStorage.setItem('acess_token', JSON.stringify(response.access_token));
           
           this.props.navigation.navigate("Home");
           
           
       })
        .catch(error => console.error('Error:', error));
  }
      login(email,fbId) {
          console.log('prepare login')
          let collection={}
        collection.email=email,
        collection.password=fbId
      var url = 'https://botsify.com/api/v1/login'
       fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(collection), // body data type must match "Content-Type" header
    })
    .then(response => response.json())
           .then(response => { 
           console.log('loggedin')
//           alert(JSON.stringify(response))
               if(response.status){
             this.getToken(response);
           this.setState({
              fberror:false,
             
          })
          
      }else if(response.email){
          this.setState({
              fberror:true,
              facebookloginloading:false,
              fberrortext :'You Email is invalid!',
          })
          }else if(response.password){
          this.setState({
              facebookloginloading:false,
              fberror:true,
                fberrortext : 'You Password is invalid!',
          })
      }
    
        
    
       })
        .catch(error => console.error('Error:', error));
      
          
      
    }
    facebookLogin(){
           this.setState({
          facebookloginloading:true
      })
        _this = this;
        LoginManager.logInWithPermissions(["public_profile","email"]).then(
  function(result) {
    if (result.isCancelled) {
        _this.setState({
          facebookloginloading:false
      })
      console.log("Login cancelled");
    } else {
      AccessToken.getCurrentAccessToken().then((data) => {
          const { accessToken } = data
          console.log('got token')
       
          _this.initUser(accessToken)
          
        })
    }
  },
  function(error) {
      _this.setState({
          facebookloginloading:false
      })
    alert("Login fail with error: " + error);
  }
);
    }
     initUser(token) {
         _this = this;
         console.log('in user')
  fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token='+token)
  .then((response) => response.json())
  .then((json) => {
      _this.setState({
          email:json.email,
          password:json.id
      })
      console.log('user data')
      console.log(json)
      _this.setState({
          facebookloginloading:true
      })
      this.login(json.email,json.id)
  })
  .catch(() => {
    reject('ERROR GETTING DATA FROM FACEBOOK')
  })
}
  render() {
    return (
      <Container style={styles.container}>
        <StatusBar hidden={true}/>
        <Spinner visible={this.props.loading}/>
        <Header
              noShadow
              iosBarStyle={"dark-content"}
              androidStatusBarColor={"#fff"}
              style={{ borderBottomWidth: 0,backgroundColor:'#7CD1E9',height:150 }}>
                  <Body style={styles.headerBody}>
                        <Image
                            resizeMode="contain"
                            source={headerlogo}
                            style={styles.textBody}
                            />
                  </Body>
            </Header>
         <View style={styles.BotsSection}>
                <View  style={{flex:1, backgroundColor: "#7CD1E9"}}>
                    <View style={styles.CurveHeaderRadius}>
                        
                     </View>
                </View>
            </View>
        <Content style={styles.content}>
         
          <View style={styles.containerForm}>
        <Text style={styles.YourBotText}>Login to continue</Text>
            <View style={styles.contentForm}>
              {this.props.loginForm}
            
             
           
              <Button block onPress={() => this.props.onLogin()} style={[styles.buttonLogin,{backgroundColor:'#7CD1E9'}]}>
        {this.props.loadingState == true
            ?


                <ActivityIndicator style={{justifyContent:'center',alignItems:'center'}} size="small" color="#ffffff" animating />

          : (  <Text uppercase={false} style={styles.textLogin}>Login</Text>
          )}
                
              </Button>
              {this.props.errorfield
              ?
              
                <Text style={styles.errorlogin}>{this.props.errortext}</Text>
              :
              null
              }        
                  
             
            </View>
            <View style={{justifyContent: 'center',alignItems: 'center'}}>
                    <Text style={{marginTop:10,fontSize:20,fontWeight:'bold',alignItems: 'center'}}>
                    OR
                </Text>
                    <Button block onPress={() => this.facebookLogin()} style={[styles.buttonLoginFB,{backgroundColor:'#3b5998'}]}>
        {this.state.facebookloginloading == true
            ?


                <ActivityIndicator style={{justifyContent:'center',alignItems:'center'}} size="small" color="#ffffff" animating />

          : (  <Text uppercase={false} style={styles.textLogin}>Login with facebook</Text>
          )}
                
              </Button>
              {this.state.fberror  
                ? <Text style={styles.errorlogin}>{this.state.fberrortext}</Text>
                 :null
              }    
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}
