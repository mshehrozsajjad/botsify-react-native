import React, { Component } from "react";
import PropTypes from "prop-types";
import { Image, Alert, AsyncStorage} from "react-native";
import { Item, Input, Toast, Form } from "native-base";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import Login from "../../components/Login";
import { userLoginSuccess, userLoginFail } from "../../actions";
import { emailFormat, required, alphaNumeric } from "./validators";
import styles from  "./styles";

const lockIcon = require("../../../assets/icon/lock.png");
const mailIcon = require("../../../assets/icon/mail.png");
var email= "";
var password = "";
var client_id = ""
var client_secret = ""
var auth = ""
var auth2 = ""
var auth3 = ""
var auth4 = ""
var stage = 1;

class LoginForm extends Component {
  constructor(props) {
    super(props);

    
  this.state = {
    counter: 0,
    isLoading: false,
    dataSource: [],
    in: "stage0"
  };
  
  }
componentWillMount()
{
  auth = this.retrieveData("email");

    auth.then(function(value){
      console.log("inside auth")
      stage = 2;
      email = value;
      console.log(email)
    })

  auth2 = this.retrieveData("password");

      auth2.then(function(value){
        console.log("inside auth 2")
        password = value;
        stage = 3;
        console.log(password)
      })


 /*  auth3 = this.retrieveData("client_id");
   auth3.then(function(value){
     if (value)
     {
      console.log("inside auth 3")
      client_id = value;
      console.log(client_id)
     }
    })

    auth4 = this.retrieveData("client_secret");
    auth4.then(function(value){
      if (value ){
      console.log("inside auth 4")
        client_secret = value;
        console.log(client_secret)
        //this.props.navigation.navigate("Home", { client_id : client_id, 
        //client_secret: client_secret, email: email, password: password});
      })
    }*/
  
}


  componentWillReceiveProps(nextProps, nextState){
    if (this.props.auth.isFailed !== nextProps.auth.isFailed){
      if (nextProps.auth.isFailed && !nextProps.auth.isAuthenticating){
        let message = nextProps.auth.error;
        setTimeout(() => {
          Alert.alert("",message);
        }, 1000);
      }
    }

    if (this.props.auth.token !== nextProps.auth.token){
      if (nextProps.auth.token){
        this.props.navigation.navigate("App");
      }
    }

    
  }
 

  storeData = async (key, item) => {
    try {
      await AsyncStorage.setItem(key, item);
    } catch (error) {
     
    }
  };

  retrieveData = async (key) => {
    try {
      console.log("retrieving data");
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        
        return value;
      }

      else {
        console.log("value not found")
        return "null";
      }
    } catch (error) {

    }
  };


  fetchLogin = async()=>{ 
    let formData = new FormData();
    let { email, password } = this.props.loginForm.values;
    console.log("fetchLogin");
    console.log(email,password);
  formData.append("email", email);
  formData.append("password", password);


    await fetch("https://dev.botsify.com/api/v1/login", {
      method: "post",
      body: formData,
    })
    

    .then((response) => response.json() )
    .then((responseJson) => {
      console.log("LOGIN Stage");
      console.log(responseJson);
     
    this.setState({
      isLoading: false,
      dataSource: responseJson,
      in: "stage1",
      counter: 0,
    });
    this.storeData("client_id", responseJson.client_id);
    this.storeData("client_secret", responseJson.client_secret)
    this.login();
    
  }).catch(error => {
    console.log(error);});

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

  login() {

      if (this.state.in === "stage1") {

    if (this.props.valid) {
      let { email, password } = this.props.loginForm.values;
      console.log("check credentials")
      console.log(this.state.dataSource.status)

      if (email === this.state.dataSource.status){
        this.storeData("email", email);
        this.storeData("password", password);
        this.props.loginSuccess({email, password});
        this.props.navigation.navigate("Home", { client_id : this.state.dataSource.client_id, 
          client_secret: this.state.dataSource.client_secret, email: email, password: password})
      } else {
        this.props.loginFail({email, password});
      }
    }
    
    else {
      Toast.show({
        text: "Enter Valid Username & password!",
        duration: 2000,
        position: "top",
        textStyle: { textAlign: "center" }
      });
    }

  }
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
    console.log(email)
    console.log(password)
    console.log(client_id)
    console.log(client_secret)
    const form = (
      <Form>
        <Field
          name="email"
          component={this.renderInput}
          validate={[emailFormat, required]}
        />
        <Field
          name="password"
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
        onLogin={() => this.fetchLogin()}
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
