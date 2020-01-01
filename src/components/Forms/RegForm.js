import React, { Component } from 'react';
import { Button, Form, FormFeedback, FormGroup, Label, Input, FormText } from 'reactstrap';
import {browserHistory} from 'react-router';
import axios from 'axios'
import './InputLayout.css';
import { userInfo } from 'os';

export default class RegForm extends Component {
  constructor(){
    super();
    this.state = {
      create_first_name: '',
      create_last_name: '',
      create_student_id: '',
      create_username: '',
      create_psw: '',

    };
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
      <Form id="Form" name = 'MyForm' onSubmit={this.onSubmit}>
      <FormGroup id ="FormElement">
      <Label for="create_first_name">First</Label>
      <Input className = "input"
          type = "text" 
          name = "create_first_name"  
          maxlength="15" 
          placeholder ="First Name"
          value = {create_first_name}
          onChange={this.onChange}
      />
      </FormGroup>
      <FormGroup id="FormElement">
        <Label for="create_last_name">Last</Label>
        <Input  className = "input" 
            type="text" 
            name="create_last_name" 
            id="last"  maxlength="15" 
            placeholder="Last Name"
            value = {create_last_name}
            onChange={this.onChange}
        />
      </FormGroup>
      <FormGroup id="FormElement">
        <Label for="create_student_id">Student ID</Label>
        <Input className = "input" 
            type="text" 
            name="create_student_id" 
            id="studentid"  maxlength="10" 
            placeholder="Enter your SFSU Student ID" 
            value = {create_student_id}
            onChange={this.onChange}/>
      </FormGroup>
      <FormGroup id="FormElement">
        <Label for="create_username">Username</Label>
        <Input className = "input" 
            type ="text" 
            name ="create_username"   
            maxlength="15" 
            id="username" 
            placeholder="Enter your username"
            value = {create_username}
            onChange={this.onChange}/>
      </FormGroup>
      <FormGroup id="FormElement">
        <Label for="create_psw">Password</Label>
        <Input className = "input"
             type="password" 
             name="create_psw" 
             id="password"  
             maxlength="20" 
             placeholder="Enter your password" 
             value = {create_psw}
             onChange={this.onChange}/>
      </FormGroup>
      <Button color ="success" >Register</Button>
      </Form>
      </div>
    );
  }
}
