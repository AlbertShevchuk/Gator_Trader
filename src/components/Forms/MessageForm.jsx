/*
CSC648-01 Team01
Date: 12-22-2018
Team Lead: Marcus Mertilien
Frontend Lead: Alex Ha
Backend Lead: Raul Serrano

Collaborators: Marcus Mertilien, Alex Ha, Raul Serrano
MessageForm.jsx is the input form that is on our messaging page which allows user input.
The information is then sent to our database.
*/

import React, { Component } from 'react';
import { Button, Form, FormGroup,Input, FormText } from 'reactstrap';
import '../viewsCSS/MessagingPage.css';
import {Row,Col} from 'reactstrap';
import {browserHistory} from 'react-router';
import axios from 'axios'
export default class PostForm extends Component {
  constructor(props){
    super(props);
    this.SendMessage = this.SendMessage.bind(this)
    this.updateMessage = this.updateMessage.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.state = {
      user: "",
      message: "",
      seller: "",
      item: "",
      buyer: ""
    }
  }
  componentDidMount(){
    console.log(this.props)
  }

  componentDidUpdate(prevProps) {
  // Typical usage (don't forget to compare props):
  if (this.props.msgInfo !== prevProps.msgInfo) {
    this.setData(this.props.msgInfo);
  }
}
  setData = (msgInfo) => {
    this.setState({
      user: msgInfo.user,
      seller: msgInfo.seller,
      item:msgInfo.item,
      buyer: msgInfo.buyer
    }, () => console.log(this.state));
  }
  SendMessage = (e) => {
    e.preventDefault();
    var form = document.getElementById("msgform")
    form.reset()
    this.props.SendMessage([
      this.state.user,
      this.state.message,
      this.state.time
    ])
  }
  updateMessage = (newMessage) => {
    this.setState({
      message: newMessage.target.value
    })
  }
  onSubmit = (e) => {
    e.preventDefault();
    var url = 'http://ec2-50-112-37-217.us-west-2.compute.amazonaws.com/nextMessage'
   // console.log(url)
   // console.log(this.state.user + "     " + this.state.item)

 /*   let bodyFormData = new FormData();
    bodyFormData.append('seller', this.state.seller);
    bodyFormData.append('buyer', this.state.user);
    bodyFormData.append('item', this.state.item);
    bodyFormData.append('message', this.state.message);
    bodyFormData.append('sentBY', this.state.user);
    for (var pair of bodyFormData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]);
  }*/

  const mess = {
    seller: this.state.seller,
    buyer: this.state.buyer,
    item: this.state.item,
    message: this.state.message,
    sentBY: this.state.user
  }
   // bodyFormData.append('sentBy', this.state.user);
   /// console.log(bodyFormData);
   console.log(mess)
    var form = document.getElementById("msgform")
    form.reset()

    axios({
      method: 'post',
      url: 'http://ec2-50-112-37-217.us-west-2.compute.amazonaws.com/nextMessage',
      data: mess,
      config: {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*',
        }
      }
    }).then(results => {this.props.SendMessage()}).catch(function (error) {
      console.log(error.response);
    });
  }

  render(){
    return (
    <Row>
    <Col>
       <Form id="msgform"onSubmit={this.onSubmit}>
        <Col>
          <FormGroup>
            <Input className = "message" type="text" id = "messageform" autocomplete="off" onChange={this.updateMessage}placeholder="Send Message..."/>
          </FormGroup>
        </Col>
      <Col>
        <Button color ="success">Send Message</Button>
      </Col>
      </Form>
    </Col>
    </Row>
    );
  }
}
