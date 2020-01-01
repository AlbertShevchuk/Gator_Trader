import React, { Component } from 'react';
import { Button, Form, FormGroup,Input, FormText } from 'reactstrap';
import '../viewsCSS/MessagingPage.css';
export default class PostForm extends Component {
  constructor(props){
    super(props);
    this.SendMessage = this.SendMessage.bind(this)
    this.updateMessage = this.updateMessage.bind(this)
    this.state = {
      user: "Alex",
      message: "Hi, this is a message!",
      time: ""
    }
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
  render(){
    return (
    <div>
       <Form id="msgform"onSubmit={this.SendMessage}>
      <FormGroup>
        <Input className = "message" type="text" id="messageForm" onChange={this.updateMessage}placeholder="Send Message..."/>
      </FormGroup>
      <Button color ="success">Send Message</Button>
      </Form>
    </div>
    );
  }
}
