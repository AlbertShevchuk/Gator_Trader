import React, { Component } from 'react';
import { Button, Form, FormFeedback, FormGroup, Label, Input, FormText, Modal, ModalHeader, ModalBody,ModalFooter } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput, AvFeedback, AvRadioGroup, AvRadio } from 'availity-reactstrap-validation';
import {browserHistory} from 'react-router';
import axios from 'axios'
import './InputLayout.css';
import { userInfo } from 'os';
import PrivacyModal from '../PrivacyModal/PrivacyModal';

export default class RegForm extends Component {
  constructor(){
    super();
    this.state = {
      create_first_name: '',
      create_last_name: '',
      create_student_id: '',
      create_username: '',
      create_psw: '',
      modal: false,
    };
  }
  privacyModal(){
    return(<PrivacyModal/>)
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value});

  }

  onSubmit = (e) => {
    e.preventDefault();
        // get our form data out of state
    const user = {
      create_first_name: this.state.create_first_name,
      create_last_name: this.state.create_last_name,
      create_student_id: this.state.create_student_id,
      create_username: this.state.create_username,
      create_psw: this.state.create_psw
  }
    axios({
      method: 'post',
      url: 'http://ec2-50-112-37-217.us-west-2.compute.amazonaws.com/user_create',
      data: user,
      config: {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*',
        }
      }
    }).then(response =>{
      browserHistory.push('/')
    }).catch(function (error) {
      console.log(error.response);
    });
  }

  render(){
    const {
      create_first_name,
      create_last_name,
      create_student_id,
      create_username,
      create_psw} = this.state;
    return (
      <div id="InputField">
      <AvForm id="Form" name = 'MyForm' onValidSubmit={this.onSubmit}>
      <AvGroup id ="FormElement">
      <Label for="create_first_name">First</Label>
      <AvInput className = "input"
          type = "text"
          name = "create_first_name"
          maxlength="15"
          placeholder ="First Name"
          value = {create_first_name}
          onChange={this.onChange}
          validate={{
            required: {value: true},
            pattern: {value: '^[A-Za-z]'},
            minLength: {value: 2}
          }}
      />
      <AvFeedback class = "errorMsg">Please enter a valid name</AvFeedback>
      </AvGroup>
      <AvGroup id="FormElement">
        <Label for="create_last_name">Last</Label>
        <AvInput  className = "input"
            type="text"
            name="create_last_name"
            id="last"  maxlength="15"
            placeholder="Last Name"
            value = {create_last_name}
            onChange={this.onChange}
            validate={{
              required: {value: true},
              pattern: {value: '^[A-Za-z]'},
              minLength: {value: 2}
            }}
        />
      <AvFeedback class = "errorMsg">Please enter a valid name</AvFeedback>
      </AvGroup>
      <AvGroup id="FormElement">
        <Label for="create_student_id">Student ID</Label>
        <AvInput className = "input"
            type="text"
            name="create_student_id"
            id="studentid"  maxlength="9"
            placeholder="Enter your SFSU Student ID"
            value = {create_student_id}
            onChange={this.onChange}
            validate={{
              required: {value: true},
              pattern: {value: '^[0-9]'},
              minLength: {value: 9},
              maxLength: {value: 9}
            }}/>

      <AvFeedback class = "errorMsg">Invalid Student Id (9 numbers)</AvFeedback>
      </AvGroup>
      <AvGroup id="FormElement">
        <Label for="create_username">Username</Label>
        <AvInput className = "input"
            type ="text"
            name ="create_username"
            maxlength="15"
            id="username"
            placeholder="Enter your username"
            value = {create_username}
            onChange={this.onChange}
            validate={{
              required: {value: true},
              pattern: {value: '^[A-Za-z0-9]'},
              minLength: {value: 6},
              maxLength: {value: 15}
            }}/>

      <AvFeedback class = "errorMsg">Please choose another username (6-15 characters)</AvFeedback>
      </AvGroup>
      <AvGroup id="FormElement">
        <Label for="create_psw">Password</Label>
        <AvInput className = "input"
             type="password"
             name="create_psw"
             id="password"
             maxlength="16"
             placeholder="Enter your password"
             value = {create_psw}
             onChange={this.onChange}
             validate={{
               required: {value: true},
               minLength: {value: 8},
               maxLength: {value: 16}
             }}/>
             <AvFeedback class = "errorMsg">Please choose another password (8-16 characters)</AvFeedback>
      </AvGroup>
      <AvGroup check>
          <AvInput type="checkbox" name="checkbox" />
          <Label check for="checkbox"> <PrivacyModal/> </Label>
        </AvGroup>
      <Button color ="success" id ="regbut">Register</Button>
      </AvForm>
      </div>
    );
  }
}
