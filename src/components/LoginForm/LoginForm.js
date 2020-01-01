import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Row, Col } from 'reactstrap';
import './LoginForm.css';
import { browserHistory } from 'react-router';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from "../views/Home";
const axios = require('axios')

class LoginForm extends Component {


  constructor(props) {
    super(props);
    this.UpdateUserName = this.UpdateUserName.bind(this)
    this.state = {
      username: "",
      password: "",
  }
}

  UpdateUserName = (user) => {
    this.setState({
      username: user.target.value
    })
  }
  UpdatePassword = (password) => {
    this.setState({
      password: password.target.value
    })
  }
  GetUser = (e) => {
    e.preventDefault()
    if(this.state.username != ""){
      console.log(this.state.username)
      axios.get('http://ec2-50-112-37-217.us-west-2.compute.amazonaws.com/login', {
          params: {
            userName:this.state.username,
            password:this.state.password
          }
      })
       //take response turn into json
       .then(response => { 
          var valueBack = response.data.toString();
          console.log(valueBack)
          if(valueBack == 'true'){
          browserHistory.push({
            pathname: '/',
            state: {
                username: this.state.username,
                loggedIn: true,
                isOpen: true
            }
          })
        }
        else{
          /**
           * TODO - create an error like "Email or password incorrect please check your info and try again"
           */
           



        }
      })
   }
}
  render(){
    return (
      <div>
    <Row id="InputField">
      <Col>
        <Form id="Form" onSubmit={this.GetUser}>
          <FormGroup id="FormElement">
            <Label id="Label" for="Username">Username</Label>
            <Input type ="username" name ="username1" id="username" minlength = "5" maxlength="15" value = {this.state.userName} onChange={this.UpdateUserName} placeholder="Username"/>
          </FormGroup>
          <FormGroup id="FormElement">
            <Label id="Label" for="Password">Password</Label>
            <Input type="password" name="password" id="password" minlength = "4" maxlength="20" value = {this.state.password} onChange={this.UpdatePassword} placeholder="Password" />
          </FormGroup>
          <Button id= "LoginButton">Login</Button>
        </Form>
      </Col>
    </Row>
    </div>
    );
  }
}
export default LoginForm;
