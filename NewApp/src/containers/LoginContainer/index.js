import React, { Component } from "react";
import PropTypes from "prop-types";
import { Image, Alert,AsyncStorage,NetInfo,Text,View  } from "react-native";
import { Item, Input, Toast, Form } from "native-base";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import Login from "../../components/Login";
import { userLoginSuccess, userLoginFail } from "../../actions";
import { emailFormat, required, alphaNumeric } from "./validators";
import styles from  "./styles";

const lockIcon = require("../../../assets/icon/lock.png");
const mailIcon = require("../../../assets/icon/mail.png");
import firebase from 'firebase';
class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
        isLoggedin:false,
        client_id:null,
        client_secret:null, 
        isLoading:false,
        errorfield:false,
        emailerror:false,
        errortext:'',
        passworderror:false,
        isConnected:true,
         connection_Status : "",
        set:false
    };
  }
     fiveSecTimer(){
        setTimeout(function () {
            console.log('updated')
            NetInfo.isConnected.removeEventListener(
        'connectionChange',
        this._handleConnectivityChange
 
    );
            this.fiveSecTimer();
        }.bind(this), 20)
    }
   componentDidMount(){
         NetInfo.isConnected.fetch().done((isConnected) => {
 
      if(isConnected == true)
      {
        AsyncStorage.getItem('auth_data').then((value) => {
             if(value != null){
                 this.props.navigation.navigate("Home");
             }
          
       });  
      }else{
              AsyncStorage.removeItem('auth_data');
        AsyncStorage.removeItem('acess_token');
      }
         });
       
       this.fiveSecTimer();
   NetInfo.isConnected.addEventListener(
        'connectionChange',
        this._handleConnectivityChange
 
    );
   
    NetInfo.isConnected.fetch().done((isConnected) => {
 
      if(isConnected == true)
      {
        this.setState({connection_Status : "Online"})
      }
      else
      {
        this.setState({connection_Status : "Offline"})
      }
 
    });
    }
    componentWillUnmount() {
 
    NetInfo.isConnected.removeEventListener(
        'connectionChange',
        this._handleConnectivityChange
 
    );
               
 
  }
_handleConnectivityChange = (isConnected) => {
 
    if(isConnected == true)
      {
        this.setState({connection_Status : "Online"})
      }
      else
      {
        this.setState({connection_Status : "Offline"})
      }
  };  
  componentWillReceiveProps(nextProps, nextState){
    if (this.props.auth.isFailed !== nextProps.auth.isFailed){
      if (nextProps.auth.isFailed && !nextProps.auth.isAuthenticating){
        let message = nextProps.auth.error;
        setTimeout(() => {
          Alert.alert("",message);
        }, 100);
      }
    }

    if (this.props.auth.token !== nextProps.auth.token){
      if (nextProps.auth.token){
        this.props.navigation.navigate("App");
      }
    }
  }

  renderInput({ input, label, type, meta: { touched, error, warning } }) {
    return (
      <Item error={error && touched} style={styles.itemForm}>
        <Image source={input.name === "email" ? mailIcon : lockIcon}/>
        <Input
          ref={c => (this.textInput = c)}
          placeholder={input.name === "email" ? "Email" : "Password"}
          secureTextEntry={input.name === "password"}
          {...input}
          style={styles.inputText}
          keyboardType={input.name === "email" ? "email-address" : "default"}
          autoCapitalize = "none"
        />
      </Item>
    );
  }
  getToken(response){
      let collection={}
        collection.username=this.props.loginForm.values.email,
        collection.grant_type='password',
        collection.client_secret=response.client_secret,
        collection.client_id=response.client_id,
        collection.scope='',
        collection.password=this.props.loginForm.values.password
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
           let authdata = {};
          authdata.username = this.props.loginForm.values.email
          authdata.password = this.props.loginForm.values.password
          authdata.client_id = response.client_id
          authdata.client_secret = response.client_secret
          AsyncStorage.setItem('auth_data', JSON.stringify(authdata));
            AsyncStorage.setItem('acess_token', JSON.stringify(response.access_token));
           this.props.navigation.navigate("Home");
           
       })
        .catch(error => console.error('Error:', error));
  }
  authGet(response){
    
      if(response.status){
          this.getToken(response);
          
      
           this.setState({
              emailerror:false,
              passworderror:false,
          })
          
      }else if(Object.keys(response).length == 1){
          if(response.email){
          this.setState({
              emailerror:true,
              isLoggedin:false,
              isLoading:false,
              passworderror:false,
              errortext :'You Email is invalid!',
              errorfield :true,
          })
          }else if(response.password){
          this.setState({
              emailerror:false,
              isLoggedin:false,
              isLoading:false,
              passworderror:true,
                
                errortext : 'You Password is invalid!',
                errorfield :true,
          })
      }
    }
  }
  login() {
       NetInfo.isConnected.fetch().done((isConnected) => {
 
      if(isConnected == true)
      {
       
      this.setState({
          isLoading:true
      })
      if(this.props.loginForm.values === undefined){
          this.setState({
              emailerror:true,
              isLoggedin:false,
              isLoading:false,
              passworderror:false,
              errortext :'You Email & password is invalid!',
              errorfield :true,
          })

      }else{
          if(this.props.loginForm.values.email === undefined){
              this.setState({
              emailerror:true,
              isLoggedin:false,
              isLoading:false,
              passworderror:false,
              errortext :'You Email is invalid!',
              errorfield :true,
          })
              
          }else if(this.props.loginForm.values.password === undefined){
              this.setState({
              emailerror:true,
              isLoggedin:false,
              isLoading:false,
              passworderror:false,
              errortext :'You password is invalid!',
              errorfield :true,
          })
              
          }else{
          let collection={}
        collection.email=this.props.loginForm.values.email,
        collection.password=this.props.loginForm.values.password
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
//           console.log(response)
          this.authGet(response)
       })
        .catch(error => console.error('Error:', error));
      }
      }
      }else{
          alert('No internet Connection!')
      }
      
  });
}
          
      
    
  onPressSwitch(){
    let { counter } = this.state;
    this.setState({
      counter: counter + 1
    }, () => {
      if (this.state.counter === 8){
        this.props.navigation.navigate("SwitchEnv");
      }
    });
  }

  render() {
      
        const errortext = this.state.errortext
        const errorfield = this.state.errorfield
        const loadingstate = this.state.isLoading
    const form = (
      <Form>
        <Field
          name="email"
            style={styles.shadow}
          component={this.renderInput}
          validate={[emailFormat, required]}
        />
         <Field
          name="password"
        style={styles.shadow}
          component={this.renderInput}
          validate={[alphaNumeric, required]}
        />
      </Form>
    );
    return (
     
      <Login
        onPressSwitch={() => this.onPressSwitch()}
        navigation={this.props.navigation}
        loading={this.props.auth.isAuthenticating}
        loginForm={form}
        loadingState = {loadingstate}
        errorfield = {errorfield}
        errortext = {errortext}
        onLogin={() => this.login()}
      />
    );
  }
}

LoginForm.propTypes = {
  auth: PropTypes.object,
  loginForm: PropTypes.object,
  login: PropTypes.func
};

const LoginContainer = reduxForm({
  form: "login"
})(LoginForm);

const mapStateToProps = state => ({
  auth: state.auth,
  loginForm: state.form.login
});

const mapDispatchToProps = dispatch => ({
  loginSuccess: ({ email, password }) => dispatch(userLoginSuccess({
    email,
    password,
  })),
  loginFail: ({ email, password }) => dispatch(userLoginFail({
    email,
    password,
  })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);
