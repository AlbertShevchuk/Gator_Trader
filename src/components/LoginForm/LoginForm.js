/*
CSC648-01 Team01
Date: 12-22-2018
Team Lead: Marcus Mertilien
Frontend Lead: Alex Ha
Backend Lead: Raul Serrano

Collaborators: Marcus Mertilien, Alex Ha, Raul Serrano
LoginForm is the form that allows users to enter their registered username and password
to login to the website. It pulls information from the database and if the password
does not match the entered password, the user will be unable to login.
*/

import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Row, Col } from 'reactstrap';
import './LoginForm.css';
import { browserHistory } from 'react-router';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from "../views/Home";
import { AvForm, AvField, AvGroup, AvInput, AvFeedback, AvRadioGroup, AvRadio } from 'availity-reactstrap-validation';
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
          if(valueBack === 'true'){
          browserHistory.push({
            pathname: '/',
            state: {
                username: this.state.username,
                loggedIn: true,
                isOpen: true
            }})
        }else{
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
        <AvForm id="Form" onValidSubmit={this.GetUser}>
          <AvGroup id="FormElement">
            <Label id="Label" for="Username">Username</Label>
            <AvInput
            type ="username"
            name ="username1"
            id="username"
            minlength = "6"
            maxlength="15"
            value = {this.state.userName}
            onChange={this.UpdateUserName}
            placeholder="Username"
            validate={{
              required: {value: true},
              pattern: {value: '^[A-Za-z]'},
              minLength: {value: 6},
              maxLength: {value: 15}
            }}
            />
          <AvFeedback id = "userError">Please enter a valid username</AvFeedback>
          </AvGroup>
          <AvGroup id="FormElement">
            <Label id="Label" for="Password">Password</Label>
            <AvInput type="password"
            name="password"
            id="password"
            minlength = "8"
             maxlength="16"
             value = {this.state.password}
             onChange={this.UpdatePassword} placeholder="Password"
             validate={{
               required: {value: true},
               minLength: {value: 8},
               maxLength: {value: 16}
             }}/>
          <AvFeedback>Please choose another password (8-16 characters)</AvFeedback>
          </AvGroup>
          <Button color="success"id= "LoginButton">Login</Button>
        </AvForm>
      </Col>
    </Row>
    </div>
    );
  }
}
export default LoginForm;
